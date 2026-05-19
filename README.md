# Доставка «Вкусно как в Грузии»

Статический сайт на Next.js: меню, корзина, доставка, контакты.

## Сайт онлайн (GitHub Pages)

**https://yourecdigital.github.io/dvizh/**

| Страница | Ссылка |
|----------|--------|
| Главная | https://yourecdigital.github.io/dvizh/ |
| Меню | https://yourecdigital.github.io/dvizh/menu/ |
| Доставка | https://yourecdigital.github.io/dvizh/delivery/ |
| О нас | https://yourecdigital.github.io/dvizh/about/ |
| Контакты | https://yourecdigital.github.io/dvizh/contacts/ |

Репозиторий: https://github.com/yourecdigital/dvizh

## Локальная разработка

```bash
npm install
npm run dev
```

Откройте http://localhost:3022

## Статическая сборка (как на GitHub)

```bash
npm run build
# env: SKIP_VERIFY_EXPORT=1 BASE_PATH=/dvizh
npm run start
```

Папка `out/` — готовый статический сайт для любого хостинга.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
