# GitForms — Yandex Cloud Function

Принимает POST с формы сайта (`{name, contact, direction, message}`) и
создаёт Issue в `sila-uma/sila-uma.github.io`, используя GitHub App
`sila-uma` (installation token, без PAT). Без внешних зависимостей — только
`node:crypto` и встроенный `fetch`.

Функция сама умеет проверять RSA-подпись через `node:crypto`, который (в
отличие от WebCrypto в Cloudflare Workers) понимает PKCS1-ключ
(`-----BEGIN RSA PRIVATE KEY-----`) как есть — конвертировать в PKCS8 не
нужно.

Ключ передаётся в переменную `GITHUB_PRIVATE_KEY_B64` в base64, одной
строкой, а не как есть. Это не для маскировки — у `yc`-шного `--environment`
парсинг сделан через CSV и **режет значение по первому переносу строки**,
так что «как есть» в переменную попадает только `-----BEGIN RSA PRIVATE
KEY-----` без самого ключа. Base64 убирает переносы строк, значение
становится однострочным, и парсер его больше не ломает.

## Разово, перед первым деплоем

1. Установите [Yandex Cloud CLI](https://yandex.cloud/ru/docs/cli/quickstart)
   и авторизуйтесь: `yc init`.
2. Установите App на репозиторий `sila-uma/sila-uma.github.io` (если ещё не
   сделали) и возьмите **Installation ID** из
   `github.com/settings/installations`.
3. Создайте функцию:
   ```bash
   yc serverless function create --name sila-uma-gitforms
   ```
4. Загрузите код и настройте переменные окружения (значения — App ID,
   Installation ID, полный текст `.pem`-ключа, имя репозитория, домен сайта):
   ```bash
   yc serverless function version create \
     --function-name sila-uma-gitforms \
     --runtime nodejs22 \
     --entrypoint index.handler \
     --memory 128m \
     --execution-timeout 10s \
     --source-path . \
     --environment GITHUB_APP_ID=5023218 \
     --environment GITHUB_INSTALLATION_ID=163545663 \
     --environment GITHUB_REPO=sila-uma/sila-uma.github.io \
     --environment ALLOWED_ORIGIN=https://sila-uma.github.io \
     --environment GITHUB_PRIVATE_KEY_B64="$(base64 < /path/to/private-key.pem | tr -d '\n')"
   ```
   Ключ через переменную окружения (пусть и в base64) — самый простой
   вариант. Надёжнее хранить его в
   [Yandex Lockbox](https://yandex.cloud/ru/docs/lockbox/) и подключать
   флагом `--secret environment-variable=GITHUB_PRIVATE_KEY_B64,id=<secret-id>,version-id=<version-id>,key=<key>`
   вместо обычного `--environment` (тогда и в base64 переводить не
   обязательно, но код уже настроен именно на base64 — потребуется небольшая
   правка `index.js`, если решите так делать).
5. Разрешите анонимные вызовы (форма дергает функцию прямо из браузера, без
   авторизации):
   ```bash
   yc serverless function allow-unauthenticated-invoke --name sila-uma-gitforms
   ```
   (если флаг называется иначе в вашей версии CLI — `yc serverless function --help`)
6. Узнайте id функции и публичный URL:
   ```bash
   yc serverless function get --name sila-uma-gitforms
   # URL вида https://functions.yandexcloud.net/<id функции>
   ```

## После деплоя

Впишите публичный URL функции в repository variable сайта
`NEXT_PUBLIC_FORMS_ENDPOINT` (Settings → Secrets and variables → Actions →
Variables) — следующий push пересоберёт сайт с рабочей формой.

## Обновление кода

После правок в `index.js` повторите шаг 4 (`yc serverless function version
create …`) — Yandex Cloud создаёт новую версию функции и переключает на неё
публичный URL. Yandex не хранит переменные окружения между версиями — при
каждом обновлении их нужно передавать заново целиком, включая ключ.

## Текущий деплой (для справки)

- Функция: `sila-uma-gitforms`, id `d4et5lbdm5c461hfveit`
- Публичный URL: `https://functions.yandexcloud.net/d4et5lbdm5c461hfveit`
  (это и есть значение `NEXT_PUBLIC_FORMS_ENDPOINT`)
- Yandex Cloud: cloud `b1gl9o79tmsuo746kie0`, folder `b1ghq8gq2gaah0ohcvfg`
- GitHub App: `sila-uma`, App ID `5023218`, Installation ID `163545663`
  (на репозиторий `sila-uma/sila-uma.github.io`)
