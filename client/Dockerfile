FROM node:alpine

WORKDIR /usr/src/app

#installs dependencies
# * means install all files that start with package
COPY ./package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "start"]