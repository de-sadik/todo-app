FROM node:16.13.2-alpine AS build
WORKDIR /usr/app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM node:16.13.2-alpine
WORKDIR /usr/app
COPY package*.json ./
RUN npm install --production

COPY --from=build /usr/app/dist ./dist
COPY .env .
CMD node dist/index.js 