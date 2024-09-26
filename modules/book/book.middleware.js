const Joi = require('joi');

const addBookValidation = async (req, res, next) => {
    try {
        const schema = Joi.object({
            title: Joi.string().trim().min(3).max(255).required(),
            author: Joi.string().trim().min(3).max(255).required(),
            isbn: Joi.string().trim().length(13).required(),
            availableQuantity: Joi.number().integer().min(0).max(2147483647).required(),
            shelfLocation: Joi.string().trim().min(1).max(50).required(),
        });

        req.body = await schema.validateAsync(req.body)
        next()
    } catch (error) {
        return res.status(400).json({ message: error.details[0].message })
    }
}

const updateBookValidation = async (req, res, next) => {
    try {
        const bodySchema = Joi.object({
            title: Joi.string().trim().min(3).max(255).required(),
            author: Joi.string().trim().min(3).max(255).required(),
            isbn: Joi.string().trim().length(13).required(),
            availableQuantity: Joi.number().integer().min(0).max(2147483647).required(),
            shelfLocation: Joi.string().trim().min(1).max(50).required(),
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

const deleteBookValidation = async (req, res, next) => {
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

const searchBooksValidation = async (req, res, next) => {
    try {
        const schema = Joi.object({
            title: Joi.string().trim().min(1).max(255),
            author: Joi.string().trim().min(1).max(255),
            isbn: Joi.string().trim().length(13),
        });

        req.query = await schema.validateAsync(req.query)
        next()
    } catch (error) {
        return res.status(400).json({ message: error.details[0].message })
    }
}

module.exports = { addBookValidation, updateBookValidation, deleteBookValidation, searchBooksValidation }