const { Router } = require('express')
const swaggerUI = require('swagger-ui-express')

const { swagger: config } = require('../config')

const router = Router()
  .use('/', swaggerUI.serve)
  .get('/', swaggerUI.setup(config.document, config.options))

module.exports = router
