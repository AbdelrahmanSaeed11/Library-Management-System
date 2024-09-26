const Joi = require('joi');

const loginValidation = async (req, res, next) => {
    try {
        const schema = Joi.object({
            email: Joi.string().trim().email().max(255).required(),
            password: Joi.string().trim().max(255).required(),
        });

        req.body = await schema.validateAsync(req.body)
        next()
    } catch (error) {
        return res.status(400).json({ message: error.details[0].message })
    }
}

module.exports = { loginValidation }