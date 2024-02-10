const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const FoodSchema = new Schema({
    name: { type: String, required: true },
    date: { type: Date, required: true },
    type: { type: String, enum: ['breakfast', 'lunch', 'dinner'], required: true },
    carbs: { type: Number, required: true },
    protein: { type: Number, required: true },
    fat: { type: Number, required: true },
    calories: { type: Number, required: true },
    vegetarian: { type: Boolean, required: true }
});

FoodSchema.virtual('url').get(function () {
    return `/food/${this._id}`;
});

module.exports = mongoose.model('Food', FoodSchema);
