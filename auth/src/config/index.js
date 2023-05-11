// получаем из docker compose.yaml снаружи
module.exports.port = process.env.PORT;
module.exports.host = process.env.HOST;
module.exports.dbPath = process.env.MONGO_URL;
module.exports.apiUrl = process.env.API_URL;
module.exports.apiMailer = process.env.API_MAILER;
