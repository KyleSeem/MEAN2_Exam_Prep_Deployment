// console.log('Connection to server-side comment model successful');

const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const CommentSchema = new mongoose.Schema({
    username: { type: String },
    comment: {
        type: String,
        required: [true, 'Comment cannot be blank'],
        maxlength: 500,
    },
    created_at: {
        type: Date,
        default: Date.now,
    },
    _user: { type: Schema.Types.ObjectId, ref: 'Users' },
    _message: { type: Schema.Types.ObjectId, ref: 'Messages' },

}); // close CommentSchema

module.exports = mongoose.model('Comments', CommentSchema);
