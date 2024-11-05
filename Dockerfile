FROM node:23-alpine

WORKDIR /app

ADD build build
ADD package.json package.json
ADD node_modules node_modules

ENV NODE_ENV production
ENV DATABASE_URL file:./dev.sqlite
ENV JWT_SECRET JWT_SECRET_EXAMPLE
ENV PORT 3000

EXPOSE 3000
CMD ["npm", "start"]