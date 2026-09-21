"use client";

import { useEffect } from "react";

// Decap's github backend (no PKCE support there — that's GitLab-only) always
// opens its login popup at `${base_url}/auth`. GitHub Pages serves real
// subpaths, so this static page plays the "start" half of the OAuth flow:
// it just redirects to GitHub with our GitHub App's client_id. The "finish"
// half (exchanging the code — needs the client secret) can't happen in the
// browser, so redirect_uri points at the Yandex Cloud Function that does it
// server-side (see functions/decap-oauth/).
const CLIENT_ID = "Iv23lijBAIlCb0UzURGQ";
const CALLBACK_URL = "https://functions.yandexcloud.net/d4em74tq5amiq7d1pb8o";

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
