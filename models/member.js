var mongoose = require('mongoose');

let memberSchema = new mongoose.Schema({
    name: String,
    email: String, 
    phone: Number,
    googleId: String,
}, {
    timestamps: true,
})

module.exports = mongoose.model('Member', memberSchema);