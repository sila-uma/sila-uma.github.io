export interface Env {
  GITHUB_APP_ID: string;
  GITHUB_INSTALLATION_ID: string;
  GITHUB_PRIVATE_KEY: string; // PKCS8 PEM, set via `wrangler secret put`
  GITHUB_REPO: string; // "sila-uma/sila-uma.github.io"
  ALLOWED_ORIGIN: string; // "https://sila-uma.github.io"
}

function corsHeaders(origin: string) {
  return {
    "Access-Control-Allow-Origin": origin,
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
  };
}

function base64url(bytes: ArrayBuffer | Uint8Array) {
  const arr = bytes instanceof Uint8Array ? bytes : new Uint8Array(bytes);
  let str = "";
  for (const b of arr) str += String.fromCharCode(b);
  return btoa(str).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

async function importPrivateKey(pem: string) {
  const body = pem
    .replace(/-----BEGIN PRIVATE KEY-----/, "")
    .replace(/-----END PRIVATE KEY-----/, "")
    .replace(/\s+/g, "");
  const der = Uint8Array.from(atob(body), (c) => c.charCodeAt(0));
  return crypto.subtle.importKey(
    "pkcs8",
    der,
    { name: "RSASSA-PKCS1-v1_5", hash: "SHA-256" },
    false,
    ["sign"]
  );
}

async function createAppJwt(env: Env) {
  const now = Math.floor(Date.now() / 1000);
  const header = { alg: "RS256", typ: "JWT" };
  const payload = { iat: now - 60, exp: now + 540, iss: env.GITHUB_APP_ID };
  const encoder = new TextEncoder();
  const unsigned = `${base64url(encoder.encode(JSON.stringify(header)))}.${base64url(
    encoder.encode(JSON.stringify(payload))
  )}`;
  const key = await importPrivateKey(env.GITHUB_PRIVATE_KEY);
  const signature = await crypto.subtle.sign("RSASSA-PKCS1-v1_5", key, encoder.encode(unsigned));
  return `${unsigned}.${base64url(signature)}`;
}

async function getInstallationToken(env: Env) {
  const jwt = await createAppJwt(env);
  const res = await fetch(
    `https://api.github.com/app/installations/${env.GITHUB_INSTALLATION_ID}/access_tokens`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${jwt}`,
        Accept: "application/vnd.github+json",
        "User-Agent": "sila-uma-gitforms-worker",
      },
    }
  );
  if (!res.ok) throw new Error(`installation token failed: ${res.status}`);
  const data = (await res.json()) as { token: string };
  return data.token;
}

function truncate(value: unknown, max: number) {
  const str = typeof value === "string" ? value : "";
  return str.slice(0, max).trim();
}

const worker = {
  async fetch(request: Request, env: Env): Promise<Response> {
    const origin = env.ALLOWED_ORIGIN;

    if (request.method === "OPTIONS") {
      return new Response(null, { headers: corsHeaders(origin) });
    }
    if (request.method !== "POST") {
      return new Response("Method not allowed", { status: 405, headers: corsHeaders(origin) });
    }

    let payload: Record<string, unknown>;
    try {
      payload = await request.json();
    } catch {
      return new Response("Bad request", { status: 400, headers: corsHeaders(origin) });
    }

    // Honeypot: real visitors never fill this hidden field.
    if (truncate(payload.company, 200)) {
      return new Response(JSON.stringify({ ok: true }), {
        headers: { "Content-Type": "application/json", ...corsHeaders(origin) },
      });
    }

    const name = truncate(payload.name, 200);
    const contact = truncate(payload.contact, 200);
    const direction = truncate(payload.direction, 100);
    const message = truncate(payload.message, 4000);

    if (!name || !contact) {
      return new Response("Missing required fields", { status: 400, headers: corsHeaders(origin) });
    }

    try {
      const token = await getInstallationToken(env);
      const body = [
        `**Имя:** ${name}`,
        `**Контакт:** ${contact}`,
        `**Направление:** ${direction || "не указано"}`,
        "",
        message || "_без сообщения_",
      ].join("\n");

      const issueRes = await fetch(`https://api.github.com/repos/${env.GITHUB_REPO}/issues`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/vnd.github+json",
          "User-Agent": "sila-uma-gitforms-worker",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: `Заявка с сайта: ${name}`,
          body,
          labels: ["заявка"],
        }),
      });

      if (!issueRes.ok) {
        return new Response("Upstream error", { status: 502, headers: corsHeaders(origin) });
      }

      return new Response(JSON.stringify({ ok: true }), {
        headers: { "Content-Type": "application/json", ...corsHeaders(origin) },
      });
    } catch {
      return new Response("Server error", { status: 500, headers: corsHeaders(origin) });
    }
  },
};

export default worker;
