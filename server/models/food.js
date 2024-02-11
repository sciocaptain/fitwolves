const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const FoodSchema = new Schema({
    name: { type: String},
    day: { type: String},
    type: { type: String},
    calories: { type: Number},
});

FoodSchema.virtual('url').get(function () {
    return `/food/${this._id}`;
});

module.exports = mongoose.model('Food', FoodSchema);
