# Сила ума — сайт технопарка

Next.js (static export) + Decap CMS + GitHub Pages. Контент редактируется
через `/admin/`, форма заявок пишет в Issues этого репозитория через Yandex
Cloud Function и GitHub App `sila-uma`.

## Разработка

```bash
npm install
npm run dev
```

## Контент

Всё редактируемое содержимое лежит в `content/`:

- `content/settings/site.yml` — название, текст баннера, порядок и видимость разделов
- `content/settings/about.yml`, `contacts.yml`, `enrollment.yml`, `documents.yml` — тексты разделов
- `content/directions/*.md` — шесть направлений
- `content/news/*.md` — новости
- `content/partners/*.md` — партнёры (логотипы — заглушки в `public/images/partners/`, замените на официальные, ссылки на источники ниже)
- `content/gallery/gallery.yml` — фотогалерея

Каждый раздел/элемент имеет поле `visible` — так редактор скрывает раздел через CMS,
не трогая код. Полный список разделов и их порядок — в `content/settings/site.yml → sections`.

## Decap CMS (`/admin/`)

`public/admin/config.yml` использует GitHub backend с `auth_type: pkce` —
логин через GitHub App `sila-uma` (Client ID уже прописан), без клиентского
секрета. Редактору для входа нужен доступ к репозиторию `sila-uma.github.io`
в организации.

## Форма заявок (GitForms)

`functions/gitforms/` — Yandex Cloud Function, которая получает данные формы
и создаёт Issue в этом репозитории через тот же GitHub App (installation
token, без PAT). Cloudflare Workers сюда сознательно не используется —
недоступен из РФ без VPN. Инструкция по деплою — `functions/gitforms/README.md`.
После деплоя функции пропишите её публичный URL в repository variable
`NEXT_PUBLIC_FORMS_ENDPOINT` (Settings → Secrets and variables → Actions →
Variables) — следующий push пересоберёт сайт с рабочей формой.

## Деплой

`.github/workflows/deploy.yml` собирает и публикует сайт на GitHub Pages при
каждом push в `main`. В настройках репозитория Settings → Pages → Source
должно быть выставлено **GitHub Actions**.

## Логотипы партнёров — источники

Текущие файлы в `public/images/partners/` — временные заглушки. Официальные
логотипы:

- РГПУ им. Герцена — herzen.spb.ru/smi/corp-style/
- Технопарк РГПУ им. Герцена — technopark.herzen.spb.ru
- Минпросвещения РФ — edu.gov.ru/about/official-symbols/
- Фонд «Моя история» — фондмояистория.рф

## Промпты для баннеров

См. описание в первом сообщении задачи / историю чата — четыре готовых
промпта для генерации фоновых изображений (без текста — заголовок
накладывается HTML/CSS поверх, т.к. модели плохо рисуют кириллицу).
