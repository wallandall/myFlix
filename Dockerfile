#To build this image type: docker build -t wallandall/my-flix:latest .
#To run image typer: docker run -p 8080:8080 wallandall/my-flix
FROM node

WORKDIR /usr/app

COPY package*.json .

RUN npm install && npm cache clean --force

COPY . .

CMD ["node", "server.js"]