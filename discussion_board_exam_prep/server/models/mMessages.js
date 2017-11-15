// console.log('Connection to server-side message model successful');

const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const MessageSchema = new mongoose.Schema({
    username: { type: String },
    message: {
        type: String,
        required: [true, 'Response cannot be blank'],
        maxlength: 1000,
    },
    up_votes: {
        type: Number,
        default: 0,
    },
    down_votes: {
        type: Number,
        default: 0,
    },
    comments:[{ type: Schema.Types.Object, ref: 'Comments'}],
    created_at: {
        type: Date,
        default: Date.now,
    },
    _user: { type: Schema.Types.ObjectId, ref: 'Users'},
    _topic: { type: Schema.Types.ObjectId, ref: 'Topics'},
    _comments: [{ type: Schema.Types.ObjectId, ref: 'Comments'}],

}); // close MessageSchema

module.exports = mongoose.model('Messages', MessageSchema);
