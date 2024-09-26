const db = require('../../config/db')
const borrowerRepository = require('./borrower.repository')
const bookRepository = require('../book/book.repository')
const { createError } = require('../../utils/errorHandler')

// Get all borrowers
const getAllBorrowers = async () => {
    return await borrowerRepository.getAllBorrowers()
}

// Register a new borrower
const registerBorrower = async (borrowerData) => {
    try {
        return await borrowerRepository.registerBorrower(borrowerData)
    } catch (error) {
        if (error && error.errno === 1062) {
            throw createError(409, 'Duplicate entry: a borrower with this Email already exists.')
        }

        throw error
    }
}

// Update a borrower
const updateBorrower = async (id, borrowerData) => {
    try {
        const borrowerUpdateStatus = await borrowerRepository.updateBorrower(id, borrowerData)

        if (!borrowerUpdateStatus) {
            throw createError(404, 'Borrower not found')
        }
    } catch (error) {
        if (error && error.errno === 1062) {
            throw createError(409, 'Duplicate entry: a borrower with this Email already exists.')
        }

        throw error
    }
}

// Delete a borrower
const deleteBorrower = async (id) => {
    const hasActiveBorrowing = await borrowerRepository.hasActiveBorrowing(id)

    if (hasActiveBorrowing) {
        throw createError(409, 'Cannot delete a borrower who has books checked out')
    }

    const borrowerDeleteStatus = await borrowerRepository.deleteBorrower(id)

    if (!borrowerDeleteStatus) {
        throw createError(404, 'Borrower not found')
    }
}

// Borrow a book
const borrowBook = async (borrowerId, bookId, dueDate) => {
    const connection = await db.getConnection()
    await connection.beginTransaction()

    try {
        // Fetch the book details
        const borrower = await borrowerRepository.getBorrowerById(borrowerId)

        if (!borrower) {
            throw createError(404, 'Borrower not found')
        }

        // Check if the borrower already has an active borrowing for the same book
        const hasActiveBorrowing = await borrowerRepository.hasActiveBorrowing(borrowerId, bookId)

        if (hasActiveBorrowing) {
            throw createError(409, 'You have already borrowed this book')
        }

        // Fetch the book details
        const [[book]] = await connection.query('SELECT available_quantity FROM books WHERE id = ?', [bookId])

        if (!book) {
            throw createError(404, 'Book not found')
        }

        if (book.available_quantity == 0) {
            throw createError(409, 'Book not available')
        }

        // Insert borrowing record
        await connection.query(
            'INSERT INTO borrowings (user_id, book_id, due_date) VALUES (?, ?, ?)',
            [borrowerId, bookId, dueDate]
        )

        // Update the available quantity of the book
        await connection.execute(
            'UPDATE books SET available_quantity = available_quantity - 1 WHERE id = ?',
            [bookId]
        )

        await connection.commit()
    } catch (error) {
        await connection.rollback()
        throw error
    } finally {
        connection.release()
    }
}

// Return a borrowed book
const returnBook = async (borrowerId, bookId) => {
    const returnBookStatus = await borrowerRepository.returnBook(borrowerId, bookId)

    if (!returnBookStatus) {
        throw createError(404, 'No active borrowing found for this book and borrower')
    }

    await bookRepository.updateBookAvailableQuantity(bookId, 1)
}

// List all books borrowed by a specific borrower
const listBorrowedBooks = async (borrowerId) => {
    return await borrowerRepository.getBorrowedBooksByBorrower(borrowerId)
}

module.exports = {
    getAllBorrowers,
    registerBorrower,
    updateBorrower,
    deleteBorrower,
    borrowBook,
    returnBook,
    listBorrowedBooks
}