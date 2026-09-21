const { GITHUB_APP_CLIENT_ID, GITHUB_APP_CLIENT_SECRET, SELF_URL } = process.env;

function html(body) {
  return {
    statusCode: 200,
    headers: { "Content-Type": "text/html; charset=utf-8" },
    body,
  };
}

// Decap's github backend has no PKCE support (that's GitLab-only) and always
// opens a popup at `${base_url}/auth?...`. We set base_url to this function's
// own invoke URL, so this single endpoint plays both roles: with no `code`
// query param yet, it starts the GitHub OAuth flow; once GitHub redirects
// back here with a `code`, it exchanges it and hands the token to the popup
// opener via the postMessage handshake Decap listens for.
export async function handler(event) {
  const params = event.queryStringParameters || {};

  if (!params.code) {
    const authorizeUrl = new URL("https://github.com/login/oauth/authorize");
    authorizeUrl.searchParams.set("client_id", GITHUB_APP_CLIENT_ID);
    authorizeUrl.searchParams.set("redirect_uri", SELF_URL);
    authorizeUrl.searchParams.set("scope", "repo");
    if (params.state) authorizeUrl.searchParams.set("state", params.state);
    return { statusCode: 302, headers: { Location: authorizeUrl.toString() }, body: "" };
  }

  try {
    const tokenRes = await fetch("https://github.com/login/oauth/access_token", {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({
        client_id: GITHUB_APP_CLIENT_ID,
        client_secret: GITHUB_APP_CLIENT_SECRET,
        code: params.code,
        redirect_uri: SELF_URL,
      }),
    });
    const data = await tokenRes.json();

    if (!data.access_token) {
      const message = JSON.stringify({ message: data.error_description || "no access_token" });
      return html(`<script>
        (function() {
          function receive(e) {
            window.opener.postMessage('authorization:github:error:${message}', e.origin);
            window.removeEventListener("message", receive, false);
          }
          window.addEventListener("message", receive, false);
          window.opener.postMessage("authorizing:github", "*");
        })();
      </script>`);
    }

    const payload = JSON.stringify({ token: data.access_token, provider: "github" });
    return html(`<script>
      (function() {
        function receive(e) {
          window.opener.postMessage('authorization:github:success:${payload}', e.origin);
          window.removeEventListener("message", receive, false);
        }
        window.addEventListener("message", receive, false);
        window.opener.postMessage("authorizing:github", "*");
      })();
    </script>`);
  } catch (err) {
    console.error("decap-oauth error:", err && err.message, err && err.stack);
    return html(`<p>OAuth error, check function logs.</p>`);
  }
}
