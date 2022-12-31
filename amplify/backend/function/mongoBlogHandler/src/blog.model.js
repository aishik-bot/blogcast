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
    },
    coverImg: {
        type: String,
        required: true,
        default: "https://deerassociation.com/wp-content/uploads/2022/05/Placeholder-Landscape.jpg"
    }
})

module.exports = mongoose.model('Blog', blogSchema)