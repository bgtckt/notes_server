# Notes server

Cерверная часть **MERN**-проекта для портфолио соискателя на должность **junior frontend developer**.

---

## Особенности разработки

1. В качестве базы данных в проекте используется **_MongoDB_**;
2. Для реализации маршрутизации применен фреймворк **_Express_**;
3. Взаимодействие между приложением и базой данных реализовано с помощью библиотеки **_Mongoose_**;
4. Для тестирования запросов к серверу использовался **_Postman_**;
5. В процессе разработки производилась работа с **_GIT_**-_репозиторием_ через консоль;
6. Deploy проекта произведен на платформе **_Heroku_**.

---

## Особенности проекта

1. Реализован **API**-сервер, оснащенный **_CRUD_**-_функционалом_;
2. Применена пользовательская функция промежуточной обработки на уровне маршрутизатора;
3. Для создания токенов доступа используется **_JSON Web Token_**;
4. Шифрование конфиденциальных данных осуществляется средствами пакета **_bCrypt_**;
5. Производится валидация данных пользователя с помощью библиотеки **_express-validator_**;
6. Логика для работы с запросами и бизнес-логика реализованы с помощью отдельных классов.

---

## Сборка и запуск

1. Установить [Node.js](https://nodejs.org/en/);
2. Установить все необходимые пакеты (в корне проекта): `npm install`;
3. Инициализировать запуск проекта: `npm start`;
4. Инициализировать запуск проекта в режиме разработки: `npm run dev`;
