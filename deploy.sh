pnpm i
pnpm db:gen
pnpm build
pnpm i --production
docker build --platform linux/amd64 -t todolist-image .
docker run --name todolist -p 3000:3000 -d todolist-image
docker image prune -f
open http://localhost:3000
