FROM node:20.12.2-alpine AS base

WORKDIR /app

COPY package*.json ./

FROM base AS main

RUN npm install

COPY . .

EXPOSE 3002

CMD ["npm", "run", "start"]