require('dotenv').config()
const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1]; // Remove the 'Bearer' part of the header
    if (!token) return res.status(401).json({ message: 'Access denied' });

    try {
        const tokenPayload = jwt.verify(token, process.env.JWT_SECRET_KEY);
        req.admin = tokenPayload;
        next();
    } catch (e) {
        res.status(401).json({ message: 'Access denied' });
    }
};

module.exports = auth;