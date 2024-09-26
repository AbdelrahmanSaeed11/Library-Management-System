const borrowingsRepository = require('./borrowings.repository')
const { createError } = require('../../utils/errorHandler')
const { Parser } = require('json2csv')
const XLSX = require('xlsx')

// List all overdue borrowings
const listOverdueBorrowings = async () => {
    return await borrowingsRepository.getAllOverdueBorrowings()
}

/**
 * Get borrowings report in a specified period and status(either overdue, returned or both)
 * @param {Date} startDate 
 * @param {Date} endDate 
 * @param {'all' | 'overdue' | 'returned'} borrowingType 
 * @returns 
 */
const getBorrowingsReport = async (startDate, endDate, borrowingType = 'all') => {
    return await borrowingsRepository.getBorrowingsReport(startDate, endDate, borrowingType)
}

// Export data to CSV
const exportBorrowingToCSV = (borrowingData) => {
    try {
        // Define the fields for the CSV
        const fields = [
            { value: 'borrowing_id', label: 'ID' },
            { value: 'borrower_id', label: 'Borrower ID' },
            { value: 'borrower_name', label: 'Borrower Name' },
            { value: 'borrower_email', label: 'Borrower Email' },
            { value: 'book_id', label: 'Book ID' },
            { value: 'title', label: 'Book' },
            { value: 'author', label: 'Book Author' },
            { value: 'isbn', label: 'ISBN' },
            { value: 'shelf_location', label: 'Shelf Location' },
            { value: 'borrowed_at', label: 'Borrowed Date' },
            { value: 'due_date', label: 'Due Date' },
            { value: 'returned_at', label: 'Returned Date' }
        ]
        const json2csvParser = new Parser({ fields })

        // Convert JSON data to CSV
        const csv = json2csvParser.parse(borrowingData)

        return csv
    } catch (err) {
        console.error('Error exporting CSV:', err)
        throw createError(500, 'An error occurred while exporting the borrowings report')
    }
}

// Export data to XLSX
const exportBorrowingToXlsx = (borrowingData) => {
    try {
        const workbook = XLSX.utils.book_new()

        // Map the original data to include custom headers
        const customHeadersBorrowings = borrowingData.map(row => ({
            'ID': row.borrowing_id,
            'Borrower ID': row.borrower_id,
            'Borrower Name': row.borrower_name,
            'Borrower Email': row.borrower_email,
            'Book ID': row.book_id,
            'Book': row.title,
            'Book Author': row.author,
            'ISBN': row.isbn,
            'Shelf Location': row.shelf_location,
            'Borrowed Date': row.borrowed_at,
            'Due Date': row.due_date,
            'Returned Date': row.returned_at,
        }));

        // Convert the mapped data to a worksheet
        const worksheet = XLSX.utils.json_to_sheet(customHeadersBorrowings)

        // Add the worksheet to the workbook
        XLSX.utils.book_append_sheet(workbook, worksheet)

        // Generate a buffer from the workbook
        const buffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'buffer' })

        return buffer
    } catch (err) {
        console.error('Error exporting XLSX:', err)
        throw createError(500, 'An error occurred while exporting the borrowings report')
    }
}

module.exports = { listOverdueBorrowings, getBorrowingsReport, exportBorrowingToCSV, exportBorrowingToXlsx }