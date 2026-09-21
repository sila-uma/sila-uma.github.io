"use client";

import { useEffect, useState } from "react";

// This page runs in the popup Decap opened, on the same origin as
// config.yml's base_url — required, because decap-cms-lib-auth's opener-side
// handshake checks `e.origin === this.base_url` before it will reply. The
// actual GitHub code-for-token exchange (needs the client secret) happens in
// a Yandex Cloud Function, called here via fetch; this page only relays the
// result through window.postMessage using Decap's expected handshake:
// popup sends "authorizing:github" -> opener echoes it back -> popup sends
// the final authorization:github:success/error message.
const FUNCTION_URL = "https://functions.yandexcloud.net/d4em74tq5amiq7d1pb8o";

function initialStatus() {
  if (typeof window === "undefined") return "Завершаем вход…";
  const code = new URLSearchParams(window.location.search).get("code");
  if (!code || !window.opener) {
    return "Код авторизации не найден. Закройте окно и попробуйте снова.";
  }
  return "Завершаем вход…";
}

export default function OAuthCallbackPage() {
  const [status, setStatus] = useState(initialStatus);

  useEffect(() => {
    const code = new URLSearchParams(window.location.search).get("code");
    if (!code || !window.opener) return;

    fetch(`${FUNCTION_URL}?code=${encodeURIComponent(code)}`)
      .then((res) => res.json())
      .then((data: { token?: string; error?: string }) => {
        const message = data.token
          ? `authorization:github:success:${JSON.stringify({ token: data.token, provider: "github" })}`
          : `authorization:github:error:${JSON.stringify({ message: data.error || "unknown error" })}`;

        function receive(e: MessageEvent) {
          if (e.data === "authorizing:github") {
            window.opener?.postMessage(message, e.origin);
            window.removeEventListener("message", receive);
          }
        }
        window.addEventListener("message", receive);
        window.opener?.postMessage("authorizing:github", "*");
        setStatus(data.token ? "Готово, окно закроется автоматически." : `Ошибка: ${data.error}`);
      })
      .catch(() => setStatus("Ошибка сети при обмене кода на токен."));
  }, []);

  return <p style={{ fontFamily: "sans-serif", padding: 24 }}>{status}</p>;
}
