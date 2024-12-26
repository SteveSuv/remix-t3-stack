FROM node:22-alpine

WORKDIR /app

ADD build build
ADD public public
ADD prisma prisma
ADD package.json package.json
ADD node_modules node_modules
ADD .env .env

EXPOSE 3000
CMD ["npm", "start"]