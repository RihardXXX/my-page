const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const fileType = new mongoose.Schema(
    {
        fileId: { type: String, required: true }, // айдишник файла сохраненный в гугл диске ответ после сохранения
        name: { type: String, required: true }, // имя файла
        mimeType: { type: String, required: true }, //  тип данных
        app: { type: String, required: true }, // файл для какого приложения
        category: { type: String, required: true }, // категория внутри самого приложения
        storage: { type: String, required: true }, // где будем хранить к примеру в гугл диске
        url: { type: String, required: true }, // где будем хранить к примеру в гугл диске
    },
    {
        // Присваиваем поля createdAt и updatedAt с типом данных
        timestamps: true
    }
);

fileType.plugin(mongoosePaginate);

module.exports = mongoose.model('fileType', fileType);
