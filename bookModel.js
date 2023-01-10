const mongoose = require('mongoose');

// Setup schema
const bookSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
});

// Export Book model
module.exports = mongoose.model('books', bookSchema);