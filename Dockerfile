FROM node:alpine as builder
WORKDIR /app

COPY package.json yarn.lock .yarnrc.yml ./
RUN yarn install --immutable

COPY . .
RUN yarn nx run-many -t build

FROM nginx:alpine
COPY --from=builder /app/dist/apps/main /usr/share/nginx/html
