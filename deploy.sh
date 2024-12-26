pnpm i
pnpm db:gen
pnpm build
pnpm i --prod

docker stop todolist-app
docker rm todolist-app
docker rmi todolist-image

docker build --platform linux/amd64 -t todolist-image .
docker run --name todolist-app -p 3000:3000 -d todolist-image
docker image prune -f

sleep 3
open http://localhost:3000
