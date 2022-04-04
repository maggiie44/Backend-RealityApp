const mongoose = require('mongoose');

const recordSchema = new mongoose.Schema({
    activityName: { type: String, minlength: [3, 'Activity name should contains at least 3 char']},
    timestamp: {type : Date},
    duration: {type: Number, min: [0, 'Duration must be at least 0']},
    calories: {type: Number, min: [0, 'Duration must be at least 0']},
    description: {type: String},
});

const RecordModel = mongoose.model('record', recordSchema, 'records');

module.exports = RecordModel;