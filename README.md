# remix-t3-stack

A full-stack todolist example using `remix-t3-stack`, aims to bring better DX to react developers.

![image](https://github.com/user-attachments/assets/0129c74a-29f7-4ec0-9957-bd83dae79558)

# features

- end-to-end type safe by `trpc`
- get `myUserInfo` anywhere by `useMyUserInfo`
- type safe form with `zod` by `useZodForm`
- no need to export `action` in routes, just call `trpcClient.action` to mutate anywhere
- request with permission control by `trpc middlewares`
- deploy to `docker` or `vercel`
- support dark mode by `useAppTheme`
- use `prisma` to keep type safe with db
- toast request error automatically
- always use latest remix (react-router v7) features

# stack

- remix (react-router v7)
- vite
- trpc
- tailwindcss
- typescript
- prisma
- jwt
- pnpm
- react-hook-form
- react-query
- next-themes
- lucide-icons
- zod
- docker
- vercel

# how to dev

1. clone this repository

```
git clone git@github.com:SteveSuv/remix-t3-stack.git
```

2. install packages

```
npm i pnpm -g
pnpm i
```

3. init database

```
pnpm db:push
pnpm db:gen
```

4. run dev server

```
pnpm dev
```

5. build and preview

```
pnpm build
pnpm start
```

# how to deploy

- deploy to docker

```
pnpm run deploy
```

- deploy to vercel: follow this [guide](https://vercel.com/docs/frameworks/remix)

# notice

- remix v3 has been migrated to [react-router v7](https://remix.run/blog/react-router-v7)
- do not upgrade vite to v6 until it's widely adopted
- a more complex project using `remix-t3-stack` is here: [remix-words-funny](https://github.com/SteveSuv/remix-words-funny)
