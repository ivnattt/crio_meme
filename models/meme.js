const mongoose = require('mongoose')

const memeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    caption: {
        type: String,
        required: true
    },
    link: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('Meme', memeSchema)