const jwt = require('jsonwebtoken')

const generateAccessToken = (id, secretKey) => {
    const token = jwt.sign({ id: id }, secretKey, { expiresIn: '1h' })

    return token
}

module.exports = { generateAccessToken }