// console.log('Connection to server-side topic model successful');

const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const TopicSchema = new mongoose.Schema({
    username: { type: String },
    category: {
        type: String,
        required: [true, 'Please select a category'],
    },
    topic: {
        type: String,
        maxlength: 150,
        required: [true, 'Please enter a topic'],
    },
    description: {
        type: String,
        maxlength: 250,
        required: [true, 'Please enter a description'],
    },
    created_at: {
        type: Date,
        default: Date.now,
    },
    _user: { type: Schema.Types.ObjectId, ref: 'Users'},
    _messages: [{ type: Schema.Types.ObjectId, ref: 'Messages'}],

}); // close TopicSchema

module.exports = mongoose.model('Topics', TopicSchema);
