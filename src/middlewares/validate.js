const Joi = require('joi')
const { ValidationError } = require('../errors')

const validate = ({
  body: bodySchema = Joi.any(),
  query: querySchema = Joi.any(),
  params: paramsSchema = Joi.any(),
 }) =>
  (req, _res, next) => {
    const schema = Joi.object({
      body: bodySchema,
      query: querySchema,
      params: paramsSchema,
    })
    const { body, query, params } = req
    const { error } = schema.validate({ body, query, params }, { abortEarly: false })
    if (!error) {
      return next()
    }
    next(new ValidationError({ validations: error.details }))
  }


module.exports = validate
