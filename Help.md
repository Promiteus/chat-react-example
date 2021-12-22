###DatePicker и проблемах его установки
<p>DatePicker из Material UI сам по себе не работает! Для его работы
необходимо установить дополнительную зависимость.</p>
<i style="color: #f3e92c">npm install date-fns --save</i>

###Проверка собираемости проекта
<p>Для того, чтобы убедиться, что все работает, нужно вызвать скрипт сборки проекта.</p>
<i style="color: #f3e92c">npm run-script build</i>

###Вываливалась ошибка сериализации у redux
<p>Исправить ее можно отключением проверки объектов на сериализуемость в настройках хранилища. Код:</p>
<p>Так выглядит ошибка: <span style="color: #FF0000">react A non-serializable value was detected in an action, in the path: `payload.config.adapter`...</span></p>
<i style="color: #f3e92c">
import {configureStore, getDefaultMiddleware} from "@reduxjs/toolkit";
...
export const store = configureStore({
  reducer,
  middleware: getDefaultMiddleware({
    serializableCheck: false,
  }),
})</i>