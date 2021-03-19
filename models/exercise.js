var mongoose = require('mongoose');
const Schema = mongoose.Schema

const exerciseSchema = new Schema({
    refId: Number,
    category: Number,
    name: String,
    description: String,
    muscles: [Number],
    equipment: [Number],
    image: String,
}, 
 {
    timestamps: true,
})

module.exports = mongoose.model('Exercise', exerciseSchema);