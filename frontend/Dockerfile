FROM node:latest
# set up angular cli
RUN yarn global add @angular/cli@9.0.5

WORKDIR /app
COPY package.json /app
COPY yarn.lock /app
RUN yarn install --pure-lockfile
COPY . /app

# create watch files
CMD ng serve --host 0.0.0.0 --disable-host-check --proxy-config proxy.conf.dev.json
EXPOSE 4200
