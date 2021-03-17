var mongoose = require('mongoose');
const Schema = mongoose.Schema
const member = require('./member');

let workoutSchema = new Schema({
    planName: String,
    member: [member],
    exercise: {type: Schema.Types.ObjectId, ref: 'Exercise' },
}, {
    timestamps: true,
})

module.exports = mongoose.model('Workout', workoutSchema);