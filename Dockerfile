FROM node:10.21.0

WORKDIR /usr/src/app
COPY package.json ./
COPY yarn.lock ./
RUN yarn

COPY . .

EXPOSE 3000
CMD ["yarn start:dev"]
