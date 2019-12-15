const mongoose = require('mongoose');

const PostSchema = mongoose.Schema({
    expense: {
        type:String,
        required:true
    },
    title: {
        type:String,
        required:true
    },
    date: {
        type:Date,
        default:Date.now
    }
})

module.exports = mongoose.model('Posts', PostSchema);