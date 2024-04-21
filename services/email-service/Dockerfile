FROM node:20.12.2-alpine AS base

WORKDIR /app

COPY package*.json ./
COPY .env ./

FROM base AS main

RUN npm install
RUN npm install -g nodemon

EXPOSE 3001

CMD ["npm", "run", "dev"]