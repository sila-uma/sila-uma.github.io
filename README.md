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

`public/admin/config.yml` использует GitHub backend. У этого бэкенда (в
отличие от GitLab) нет `auth_type: pkce` — логин идёт через полноценный
OAuth-обмен с сервером, который держит client secret. Реализовано без
Netlify (недоступен из РФ так же, как Cloudflare) через три собственные
части:

- `base_url: https://sila-uma.github.io` + `auth_endpoint: oauth/auth` —
  Decap открывает попап на `/oauth/auth`, статической странице сайта,
  которая редиректит на GitHub.
- `functions/decap-oauth/` — Yandex Cloud Function, обменивает код на
  токен (нужен client secret GitHub App, поэтому не в браузере).
- `/oauth/callback` — ещё одна статическая страница сайта, куда GitHub
  возвращает пользователя; она дергает функцию и сама шлёт токен обратно
  странице `/admin/` через `postMessage`.

Подробности и почему это разбито именно так — `functions/decap-oauth/README.md`.
Редактору для входа нужен доступ к репозиторию `sila-uma.github.io` в
организации.

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

Модели плохо рисуют кириллицу, поэтому промпты — только на фон/сцену,
заголовок накладывается поверх HTML/CSS-текстом (как сейчас сделано в
`Hero.tsx`):

1. *Modern children's technology education center interior, robotics
   workshop, kids building drones and robots, bright natural light, orange
   and deep blue color accents, wide banner composition with empty space on
   the left third for text overlay, photorealistic, editorial photography
   style*
2. *Aerial drone flying over a bright modern STEM classroom, laser cutting
   workstation and 3D printers in background, Caucasus mountains visible
   through large windows, warm afternoon light, cinematic wide shot,
   negative space on right side for headline*
3. *Diverse group of teenagers collaborating on a media production set with
   cameras and lighting rig, next to an industrial design workshop with
   prototypes, clean modern architecture, orange-blue brand palette,
   panoramic banner, soft depth of field*
4. Абстрактный вариант без людей (безопаснее по лицензии): *Abstract
   geometric pattern combining circuit board lines, drone silhouette, gear,
   laser beam and camera aperture icons, orange and navy gradient
   background, flat modern vector illustration style, wide banner format*

## Yandex Cloud — где что развёрнуто

Обе serverless-функции живут в одном облаке/каталоге:
cloud `b1gl9o79tmsuo746kie0`, folder `b1ghq8gq2gaah0ohcvfg`
(`yc config set cloud-id/folder-id` перед деплоем, если работаете с новой
машины). Детали и точные команды деплоя — в README рядом с каждой функцией:
`functions/gitforms/README.md`, `functions/decap-oauth/README.md`.

GitHub App `sila-uma` (App ID `5023218`) установлен только на
`sila-uma/sila-uma.github.io`, Installation ID `163545663`. Redirect URI,
которым реально пользуется текущая схема логина: `https://sila-uma.github.io/oauth/callback`
(остальные, если остались в настройках App — не мешают, можно удалить).
