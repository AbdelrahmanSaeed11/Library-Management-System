const db = require('../../config/db')

// Get all books
const getAllBooks = async () => {
    const [rows] = await db.query('SELECT id, title, author, isbn, available_quantity, shelf_location, created_at, updated_at FROM books')

    return rows
}

// Add a new book
const addBook = async (bookData) => {
    const { title, author, isbn, availableQuantity, shelfLocation } = bookData
    const [result] = await db.query(
        'INSERT INTO books (title, author, isbn, available_quantity, shelf_location) VALUES (?, ?, ?, ?, ?)',
        [title, author, isbn, availableQuantity, shelfLocation]
    )

    return result.insertId
}

// Update a book
const updateBook = async (id, bookData) => {
    const { title, author, isbn, availableQuantity, shelfLocation } = bookData
    const [result] = await db.query(
        'UPDATE books SET title = ?, author = ?, isbn = ?, available_quantity = ?, shelf_location = ? WHERE id = ?',
        [title, author, isbn, availableQuantity, shelfLocation, id]
    )

    return result.affectedRows
}

// Delete a book
const deleteBook = async (id) => {
    const [result] = await db.query('DELETE FROM books WHERE id = ?', [id])

    return result.affectedRows
}

// Search books
const searchBooks = async (searchCriteria) => {
    let query = 'SELECT id, title, author, isbn, available_quantity, shelf_location, created_at, updated_at FROM books WHERE TRUE'
    const searchParameters = []

    if (searchCriteria.title) {
        query += ' AND title LIKE ? '
        searchParameters.push(`%${searchCriteria.title}%`)
    }

    if (searchCriteria.author) {
        query += ' AND author LIKE ? '
        searchParameters.push(`%${searchCriteria.author}%`)
    }

    if (searchCriteria.isbn) {
        query += ' AND isbn = ? '
        searchParameters.push(searchCriteria.isbn)
    }

    const [rows] = await db.query(query, searchParameters)

    return rows
}

// Get book by ID
const hasActiveBorrowing = async (id) => {
    const [rows] = await db.query(
        'SELECT 1 FROM borrowings WHERE book_id = ? AND returned_at IS NULL LIMIT 1',
        [id]
    )

    return rows.length > 0 // Returns true if there is an active borrowing
}

// Update the available quantity of a book
const updateBookAvailableQuantity = async (id, quantity) => {
    const [rows] = await db.query(
        'UPDATE books SET available_quantity = available_quantity + ? WHERE id = ? AND (available_quantity + ?) >= 0',
        [quantity, id, quantity])

    return rows.affectedRows
}

module.exports = {
    getAllBooks,
    addBook,
    updateBook,
    deleteBook,
    searchBooks,
    hasActiveBorrowing,
    updateBookAvailableQuantity
}