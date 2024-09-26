const borrowerService = require('./borrower.service')

// Get all borrowers
const getBorrowers = async (req, res, next) => {
    try {
        const borrowers = await borrowerService.getAllBorrowers()
        res.status(200).json(borrowers)
    } catch (error) {
        next(error)
    }
}

// Register a new borrower
const registerBorrower = async (req, res, next) => {
    try {
        const borrowerData = req.body
        const newBorrowerId = await borrowerService.registerBorrower(borrowerData)
        res.status(201).json({ id: newBorrowerId, message: 'Borrower added successfully' })
    } catch (error) {
        next(error)
    }
}

// Update a borrower by ID
const updateBorrower = async (req, res, next) => {
    try {
        const borrowerId = req.params.id
        const borrowerData = req.body
        await borrowerService.updateBorrower(borrowerId, borrowerData)
        res.status(200).json({ message: 'Borrower updated successfully' })
    } catch (error) {
        next(error)
    }
}

// Delete a borrower by ID
const deleteBorrower = async (req, res, next) => {
    try {
        const borrowerId = req.params.id
        await borrowerService.deleteBorrower(borrowerId)
        res.status(204).send()
    } catch (error) {
        next(error)
    }
}

// Borrow a book
const borrowBook = async (req, res, next) => {
    try {
        const borrowerId = req.params.id
        const { bookId, dueDate } = req.body
        await borrowerService.borrowBook(borrowerId, bookId, dueDate)
        res.status(201).json({ message: 'Book borrowed successfully' })
    } catch (error) {
        next(error)
    }
}

// Return a book
const returnBook = async (req, res, next) => {
    try {
        const borrowerId = req.params.id
        const { bookId } = req.body
        await borrowerService.returnBook(borrowerId, bookId)
        res.status(200).json({ message: 'Book returned successfully' })
    } catch (error) {
        next(error)
    }
}

// List books borrowed by the current borrower
const listBorrowedBooks = async (req, res, next) => {
    try {
        const borrowerId = req.params.id
        const borrowedBooks = await borrowerService.listBorrowedBooks(borrowerId)
        res.status(200).json(borrowedBooks)
    } catch (error) {
        next(error)
    }
}

module.exports = {
    getBorrowers,
    registerBorrower,
    updateBorrower,
    deleteBorrower,
    borrowBook,
    returnBook,
    listBorrowedBooks
}