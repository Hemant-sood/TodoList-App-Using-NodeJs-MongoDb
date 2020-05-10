const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TaskSchema = new Schema({
    Task: {
        type: String,
        required: true,
    }
});
var task = mongoose.model('TodoTaskList', TaskSchema);
module.exports = task;