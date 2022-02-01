FROM node:12.14.0-alpine
RUN npm install -g npm@6.13.4

RUN mkdir -p /usr/src/view-book-app
WORKDIR /usr/src/view-book-app

ADD . /usr/src/view-book-app
RUN npm install

CMD yarn webpack server