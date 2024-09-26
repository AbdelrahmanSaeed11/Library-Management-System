const Joi = require('joi');

const exportBorrowingsReportValidation = async (req, res, next) => {
    try {
        const schema = Joi.object({
            startDate: Joi.date().iso().less('now').required().messages({
                'date.less': 'startDate must be a date in the past',
            }),
            endDate: Joi.date().iso().less('now').greater(Joi.ref('startDate')).required()
                .messages({
                    'date.less': 'endDate must be a date in the past',
                    'date.greater': 'endDate must be after startDate'
                }),
            format: Joi.string().valid('csv', 'xlsx').default('csv').messages({ 'any.only': 'Format must be either csv or xlsx' }),
        });

        req.query = await schema.validateAsync(req.query)
        next()
    } catch (error) {
        return res.status(400).json({ message: error.details[0].message })
    }
}

const exportLastMonthBorrowingsReportValidation = async (req, res, next) => {
    try {
        const schema = Joi.object({
            format: Joi.string().valid('csv', 'xlsx').default('csv').messages({ 'any.only': 'Format must be either csv or xlsx' }),
        });

        req.query = await schema.validateAsync(req.query)
        next()
    } catch (error) {
        return res.status(400).json({ message: error.details[0].message })
    }
}

module.exports = { exportBorrowingsReportValidation, exportLastMonthBorrowingsReportValidation }