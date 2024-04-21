FROM node:20.12.2-alpine AS base

WORKDIR /app

COPY package*.json ./
COPY .env ./
COPY public ./public

FROM base AS main

RUN npm install
RUN npm install -g nodemon

EXPOSE 3002

CMD ["npm", "run", "dev"]