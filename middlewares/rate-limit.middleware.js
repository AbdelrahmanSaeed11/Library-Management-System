const rateLimit = require('express-rate-limit')

// Apply rate limiting to login route
const loginLimiter = rateLimit({
    windowMs: 10 * 60 * 1000,
    max: 10,
    message: 'Too many login attempts, please try again after 10 minutes',
})

const updateBorrowerLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 10,
    message: 'Too many requests to update borrower data, please try again after 15 minutes',
})

module.exports = { loginLimiter, updateBorrowerLimiter }