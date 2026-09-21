import { createPrivateKey, sign as nodeSign } from "node:crypto";

const {
  GITHUB_APP_ID,
  GITHUB_INSTALLATION_ID,
  GITHUB_PRIVATE_KEY_B64,
  GITHUB_REPO,
  ALLOWED_ORIGIN,
} = process.env;

// yc's --environment flag parses values as CSV under the hood and splits on
// embedded newlines, so a raw multi-line PEM only ever keeps its first line.
// Storing it base64-encoded (single line) sidesteps that entirely.
function privateKeyPem() {
  return Buffer.from(GITHUB_PRIVATE_KEY_B64, "base64").toString("utf8");
}

function corsHeaders() {
  return {
    "Access-Control-Allow-Origin": ALLOWED_ORIGIN,
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
  };
}

function base64url(input) {
  return Buffer.from(input)
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

function createAppJwt() {
  const now = Math.floor(Date.now() / 1000);
  const header = { alg: "RS256", typ: "JWT" };
  const payload = { iat: now - 60, exp: now + 540, iss: GITHUB_APP_ID };
  const unsigned = `${base64url(JSON.stringify(header))}.${base64url(JSON.stringify(payload))}`;

  // node:crypto accepts both PKCS1 ("BEGIN RSA PRIVATE KEY") and PKCS8 PEM as-is —
  // unlike Cloudflare Workers' WebCrypto, no conversion of the App's .pem is needed.
  const key = createPrivateKey(privateKeyPem());
  const signature = nodeSign("RSA-SHA256", Buffer.from(unsigned), key);
  return `${unsigned}.${base64url(signature)}`;
}

async function getInstallationToken() {
  const jwt = createAppJwt();
  const res = await fetch(
    `https://api.github.com/app/installations/${GITHUB_INSTALLATION_ID}/access_tokens`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${jwt}`,
        Accept: "application/vnd.github+json",
        "User-Agent": "sila-uma-gitforms-function",
      },
    }
  );
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`installation token failed: ${res.status} ${text}`);
  }
  const data = await res.json();
  return data.token;
}

function truncate(value, max) {
  return typeof value === "string" ? value.slice(0, max).trim() : "";
}

export async function handler(event) {
  const method = event.httpMethod;

  if (method === "OPTIONS") {
    return { statusCode: 204, headers: corsHeaders(), body: "" };
  }
  if (method !== "POST") {
    return { statusCode: 405, headers: corsHeaders(), body: "Method not allowed" };
  }

  let payload;
  try {
    const raw = event.isBase64Encoded ? Buffer.from(event.body, "base64").toString("utf8") : event.body;
    payload = JSON.parse(raw ?? "{}");
  } catch {
    return { statusCode: 400, headers: corsHeaders(), body: "Bad request" };
  }

  // Honeypot: real visitors never fill this hidden field.
  if (truncate(payload.company, 200)) {
    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json", ...corsHeaders() },
      body: JSON.stringify({ ok: true }),
    };
  }

  const name = truncate(payload.name, 200);
  const contact = truncate(payload.contact, 200);
  const direction = truncate(payload.direction, 100);
  const message = truncate(payload.message, 4000);

  if (!name || !contact) {
    return { statusCode: 400, headers: corsHeaders(), body: "Missing required fields" };
  }

  try {
    const token = await getInstallationToken();
    const body = [
      `**Имя:** ${name}`,
      `**Контакт:** ${contact}`,
      `**Направление:** ${direction || "не указано"}`,
      "",
      message || "_без сообщения_",
    ].join("\n");

    const issueRes = await fetch(`https://api.github.com/repos/${GITHUB_REPO}/issues`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/vnd.github+json",
        "User-Agent": "sila-uma-gitforms-function",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: `Заявка с сайта: ${name}`,
        body,
        labels: ["заявка"],
      }),
    });

    if (!issueRes.ok) {
      const text = await issueRes.text().catch(() => "");
      return { statusCode: 502, headers: corsHeaders(), body: `Upstream error: ${issueRes.status} ${text}` };
    }

    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json", ...corsHeaders() },
      body: JSON.stringify({ ok: true }),
    };
  } catch (err) {
    console.error("gitforms error:", err && err.message, err && err.stack);
    // TEMP: surface the real error for debugging. Revert to a generic message before real traffic.
    return { statusCode: 500, headers: corsHeaders(), body: `Server error: ${err && err.message}` };
  }
}
