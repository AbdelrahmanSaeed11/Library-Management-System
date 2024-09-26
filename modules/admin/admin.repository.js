const db = require('../../config/db')

// Get admin by email
const getAdminByEmail = async (email) => {
    const [rows] = await db.query('SELECT id, email, password, created_at, updated_at FROM admins WHERE email = ?', [email])

    return rows[0]
}

module.exports = {
    getAdminByEmail
}