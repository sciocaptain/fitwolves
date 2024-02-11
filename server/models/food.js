const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const FoodSchema = new Schema({
    name: { type: String, required: true },
    day: { type: String, required: true },
    type: { type: String, enum: ['breakfast', 'lunch/dinner'], required: true },
    calories: { type: Number, required: true },
});

FoodSchema.virtual('url').get(function () {
    return `/food/${this._id}`;
});

module.exports = mongoose.model('Food', FoodSchema);
