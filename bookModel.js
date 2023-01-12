const mongoose = require('mongoose');

// Setup schema
const bookSchema = mongoose.Schema({
     bookId: {
        type: String,
        required: true
    },
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
