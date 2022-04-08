# СБорщик исходников
FROM node:12 AS builder
# Рабочая директория
WORKDIR /app

COPY ../ .

# Флаг окружения
ARG NODE_ENV
ENV REACT_APP_ENV $NODE_ENV

# Сервер аутентификации и авторизации
ARG BASE_AUTH_URL
ENV REACT_APP_BASE_AUTH_URL $BASE_AUTH_URL

# Дата-сервер
ARG BASE_DATA_URL
ENV REACT_APP_BASE_DATA_URL $BASE_DATA_URL

# WebSocker сервер
ARG BASE_WS_URL
ENV REACT_APP_BASE_WS_URL $BASE_WS_URL

# Учтановить node modules и собрать assets
RUN yarn install && yarn build

FROM nginx:1.16.0-alpine
COPY --from=builder /app/build /usr/share/nginx/html
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx/nginx.conf /etc/nginx/conf.d
EXPOSE 8087
CMD ["nginx", "-g", "daemon off;"]