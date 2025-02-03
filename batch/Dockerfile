FROM node:22
WORKDIR /app
COPY package.json /app
RUN npm install -g npx@latest
RUN npm install
RUN rm -rf /app/node_modules
RUN npm install -g ts-node@latest

CMD [ "npx", "ts-node", "index.ts" ]