FROM node:alpine

WORKDIR /app

ADD build build
ADD public public
ADD package.json package.json
ADD node_modules node_modules

ENV NODE_ENV production
ENV DATABASE_URL file:./dev.sqlite
ENV JWT_SECRET JWT_SECRET_EXAMPLE

EXPOSE 3000
CMD ["npm", "start"]