FROM node:lts-alpine3.12

RUN apk update && apk add yarn bash curl zip

WORKDIR /opt/app/cdk

COPY package.json .

RUN yarn install

COPY . .

RUN yarn bundle

RUN chmod a+x entrypoint.sh

CMD [ "./entrypoint.sh" ]