module.exports = (err, req, res, next) => {
    if (!err.status || err.status == 500) {
        console.error(err)
    }

    // Set default error message and status code
    const statusCode = err.status || 500;
    const message = err.status ? err.message : 'Internal Server Error';

    // Return JSON error response
    res.status(statusCode).json({ error: message });
};