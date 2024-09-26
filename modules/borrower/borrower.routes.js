const express = require('express')
const router = express.Router()
const auth = require('../../middlewares/auth.middleware')
const { updateBorrowerLimiter } = require('../../middlewares/rate-limit.middleware')
const borrowerController = require('./borrower.controller')
const borrowerMiddlewares = require('./borrower.middleware')

// Borrower CRUD
router.get('/', borrowerController.getBorrowers) // List all borrowers
router.post('/', auth, borrowerMiddlewares.addBorrowerValidation, borrowerController.registerBorrower) // Add a new borrower
router.put('/:id', auth, updateBorrowerLimiter, borrowerMiddlewares.updateBorrowerValidation, borrowerController.updateBorrower) // Update a borrower by ID
router.delete('/:id', auth, borrowerMiddlewares.deleteBorrowerValidation, borrowerController.deleteBorrower) // Delete a borrower by ID

// Borrower actions (Borrowing process)
router.get('/:id/borrowings', borrowerMiddlewares.listBorrowedBooksValidation, borrowerController.listBorrowedBooks) // List all borrowed books of a borrower
router.post('/:id/book/checkout', auth, borrowerMiddlewares.borrowBookValidation, borrowerController.borrowBook) // Borrow a book
router.post('/:id/book/return', auth, borrowerMiddlewares.returnBookValidation, borrowerController.returnBook) // Return a book

module.exports = router