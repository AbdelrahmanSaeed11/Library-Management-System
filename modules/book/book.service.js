const bookRepository = require('./book.repository')
const { createError } = require('../../utils/errorHandler')

// Get all books
const getAllBooks = async () => {
    return await bookRepository.getAllBooks();
}

// Add a new book
const addBook = async (bookData) => {
    try {
        return await bookRepository.addBook(bookData)
    } catch (error) {
        if (error && error.errno === 1062) {
            throw createError(409, 'Duplicate entry: a book with this ISBN already exists.')
        }

        throw error
    }
}

// Update a book
const updateBook = async (id, bookData) => {
    try {
        const bookUpdateStatus = await bookRepository.updateBook(id, bookData)

        if (!bookUpdateStatus) {
            throw createError(404, 'Book not found')
        }
    } catch (error) {
        if (error && error.errno === 1062) {
            console.error(error)
            throw createError(409, 'Duplicate entry: a book with this ISBN already exists.')
        }

        throw error
    }
}

// Delete a book
const deleteBook = async (id) => {
    const hasActiveBorrowing = await bookRepository.hasActiveBorrowing(id)

    if (hasActiveBorrowing) {
        throw createError(409, 'Cannot delete a book that is currently checked out')
    }

    const bookDeleteStatus = await bookRepository.deleteBook(id)

    if (!bookDeleteStatus) {
        throw createError(404, 'Book not found')
    }
}

// Search books
const searchBooks = async (searchCriteria) => {
    return await bookRepository.searchBooks(searchCriteria);
}

module.exports = { getAllBooks, addBook, updateBook, deleteBook, searchBooks }