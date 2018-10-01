FROM node:10.11.0-alpine

RUN adduser -D -s /bin/false app

ENV HOME=/home/app

RUN npm install -g eslint
RUN npm install -g nodemon
RUN npm install -g concurrently
RUN npm install -g plop

RUN mkdir $HOME/workowl
RUN mkdir $HOME/workowl/api
RUN mkdir $HOME/workowl/client

COPY api/package.json api/package-lock.json $HOME/workowl/api/
COPY client/package.json client/package-lock.json $HOME/workowl/client/

RUN chown -R app:app $HOME/*
RUN chown -R app:app ~/.npm
RUN chown -R app:app ~/.config
RUN chown -R app:app ~/api/.config
RUN chown -R app:app ~/client/.config

USER app

WORKDIR ${HOME}/workowl/api
RUN npm install

WORKDIR ${HOME}/workowl/client
RUN npm install

WORKDIR ${HOME}/workowl/api

CMD ["npm", "run", "dev"]