"use client";

import { useEffect } from "react";

// Decap's github backend (no PKCE support there — that's GitLab-only) always
// opens its login popup at `${base_url}/${auth_endpoint}` (config.yml points
// that at this page). This is just the "start" half of the OAuth flow: it
// redirects to GitHub with our GitHub App's client_id. redirect_uri points
// at our own /oauth/callback page (not the Yandex function directly) — the
// page that does window.opener.postMessage(...) must be served from the
// same origin as config.yml's base_url, which a functions.yandexcloud.net
// URL can never be. See src/app/oauth/callback/page.tsx.
const CLIENT_ID = "Iv23lijBAIlCb0UzURGQ";
const CALLBACK_URL = "https://sila-uma.github.io/oauth/callback";

export default function OAuthAuthPage() {
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const authorize = new URL("https://github.com/login/oauth/authorize");
    authorize.searchParams.set("client_id", CLIENT_ID);
    authorize.searchParams.set("redirect_uri", CALLBACK_URL);
    authorize.searchParams.set("scope", "repo");
    const state = params.get("state");
    if (state) authorize.searchParams.set("state", state);
    window.location.replace(authorize.toString());
  }, []);

  return null;
}
