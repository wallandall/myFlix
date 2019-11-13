FROM node:lts-alpine

EXPOSE 8000

RUN apk add --no-cache tini

WORKDIR /usr/src/app
WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install && npm cache clean --force

COPY . .

ENTRYPOINT ["tini", "--"]

CMD ["node", "server.js"]