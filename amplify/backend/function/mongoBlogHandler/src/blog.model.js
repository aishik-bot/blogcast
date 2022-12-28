const mongoose = require('mongoose')
mongoose.set('strictQuery', false);

const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    content: {
        type: String, 
        required: true
    },
    user: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Blog', blogSchema)