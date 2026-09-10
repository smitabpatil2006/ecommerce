# Nike Store

Next.js (App Router) + TypeScript + ESLint + Tailwind CSS, with Better Auth, Neon Postgres, Drizzle ORM and Zustand.

The homepage is a server component that queries the `products` table with Drizzle and renders the list; adding to cart uses a persisted Zustand store.

## Setup

```bash
npm install
cp .env.example .env.local   # fill in DATABASE_URL and BETTER_AUTH_SECRET
npm run db:migrate           # apply drizzle migrations to Neon
npm run db:seed              # insert sample Nike products
npm run dev
```

`BETTER_AUTH_SECRET` can be generated with `openssl rand -base64 32`.

## Scripts

| script | description |
| --- | --- |
| `npm run dev` | start the dev server |
| `npm run build` / `npm start` | production build / serve |
| `npm run lint` | ESLint |
| `npm run db:generate` | generate SQL migrations from `src/db/schema.ts` |
| `npm run db:migrate` | apply migrations |
| `npm run db:push` | push schema without migration files |
| `npm run db:studio` | Drizzle Studio |
| `npm run db:seed` | reseed sample Nike products |

## Layout

- `src/db/schema.ts` — `products` table plus Better Auth tables (`user`, `session`, `account`, `verification`)
- `src/db/index.ts` — Drizzle client over the Neon serverless driver
- `src/db/seed.ts` — sample Nike catalog
- `src/lib/auth.ts` / `src/lib/auth-client.ts` — Better Auth server config (Drizzle adapter, email + password) and React client
- `src/app/api/auth/[...all]/route.ts` — Better Auth route handler
- `src/store/cart.ts` — Zustand cart store (persisted to localStorage)
- `src/app/page.tsx` — homepage product list
