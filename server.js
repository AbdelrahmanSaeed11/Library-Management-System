require('dotenv').config()
const express = require('express')
const rateLimit = require('express-rate-limit')
const authRoutes = require('./modules/auth/auth.routes')
const bookRoutes = require('./modules/book/book.routes')
const borrowerRoutes = require('./modules/borrower/borrower.routes')
const borrowingsReportsRoutes = require('./modules/borrowings/borrowings.routes')
const errorHandler = require('./middlewares/errorHandler.middleware');

// Initialize app
const app = express()
const PORT = process.env.PORT || 3000;

// Global middlewares
app.use(express.json())

// Routes
app.use('/auth', authRoutes);
app.use('/book', bookRoutes);
app.use('/borrower', borrowerRoutes);
app.use('/borrowing', borrowingsReportsRoutes);

// Global error handler
app.use(errorHandler);

// Running the app
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))