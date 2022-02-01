FROM node:12.14.0-alpine
RUN npm install -g npm@6.13.4

RUN mkdir -p /usr/src/bookshop-server
WORKDIR /usr/src/bookshop-server

ADD . /usr/src/bookshop-server
RUN npm install

CMD npm run start:dev