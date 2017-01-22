FROM node:6.9.3

ENV PORT 80

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

ENV NODE_ENV production
COPY package.json yarn.lock /usr/src/app/
RUN npm i -g yarn@0.19
RUN yarn --pure-lockfile
COPY . /usr/src/app

EXPOSE 80

CMD [ "npm", "start" ]
