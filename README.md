# Технопарк «Сила ума»

Официальный сайт детского технопарка «Сила ума» в Цхинвале.

**Сайт:** https://sila-uma.github.io

**Панель редактора:** https://sila-uma.github.io/admin/

## Технологии

- Next.js 16 и React 19
- TypeScript
- Tailwind CSS 4
- Decap CMS для редактирования контента
- GitHub Actions и GitHub Pages для публикации

Сайт собирается как полностью статический экспорт. Тексты, новости и настройки
хранятся отдельно от компонентов в каталоге `content/`.

## Локальный запуск

Требуется Node.js 22.

```bash
npm ci
npm run dev
```

Проверка проекта перед публикацией:

```bash
npm run lint
npm run build
```

## Структура проекта

```text
content/                 редактируемые тексты и настройки
public/admin/            конфигурация Decap CMS
public/images/           изображения и логотипы
src/app/                 страницы и общие стили
src/components/          компоненты главной страницы
src/lib/content.ts       загрузка и типизация контента
functions/decap-oauth/   OAuth-функция для входа в CMS
functions/gitforms/      функция отправки заявок в GitHub Issues
.github/workflows/       автоматическая сборка и публикация
```

## Работа с контентом

Основные файлы:

- `content/settings/site.yml` — общие настройки и видимость разделов;
- `content/settings/about.yml` — описание технопарка и показатели;
- `content/settings/contacts.yml` — контакты и карта;
- `content/directions/*.md` — направления обучения;
- `content/news/*.md` — новости;
- `content/gallery/gallery.yml` — фотогалерея.

Контент можно изменять напрямую в репозитории или через `/admin/`. Поле
`visible` позволяет скрывать материал без его удаления.

## Публикация

Workflow `.github/workflows/deploy.yml` запускает проверки, собирает статическую
версию в `out/` и публикует её на GitHub Pages после push в `main`.

Для работы опциональной формы заявок задайте repository variable
`NEXT_PUBLIC_FORMS_ENDPOINT`. Секреты OAuth и GitHub App должны храниться
только в переменных окружения серверных функций и не добавляться в репозиторий.

Подробная настройка функций описана в README внутри соответствующих каталогов.
