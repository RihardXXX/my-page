const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const navItem = new mongoose.Schema(
    {
        name: { type: String, required: true },
        nameSection: { type: String, required: true },
        type: { type: String, required: true },
    },
    {
        // Присваиваем поля createdAt и updatedAt с типом данных
        timestamps: true
    }
);

navItem.plugin(mongoosePaginate);

module.exports = mongoose.model('NavItem', navItem);
