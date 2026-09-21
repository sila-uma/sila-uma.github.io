# decap-oauth — Yandex Cloud Function

Обменивает код авторизации GitHub на access-токен для логина в Decap CMS
(`/admin/`). Не хранит ничего, не пишет в репозиторий — только
код → токен.

## Почему это вообще нужно

Decap CMS поддерживает `auth_type: pkce` (логин без своего сервера, только
браузер) **только у GitLab-бэкенда**. У `backend: github` PKCE нет — он либо
идёт через хостed OAuth-прокси Netlify (`api.netlify.com`, не наш случай —
недоступен так же, как Cloudflare), либо требует свой сервер для
code-exchange, потому что этот шаг требует client secret, а секрет нельзя
держать в браузере.

Разобрано на три части — и это важно, порядок и разделение не случайны:

1. **`src/app/oauth/auth/page.tsx`** — статическая страница на самом сайте.
   Decap всегда открывает попап на `${base_url}/${auth_endpoint}`
   (`config.yml` → `base_url: https://sila-uma.github.io`,
   `auth_endpoint: oauth/auth`), эта страница просто редиректит на
   `github.com/login/oauth/authorize`. Секрет тут не нужен — на этом шаге
   его и не требует OAuth-протокол.
2. **Эта функция** — по коду от GitHub получает `access_token` (нужен
   `client_secret`, поэтому только на сервере) и отдаёт его как обычный
   JSON `{ "token": "..." }`. Больше ничего не делает — не открывает попапы,
   не постит сообщения.
3. **`src/app/oauth/callback/page.tsx`** — тоже статическая страница на
   сайте, GitHub редиректит сюда после согласия пользователя. Она дергает
   функцию через `fetch` и **сама** отправляет `window.opener.postMessage(...)`
   с результатом.

Шаг 3 обязан быть отдельной страницей на **том же домене**, что и
`base_url`, а не частью этой функции — потому что клиентский код Decap
(`decap-cms-lib-auth`) при разборе postMessage-хендшейка сверяет
`event.origin === this.base_url` **строкой, включая отсутствие пути**.
Страница на `functions.yandexcloud.net` этот origin никогда не пройдёт, и
попап просто зависает на белом/пустом экране без единой ошибки — ровно так
это и проявлялось, пока не разобрались. Сам протокол (взято из исходников
`decap-cms-lib-auth/src/netlify-auth.js`):

```
попап → opener:  "authorizing:github"
opener → попап:  "authorizing:github"           (эхо, только если e.origin === base_url)
попап → opener:  "authorization:github:success:{"token":...,"provider":"github"}"
```

## Разово, перед первым деплоем

1. В настройках GitHub App (`github.com/settings/apps/sila-uma`) →
   **Identifying and authorizing users** → добавьте Redirect URI:
   ```
   https://sila-uma.github.io/oauth/callback
   ```
2. Там же → **Client secrets** → "Generate a new client secret" → скопируйте
   значение (виден только один раз).
3. Создайте функцию и задеплойте код:
   ```bash
   cd functions/decap-oauth
   yc serverless function create --name sila-uma-decap-oauth
   yc serverless function version create \
     --function-name sila-uma-decap-oauth \
     --runtime nodejs22 \
     --entrypoint index.handler \
     --memory 128m \
     --execution-timeout 10s \
     --source-path . \
     --environment GITHUB_APP_CLIENT_ID=Iv23lijBAIlCb0UzURGQ \
     --environment GITHUB_APP_CLIENT_SECRET="<секрет из шага 2>" \
     --environment REDIRECT_URI=https://sila-uma.github.io/oauth/callback \
     --environment ALLOWED_ORIGIN=https://sila-uma.github.io
   yc serverless function allow-unauthenticated-invoke --name sila-uma-decap-oauth
   yc serverless function get --name sila-uma-decap-oauth
   # URL вида https://functions.yandexcloud.net/<id функции>
   ```
   Client secret — однострочное значение, в отличие от `.pem`-ключа
   GitForms, так что баг с обрезкой многострочных `--environment` (см.
   `functions/gitforms/README.md`) тут не актуален, base64 не нужен.
4. Если id функции отличается от уже прописанного в коде — обновите
   `FUNCTION_URL` в `src/app/oauth/callback/page.tsx` и `CALLBACK_URL` в
   `src/app/oauth/auth/page.tsx` на актуальный URL, закоммитьте и запушьте.

## Обновление кода

После правок в `index.js` повторите команду `yc serverless function version
create …` из шага 3 (с актуальным `GITHUB_APP_CLIENT_SECRET`, Yandex не
хранит прошлые переменные между версиями — их нужно передавать заново
целиком).

## Проверка без браузера

```bash
curl -i "https://functions.yandexcloud.net/<id функции>"
# 400 {"error":"missing code"} — функция жива, CORS-заголовок на месте
```

Полный цикл (редирект → согласие → обмен → postMessage) можно проверить
только реальным логином на `/admin/` — код авторизации одноразовый и
привязан к живой сессии в браузере.

## Текущий деплой (для справки)

- Функция: `sila-uma-decap-oauth`, id `d4em74tq5amiq7d1pb8o`
- Yandex Cloud: cloud `b1gl9o79tmsuo746kie0`, folder `b1ghq8gq2gaah0ohcvfg`
- GitHub App: `sila-uma`, App ID `5023218`, Client ID `Iv23lijBAIlCb0UzURGQ`
