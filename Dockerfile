FROM node:10.15.3

RUN mkdir -p /app
COPY . /app
WORKDIR /app

RUN npm config set registry https://registry.npm.taobao.org
RUN npm install
RUN npm run build

ENV HOST 0.0.0.0
# Expose the app port
EXPOSE 3000

CMD npm run $NODE_ENV
