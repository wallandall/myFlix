FROM node:alpine 
WORKDIR /usr/app
COPY ./package.json ./
RUN npm install
COPY . .
CMD ["node", "server.js"]

FROM nginx
EXPOSE 3000
COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/build /usr/share/nginx/html