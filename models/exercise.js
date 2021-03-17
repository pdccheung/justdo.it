var mongoose = require('mongoose');
const Schema = mongoose.Schema



let exerciseSchema = new Schema({
    refId: Number,
    description: String,
    muscle: [String],}
 {
    timestamps: true,
})





module.exports = mongoose.model('Exercise', exerciseSchema);