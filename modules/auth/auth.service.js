require('dotenv').config()
const adminRepository = require('../admin/admin.repository')
const { generateAccessToken } = require('../../utils/token')
const bcrypt = require('bcryptjs')
const { createError } = require('../../utils/errorHandler')

// Login admin
const login = async (email, password) => {
    // Find admin details
    const admin = await adminRepository.getAdminByEmail(email)
    if (!admin) {
        throw createError(401, 'Invalid username or password')
    }

    // Check if the password is valid
    const isPasswordMatch = await bcrypt.compare(password, admin.password)
    if (!isPasswordMatch) {
        throw createError(401, 'Invalid username or password')
    }

    // Create a JWT token
    const token = generateAccessToken(admin.id, process.env.JWT_SECRET_KEY)

    return token
}

module.exports = { login }