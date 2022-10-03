const { Router } = require('express')

const { TodosRepository } = require('./repository')

const router = Router()

const NotFound = {
  error: 'Not found',
  message: 'Resource not found',
}

const todosRepository = TodosRepository()

router.get('/', (_req, res) =>
  todosRepository
    .list()
    .then(todos =>
      res.status(200).send({ todos })
    )
)

router.get('/:id', async (req, res) => {
  const id = req.params.id
  const todo = await todosRepository.get(id)
  if (!todo) {
    res.status(404).send(NotFound)
    return
  }
  res.status(200).send(todo)
})

router.post('/', async (req, res) => {
  const todo = req.body // precisa do middleware express.json
  const inserted = await todosRepository.insert(todo)

  res.status(201)
    .header('Location', `/todos/${inserted.id}`)
    .send(inserted)
})

router.put('/:id', async (req, res) => {
  const id = req.params.id
  const todo = { ...req.body, id }
  const found = await todosRepository.get(id)
  if (!found) {
    return res.status(404).send(NotFound)
  }
  const updated = await todosRepository.update(todo)
  res.status(200).send(updated)
})

router.delete('/:id', async (req, res) => {
  const id = parseInt(req.params.id)
  const found = await todosRepository.get(id)
  if (!found) {
    return res.status(404).send(NotFound)
  }
  await todosRepository.del(id)
  res.status(204).send()
})

module.exports = router
