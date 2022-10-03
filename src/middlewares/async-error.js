const asyncErrorHandler = (handler) =>
  (req, res, next) =>
    handler(req, res).catch(next)

module.exports = asyncErrorHandler
