FROM node:12.14.0-alpine
RUN npm install -g npm@6.13.4

RUN mkdir -p /usr/src/api-gateway
WORKDIR /usr/src/api-gateway

ADD . /usr/src/api-gateway
RUN npm install

CMD npm run start:dev