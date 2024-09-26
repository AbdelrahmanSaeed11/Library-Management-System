const db = require('../../config/db')

// Get all borrowers
const getAllBorrowers = async () => {
    const [rows] = await db.query('SELECT id, name, email, created_at AS registered_date FROM users')

    return rows
}

// Get borrower by ID
const getBorrowerById = async (id) => {
    const [rows] = await db.query('SELECT id, name, email, created_at AS registered_date FROM users WHERE id = ?', [id])

    return rows[0]
}

// Register a new borrower
const registerBorrower = async (borrowerData) => {
    const { name, email } = borrowerData
    const [result] = await db.query(
        'INSERT INTO users (name, email) VALUES (?, ?)',
        [name, email]
    )
    return result.insertId
}

// Update a borrower
const updateBorrower = async (id, borrowerData) => {
    const { name, email } = borrowerData
    const [result] = await db.query(
        'UPDATE users SET name = ?, email = ? WHERE id = ?',
        [name, email, id]
    )

    return result.affectedRows
}

// Delete a borrower
const deleteBorrower = async (id) => {
    const [result] = await db.query('DELETE FROM users WHERE id = ?', [id])

    return result.affectedRows
}

// Check if a borrower has any active borrowings for a specified book or any book
const hasActiveBorrowing = async (borrowerId, bookId = null) => {
    // Base query to find active borrowings for the specified borrower
    let query = 'SELECT 1 FROM borrowings WHERE user_id = ? AND returned_at IS NULL'
    const queryParameters = [borrowerId]

    // If a specific book ID is provided, add it to the query
    if (bookId) {
        query += ' AND book_id = ? '
        queryParameters.push(bookId)
    }

    // Limit the results to 1 to improve performance
    query += ' LIMIT 1 '

    const [rows] = await db.query(query, queryParameters)
    return rows.length > 0 // Returns true if there is an active borrowing
}

// Return a book
const returnBook = async (borrowerId, bookId) => {
    const [rows] = await db.query(
        'UPDATE borrowings SET returned_at = CURRENT_TIMESTAMP WHERE user_id = ? AND book_id = ? AND returned_at IS NULL',
        [borrowerId, bookId])

    return rows.affectedRows
}

// Get all books currently borrowed by a specific borrower
const getBorrowedBooksByBorrower = async (borrowerId) => {
    const [rows] = await db.query(
        `
            SELECT b.id AS book_id, b.title, b.author, b.isbn, b.shelf_location, br.borrowed_at, br.due_date
            FROM borrowings br
            JOIN books b ON br.book_id = b.id
            WHERE br.user_id = ? AND br.returned_at IS NULL
         `,
        [borrowerId]
    );
    return rows;
}

module.exports = {
    getAllBorrowers,
    getBorrowerById,
    registerBorrower,
    updateBorrower,
    deleteBorrower,
    hasActiveBorrowing,
    returnBook,
    getBorrowedBooksByBorrower
}