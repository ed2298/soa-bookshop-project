FROM node:12.14.0-alpine
RUN npm install -g npm@6.13.4

RUN mkdir -p /usr/src/bookshop-app
WORKDIR /usr/src/bookshop-app

ADD . /usr/src/bookshop-app
RUN npm install

CMD yarn webpack server