const bookService = require('./book.service')
require('dotenv').config()

// Get all books
const getBooks = async (req, res, next) => {
    try {
        const books = await bookService.getAllBooks()
        res.status(200).json(books)
    } catch (error) {
        next(error)
    }
}

// Add a new book
const addBook = async (req, res, next) => {
    try {
        const bookData = req.body
        const newBookId = await bookService.addBook(bookData)
        res.status(201).json({ id: newBookId, message: 'Book added successfully' })
    } catch (error) {
        next(error)
    }
}

// Update a book by ID
const updateBook = async (req, res, next) => {
    try {
        const bookId = req.params.id
        const bookData = req.body
        await bookService.updateBook(bookId, bookData)
        res.status(200).json({ message: 'Book updated successfully' })
    } catch (error) {
        next(error)
    }
}

// Delete a book by ID
const deleteBook = async (req, res, next) => {
    try {
        const bookId = req.params.id
        await bookService.deleteBook(bookId)
        res.status(204).json()
    } catch (error) {
        next(error)
    }
}

// Search for books
const searchBooks = async (req, res, next) => {
    try {
        const booksSearchCriteria = req.query
        const books = await bookService.searchBooks(booksSearchCriteria)
        res.status(200).json(books)
    } catch (error) {
        next(error)
    }
}

module.exports = { getBooks, searchBooks, addBook, updateBook, deleteBook }