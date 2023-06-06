FROM node:alpine AS build

WORKDIR /usr/src/app

#installs dependencies
# * means install all files that start with package
COPY ./package*.json ./

RUN npm install

COPY . .

RUN npm run build

### Caddy
FROM caddy:2.4.5-alpine
COPY Caddyfile /etc/caddy/Caddyfile
COPY --from=build /usr/src/app/build/ /srv

EXPOSE 2015
EXPOSE 80
EXPOSE 443