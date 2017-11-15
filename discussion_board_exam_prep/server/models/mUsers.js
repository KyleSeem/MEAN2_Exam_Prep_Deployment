// console.log('Connection to server-side user model successful');

const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Please enter a username'],
        trim: true,
    },
    email: {
        type: String,
        required: [true, 'Please enter your email address'],
        unique: [true, 'This email address has already been registered'],
    },
    password: {
        type: String,
        required: [true, 'Please enter a password'],
        minlength: [8, 'Password must contain at least 8 characters'],
    },
    created_at: {
        type: Date,
        default: Date.now,
    },
    _topics: [{ type: Schema.Types.ObjectId, ref: 'Topics'}],
    _messages: [{ type: Schema.Types.ObjectId, ref: 'Messages'}],
    _comments: [{ type: Schema.Types.ObjectId, ref: 'Comments'}],

}); // close UserSchema

module.exports = mongoose.model('Users', UserSchema);
