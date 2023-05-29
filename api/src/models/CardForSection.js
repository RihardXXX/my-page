const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const cardForSection = new mongoose.Schema(
    {
        type: { type: String, required: true },
        title: { type: String, required: true },
        welcome: { type: String, required: true },
        buttonName: { type: String, required: true },
        description: { type: String, required: true }
    },
    {
        // Присваиваем поля createdAt и updatedAt с типом данных
        timestamps: true
    }
);

cardForSection.plugin(mongoosePaginate);

module.exports = mongoose.model('cardForSection', cardForSection);
