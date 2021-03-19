var mongoose = require('mongoose');
const Schema = mongoose.Schema;


const workoutSchema = new Schema({
    planName: String,
    member: [{type: Schema.Types.ObjectId, ref: 'Member'}],
    exercises: [{type: Schema.Types.ObjectId, ref: 'Exercise'}],
}, {
    timestamps: true,
})

module.exports = mongoose.model('Workout', workoutSchema);