# remix-t3-stack

a full-stack TodoList example use `remix-t3-stack`, aims to bring better DX to react developers.

# features

- end-to-end type safe by `trpc`
- get userinfo anywhere by `useMyUserInfo`
- type safe form with `zod` by `useZodForm`
- no need to export `action`, just call `trpc` to mutate anywhere
- request with permission controll by `middleware`
- deploy to `docker` or `vercel`

# stack

- remix
- vite
- trpc
- tailwindcss
- typescript
- prisma
- jwt
- pnpm
- react-hook-form
- lucide-icons
- zod
- docker
- vercel

# how to dev

1. Clone this repository

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
pnpm deploy
```

- deploy to vercel: follow this [guide](https://vercel.com/docs/frameworks/remix)
