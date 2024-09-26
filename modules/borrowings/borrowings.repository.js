const db = require('../../config/db')

// Get all overdue borrowings
const getAllOverdueBorrowings = async () => {
    const [rows] = await db.query(
        `
            SELECT b.id AS book_id, b.title, b.author, b.isbn, b.shelf_location, u.id AS borrower_id, u.name, u.email, br.borrowed_at, br.due_date
            FROM borrowings br
            JOIN books b ON b.id = br.book_id
            JOIN users u ON u.id = br.user_id
            WHERE br.due_date < CURDATE() AND br.returned_at IS NULL
        `
    )

    return rows
}

/**
 * Get borrowings report in a specified period and status(either overdue, returned or both)
 * @param {Date} startDate 
 * @param {Date} endDate 
 * @param {'all' | 'overdue' | 'returned'} borrowingType 
 * @returns {Promise<>}
 */
const getBorrowingsReport = async (startDate, endDate, borrowingType = 'all') => {
    let query = `
        SELECT b.id AS book_id, b.title, b.author, b.isbn, b.shelf_location,
        u.id AS borrower_id, u.name AS borrower_name, u.email AS borrower_email,
        br.id AS borrowing_id, br.borrowed_at, br.due_date, br.returned_at
        FROM borrowings br
        JOIN books b ON b.id = br.book_id
        JOIN users u ON u.id = br.user_id
        WHERE br.borrowed_at BETWEEN ? AND ?
    `

    if (borrowingType == 'overdue') {
        query += ' AND br.due_date < CURDATE() AND br.returned_at IS NULL '
    } else if (borrowingType == 'returned') {
        query += ' AND br.returned_at IS NOT NULL '
    }

    const [rows] = await db.query(query, [startDate, endDate])

    return rows
}

module.exports = {
    getAllOverdueBorrowings,
    getBorrowingsReport
}