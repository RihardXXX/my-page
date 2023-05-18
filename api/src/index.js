const { ApolloServer } = require('@apollo/server');
const { expressMiddleware } = require('@apollo/server/express4');
const { ApolloServerPluginDrainHttpServer } = require('@apollo/server/plugin/drainHttpServer');
const depthLimit = require('graphql-depth-limit');
const { createComplexityLimitRule } = require('graphql-validation-complexity');
// const cors = require('cors');
const bodyParser = require('body-parser');
const http = require('http');
const express = require('express');
const mongoose = require('mongoose');
const typeDefs = require('./schema');
const resolvers = require('./resolvers');
// const axios = require('axios'); // legacy way
const { port, dbPath, authUrl } = require('./config');

// настройка и подключение к БД БД
async function startMongo(dbPath='') {
    if (!dbPath) {
        throw new Error(`Ошибка упсс === [${dbPath}] путь к монге вы не отправили`);
    }
    await mongoose.connect(dbPath);
}

//===
const app = express();
// подключаем бодит парсер для пост запросов и json ответов
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Наш httpServer обрабатывает входящие запросы к нашему приложению Express.
// Ниже мы указываем серверу Apollo «слить» этот http-сервер,
// позволяя нашим серверам корректно завершать работу.
const httpServer = http.createServer(app);

const server = new ApolloServer({
    typeDefs,
    resolvers,
    // избежать большого количества вложеных запросов
    validationRules: [depthLimit(5), createComplexityLimitRule(1000)],
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
});

const startServer = () => {
    server
        .start()
        .then(async () => {
            // Настраиваем промежуточное ПО Express для обработки CORS, разбора тела,
            // и наша функция expressMiddleware.
            app.use(
                '/', // если не заработает то поменять на /api глядеть что nginx отправляет
                // кросдоменные запросы закрываем так как будем работать из под себя
                // cors({ origin: [`${domain}${port}${api_url}`, 'https://studio.apollographql.com'] }),
                bodyParser.json(),
                // expressMiddleware принимает те же аргументы:
                // экземпляр сервера Apollo и дополнительные параметры конфигурации
                expressMiddleware(server, {
                    context: async ({ req }) => {
                        // тут будем обращаться к соседнему контейнеру по поводу авторизации юзера
                        // const token =  req.headers.authorization;
                        // // без этой проверки все приложение крашится
                        // if (token) {
                        //     const { id: idUser } = getUserId(token);
                        //     return { idUser };
                        // }
                        return { token: req.headers.token };
                    },
                }),
            );

            // Модифицированный запуск сервера
            await new Promise((resolve) => httpServer.listen({ port }, resolve));

            console.log(`🚀 Server Graphql ready at ${port}`);

        })
        .catch(e => {
            console.log('server start failed: ', e);
        })
}

startMongo(dbPath)
    .then(() => startServer())
    .catch(err => console.log(err.message));