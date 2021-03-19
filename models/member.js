var mongoose = require('mongoose');
const Schema = mongoose.Schema;

const memberSchema = new Schema({
    name: String,
    email: String, 
    phone: Number,
    googleId: String,
}, {
    timestamps: true,
})

module.exports = mongoose.model('Member', memberSchema);