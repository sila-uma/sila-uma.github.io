# GitForms worker

Принимает POST с формы сайта (`{name, contact, direction, message}`) и создаёт
Issue в `sila-uma/sila-uma.github.io`, используя GitHub App вместо PAT.

## Разово, перед первым деплоем

1. В настройках GitHub App → **Generate a private key**, скачается `.pem`
   (формат PKCS#1, `-----BEGIN RSA PRIVATE KEY-----`).
2. Cloudflare Workers понимает только PKCS8, конвертируйте:
   ```
   openssl pkcs8 -topk8 -inform PEM -outform PEM -nocrypt \
     -in original-private-key.pem -out private-key-pkcs8.pem
   ```
3. Установите App на репозиторий `sila-uma/sila-uma.github.io`, откройте
   `github.com/settings/installations`, зайдите в установку и возьмите
   **Installation ID** из URL — впишите его в `wrangler.toml`
   (`GITHUB_INSTALLATION_ID`).
4. `cd workers/gitforms && npm install`
5. `npx wrangler login`
6. `npx wrangler secret put GITHUB_PRIVATE_KEY` — вставьте содержимое
   `private-key-pkcs8.pem` целиком.
7. `npm run deploy` — Wrangler выведет URL воркера
   (`https://sila-uma-gitforms.<account>.workers.dev`).

## После деплоя

Впишите URL воркера в GitHub Actions переменную репозитория
`NEXT_PUBLIC_FORMS_ENDPOINT` (Settings → Secrets and variables → Actions →
Variables), чтобы форма на сайте знала, куда отправлять заявки. Следующий
push пересоберёт сайт с этим адресом.
