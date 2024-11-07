import mongoose from 'mongoose';

const booksSchema = new mongoose.Schema({
    bookId: {
        type: String,
        unique: true,
        required: true,
    },
    bookName: {
        type: String,
        required: true,
    },
    autherName: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true, // Path to the uploaded image
    },
}, {
    timestamps: true, // Adds createdAt and updatedAt fields
});

const Books = mongoose.model('BooksDetails', booksSchema);
export default Books;
