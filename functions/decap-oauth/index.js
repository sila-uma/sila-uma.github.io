const { GITHUB_APP_CLIENT_ID, GITHUB_APP_CLIENT_SECRET, REDIRECT_URI, ALLOWED_ORIGIN } = process.env;

function corsHeaders() {
  return {
    "Access-Control-Allow-Origin": ALLOWED_ORIGIN,
    "Access-Control-Allow-Methods": "GET, OPTIONS",
  };
}

function json(statusCode, data) {
  return {
    statusCode,
    headers: { "Content-Type": "application/json", ...corsHeaders() },
    body: JSON.stringify(data),
  };
}

// Decap's popup-handshake protocol requires the page that calls
// window.opener.postMessage(...) to be served from an origin that exactly
// equals `base_url` in config.yml (decap-cms-lib-auth checks
// `e.origin === this.base_url`). That page is a static route on our own
// site (src/app/oauth/callback/), not this function — a Yandex function's
// origin can never match a github.io base_url. So this function is just a
// plain CORS'd JSON API: given the OAuth `code`, exchange it for a token.
// The static callback page calls this via fetch and does the postMessage
// handshake itself, from the right origin.
export async function handler(event) {
  if (event.httpMethod === "OPTIONS") {
    return { statusCode: 204, headers: corsHeaders(), body: "" };
  }

  const code = (event.queryStringParameters || {}).code;
  if (!code) {
    return json(400, { error: "missing code" });
  }

  try {
    const tokenRes = await fetch("https://github.com/login/oauth/access_token", {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({
        client_id: GITHUB_APP_CLIENT_ID,
        client_secret: GITHUB_APP_CLIENT_SECRET,
        code,
        redirect_uri: REDIRECT_URI,
      }),
    });
    const data = await tokenRes.json();

    if (!data.access_token) {
      console.error("decap-oauth exchange failed:", data);
      return json(400, { error: data.error_description || data.error || "no access_token" });
    }

    return json(200, { token: data.access_token });
  } catch (err) {
    console.error("decap-oauth error:", err && err.message, err && err.stack);
    return json(500, { error: "server error" });
  }
}
