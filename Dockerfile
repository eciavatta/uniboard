FROM node:10

COPY . /app

WORKDIR /app

RUN rm -rf node_modules
RUN rm -rf dist

RUN yarn install
RUN yarn build
