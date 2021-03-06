const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
        required: true
    },
    categories: {
        type: [String],
        required: true
    },
    description: {
        type: String,
        required: true
    },
    createdDate: {
        type: Date,
        default: Date.now
    },
    likes: {
        type: Number,
        default: 0
    },
    // for populate() => path === type & model === ref 
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    messages: [{
        messageBody: {
            type: String,
            required: true
        },
        messageDate: {
            type: Date,
            default: Date.now

        },
        messageUser: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User'
        }
    }]
});

// Create index to perform text search on fields of post
PostSchema.index({
    '$**': 'text'
});

module.exports = mongoose.model('Post', PostSchema);