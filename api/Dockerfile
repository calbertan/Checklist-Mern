FROM node:alpine

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

#installs dependencies
# * means install all files that start with package
COPY ./package*.json ./

RUN npm install

#copies from source to workdir
COPY . .

EXPOSE 3001

CMD ["npm", "start"]