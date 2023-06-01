const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose');
const app = express()
const { port, dbPath, authUrl } = require('./config');

app.get('/', (req, res) => {
    res.send('Hello World!')
})
const startMongo = async (dbPath) => {
    if (!dbPath) {
        throw new Error(`Ошибка упсс === [${dbPath}] путь к монге вы не отправили`);
    }
    await mongoose.connect(dbPath);
    console.log('запущен БД работы с файлами')
}

const startServer = (port) => {
    app.listen(port, () => {
        console.log(`Запущен сервер для работы с файлами ${port}`)
    })
}

startMongo(dbPath)
    .then(() => startServer(port))
    .catch(err => console.log(err.message));
