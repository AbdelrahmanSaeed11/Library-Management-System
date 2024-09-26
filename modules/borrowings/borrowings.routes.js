const express = require('express')
const router = express.Router()
const auth = require('../../middlewares/auth.middleware')
const borrowingsController = require('./borrowings.controller')
const borrowingsMiddlewares = require('./borrowings.middleware')

router.get('/overdue', auth, borrowingsController.listOverdueBorrowings) // List all overdue borrowings
router.get('/reports/export', auth, borrowingsMiddlewares.exportBorrowingsReportValidation, borrowingsController.exportBorrowingsReport) // Export all borrowings report for a specific period
router.get('/reports/last-month/export', auth, borrowingsMiddlewares.exportLastMonthBorrowingsReportValidation, borrowingsController.exportLastMonthBorrowingsReport) // Export all borrowings report for the last month
router.get('/reports/overdue/last-month/export', auth, borrowingsMiddlewares.exportLastMonthBorrowingsReportValidation, borrowingsController.exportLastMonthOverdueBorrowingsReport) // Export all overdue borrowings for the last month
router.get('/reports/returned/last-month/export', auth, borrowingsMiddlewares.exportLastMonthBorrowingsReportValidation, borrowingsController.exportLastMonthReturnedBorrowingsReport) // Export all returned borrowings for the last month

module.exports = router