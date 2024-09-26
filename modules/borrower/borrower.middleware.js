const Joi = require('joi');

const addBorrowerValidation = async (req, res, next) => {
    try {
        const schema = Joi.object({
            name: Joi.string().trim().min(3).max(100).required(),
            email: Joi.string().trim().email().max(255).required(),
        });

        req.body = await schema.validateAsync(req.body)
        next()
    } catch (error) {
        return res.status(400).json({ message: error.details[0].message })
    }
}

const updateBorrowerValidation = async (req, res, next) => {
    try {
        const bodySchema = Joi.object({
            name: Joi.string().trim().min(3).max(100).required(),
            email: Joi.string().trim().email().max(255).required(),
        });

        const paramsSchema = Joi.object({
            id: Joi.number().integer().positive().required(),
        });

        [req.body, req.params] = await Promise.all([
            bodySchema.validateAsync(req.body),
            paramsSchema.validateAsync(req.params)
        ])
        next()
    } catch (error) {
        return res.status(400).json({ message: error.details[0].message })
    }
}

const deleteBorrowerValidation = async (req, res, next) => {
    try {
        const schema = Joi.object({
            id: Joi.number().integer().positive().required(),
        });

        req.params = await schema.validateAsync(req.params)
        next()
    } catch (error) {
        return res.status(400).json({ message: error.details[0].message })
    }
}

const listBorrowedBooksValidation = async (req, res, next) => {
    try {
        const schema = Joi.object({
            id: Joi.number().integer().positive().required(),
        });

        req.params = await schema.validateAsync(req.params)
        next()
    } catch (error) {
        return res.status(400).json({ message: error.details[0].message })
    }
}

const borrowBookValidation = async (req, res, next) => {
    try {
        const bodySchema = Joi.object({
            bookId: Joi.number().integer().positive().required(),
            dueDate: Joi.date().iso().greater('now').required(),
        });

        const paramsSchema = Joi.object({
            id: Joi.number().integer().positive().required(),
        });

        [req.body, req.params] = await Promise.all([
            bodySchema.validateAsync(req.body),
            paramsSchema.validateAsync(req.params)
        ])
        next()
    } catch (error) {
        return res.status(400).json({ message: error.details[0].message })
    }
}

const returnBookValidation = async (req, res, next) => {
    try {
        const bodySchema = Joi.object({
            bookId: Joi.number().integer().positive().required(),
        });

        const paramsSchema = Joi.object({
            id: Joi.number().integer().positive().required(),
        });

        [req.body, req.params] = await Promise.all([
            bodySchema.validateAsync(req.body),
            paramsSchema.validateAsync(req.params)
        ])
        next()
    } catch (error) {
        return res.status(400).json({ message: error.details[0].message })
    }
}

module.exports = {
    addBorrowerValidation,
    updateBorrowerValidation,
    deleteBorrowerValidation,
    listBorrowedBooksValidation,
    borrowBookValidation,
    returnBookValidation
}