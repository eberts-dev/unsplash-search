# Unsplash Search

Поисковик изображений на базе Unsplash API с адаптивной версткой и современным UI.

## Структура проекта

```
├── public/
├── src/
│   ├── assets/
│   │   └── img/
│   ├── components/
│   │   ├── ImageCard/
│   │   ├── ImageGrid/
│   │   └── SearchBar/
│   ├── pages/
│   └── styles/
├── package.json
├── tsconfig.json
├── next.config.mjs
└── README.md
```

## Технологии

- Next.js 14
- React 18
- TypeScript
- SCSS-модули (с переменными и миксинами)
- Адаптивная верстка (mobile first)

## Особенности

- Поиск работает только по латинским символам (английский язык). Русские запросы не поддерживаются Unsplash API.
- Плавная анимация, адаптивность под мобильные устройства.

## Демо

[Готовый проект на Vercel](https://unsplash-search-beta.vercel.app/)

## Быстрый старт

```bash
npm install
npm run dev
```

Откройте [http://localhost:3000](http://localhost:3000) в браузере.
