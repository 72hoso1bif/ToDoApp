### STAGE 1: Build ###
FROM node:16-alpine3.11 AS build
WORKDIR /builddir
COPY package.json package-lock.json ./
RUN npm install
COPY . ./
RUN npm run build:dev
### STAGE 2: Run ###
FROM nginx:1.17.1-alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /builddir/dist /usr/share/nginx/html
CMD ["nginx", "-g", "daemon off;"]
