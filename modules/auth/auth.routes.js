const express = require('express')
const router = express.Router()
const { loginLimiter } = require('../../middlewares/rate-limit.middleware')
const authController = require('./auth.controller')
const authMiddlewares = require('./auth.middleware')

router.post('/login', loginLimiter, authMiddlewares.loginValidation, authController.login) // Log admins in

module.exports = router