FROM node:12.4.0-alpine
RUN npm install -g npm@6.13.4

RUN mkdir -p /usr/src/discounts-server
WORKDIR /usr/src/discounts-server

ADD . /usr/src/discounts-server
RUN npm install

CMD npm run start:dev