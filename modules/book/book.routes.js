const express = require('express')
const router = express.Router()
const auth = require('../../middlewares/auth.middleware')
const bookController = require('./book.controller')
const bookMiddlewares = require('./book.middleware')

router.get('/', bookController.getBooks) // List all books
router.get('/search', bookMiddlewares.searchBooksValidation, bookController.searchBooks) // Search books
router.post('/', auth, bookMiddlewares.addBookValidation, bookController.addBook) // Add a new book
router.put('/:id', auth, bookMiddlewares.updateBookValidation, bookController.updateBook) // Update a book by ID
router.delete('/:id', auth, bookMiddlewares.deleteBookValidation, bookController.deleteBook) // Delete a book by ID

module.exports = router