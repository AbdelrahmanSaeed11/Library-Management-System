const borrowingsService = require('./borrowings.service')
const moment = require('moment')

// List all overdue borrowings
const listOverdueBorrowings = async (req, res, next) => {
    try {
        const overdueBorrowings = await borrowingsService.listOverdueBorrowings()
        res.status(200).json(overdueBorrowings)
    } catch (error) {
        next(error)
    }
}

// Export all borrowings report for a specific period
const exportBorrowingsReport = async (req, res, next) => {
    try {
        const { startDate, endDate, format } = req.query
        const borrowingData = await borrowingsService.getBorrowingsReport(startDate, endDate)

        const fileName = `borrowings_report_${moment(startDate).format('YYYY-MM-DD_HH-mm-ss')}_to_${moment(endDate).format('YYYY-MM-DD_HH-mm-ss')}`
        if (format === 'xlsx') {
            const xlsxFile = borrowingsService.exportBorrowingToXlsx(borrowingData)

            // Set headers to prompt the download in the browser
            res.header('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
            res.header('Content-Disposition', `attachment; filename="${fileName}.xlsx"`);

            // Send the buffer as a response
            res.status(200).send(xlsxFile);
        } else { // Export report in CSV format by default
            const csvFile = borrowingsService.exportBorrowingToCSV(borrowingData)

            // Set headers to prompt the download in the browser
            res.header('Content-Type', 'text/csv')
            res.header('Content-Disposition', `attachment; filename="${fileName}.csv"`)

            res.status(200).send(csvFile)
        }
    } catch (error) {
        next(error)
    }
}

// Export all borrowings report for the last month
const exportLastMonthBorrowingsReport = async (req, res, next) => {
    try {
        const { format } = req.query
        const startDate = moment().subtract(1, 'month').startOf('month').format('YYYY-MM-DD');
        const endDate = moment().subtract(1, 'month').endOf('month').format('YYYY-MM-DD')
        const borrowingData = await borrowingsService.getBorrowingsReport(startDate, endDate)

        const fileName = `last__month_borrowings_report_${moment(startDate).format('YYYY-MM-DD_HH-mm-ss')}_to_${moment(endDate).format('YYYY-MM-DD_HH-mm-ss')}`
        if (format === 'xlsx') {
            const xlsxFile = borrowingsService.exportBorrowingToXlsx(borrowingData)

            // Set headers to prompt the download in the browser
            res.header('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
            res.header('Content-Disposition', `attachment; filename="${fileName}.xlsx"`);

            // Send the buffer as a response
            res.status(200).send(xlsxFile);
        } else { // Export report in CSV format by default
            const csvFile = borrowingsService.exportBorrowingToCSV(borrowingData)

            // Set headers to prompt the download in the browser
            res.header('Content-Type', 'text/csv')
            res.header('Content-Disposition', `attachment; filename="${fileName}.csv"`)

            res.status(200).send(csvFile)
        }
    } catch (error) {
        next(error)
    }
}

// Export all overdue borrowings report for the last month
const exportLastMonthOverdueBorrowingsReport = async (req, res, next) => {
    try {
        const { format } = req.query
        const startDate = moment().subtract(1, 'month').startOf('month').format('YYYY-MM-DD');
        const endDate = moment().subtract(1, 'month').endOf('month').format('YYYY-MM-DD')
        const borrowingData = await borrowingsService.getBorrowingsReport(startDate, endDate, 'overdue')

        const fileName = `last__month_borrowings_report_${moment(startDate).format('YYYY-MM-DD_HH-mm-ss')}_to_${moment(endDate).format('YYYY-MM-DD_HH-mm-ss')}`
        if (format === 'xlsx') {
            const xlsxFile = borrowingsService.exportBorrowingToXlsx(borrowingData)

            // Set headers to prompt the download in the browser
            res.header('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
            res.header('Content-Disposition', `attachment; filename="${fileName}.xlsx"`);

            // Send the buffer as a response
            res.status(200).send(xlsxFile);
        } else { // Export report in CSV format by default
            const csvFile = borrowingsService.exportBorrowingToCSV(borrowingData)

            // Set headers to prompt the download in the browser
            res.header('Content-Type', 'text/csv')
            res.header('Content-Disposition', `attachment; filename="${fileName}.csv"`)

            res.status(200).send(csvFile)
        }
    } catch (error) {
        next(error)
    }
}

// Export all returned borrowings report for the last month
const exportLastMonthReturnedBorrowingsReport = async (req, res, next) => {
    try {
        const { format } = req.query
        const startDate = moment().subtract(1, 'month').startOf('month').format('YYYY-MM-DD');
        const endDate = moment().subtract(1, 'month').endOf('month').format('YYYY-MM-DD')
        const borrowingData = await borrowingsService.getBorrowingsReport(startDate, endDate, 'returned')

        const fileName = `last__month_borrowings_report_${moment(startDate).format('YYYY-MM-DD_HH-mm-ss')}_to_${moment(endDate).format('YYYY-MM-DD_HH-mm-ss')}`
        if (format === 'xlsx') {
            const xlsxFile = borrowingsService.exportBorrowingToXlsx(borrowingData)

            // Set headers to prompt the download in the browser
            res.header('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
            res.header('Content-Disposition', `attachment; filename="${fileName}.xlsx"`);

            // Send the buffer as a response
            res.status(200).send(xlsxFile);
        } else { // Export report in CSV format by default
            const csvFile = borrowingsService.exportBorrowingToCSV(borrowingData)

            // Set headers to prompt the download in the browser
            res.header('Content-Type', 'text/csv')
            res.header('Content-Disposition', `attachment; filename="${fileName}.csv"`)

            res.status(200).send(csvFile)
        }
    } catch (error) {
        next(error)
    }
}

module.exports = {
    listOverdueBorrowings,
    exportBorrowingsReport,
    exportLastMonthBorrowingsReport,
    exportLastMonthOverdueBorrowingsReport,
    exportLastMonthReturnedBorrowingsReport
}