### Пример React проекта

<p>Данный проект неполный и является примером использования стеков React, Redux, React Router, Helmet, Хуки, WebSocket+STOMP, Axios API, Docker и Bootstrap.</p>

### Создание сети chat-api-network

> docker network create chat-api-network

Признаком успешно созданной сети будет возвращенный hash код сети (пример):

> 6381e548e599540a405749b4e972f5bf7274232cfbc8ae626cbe064cb2f9dee7

### Внимание! Данное SPA приложение не самодостаточно. Оно работает в составе микросервисов аутентификации/авторизации, сервиса доступа к данным по JWT, прокси сервера nginx и Websocket сервиса подписки и отправки сообщений через RabbitMQ.
