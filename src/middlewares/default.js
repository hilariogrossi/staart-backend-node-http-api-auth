const defaultHandler = (_req, res) =>
  res.status(404).send('Not found')

module.exports = defaultHandler
