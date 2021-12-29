FROM node:lts-alpine3.12

RUN apk update && apk add yarn bash curl zip

WORKDIR /opt/app

COPY package.json .

RUN yarn install

COPY . .

EXPOSE 3000

ENTRYPOINT ["yarn", "start"]