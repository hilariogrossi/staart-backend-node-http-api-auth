const { wait } = require('../utils')

const TodosRepository = () => {
  let idSequence = 1
  const todos = {}

  const insert = async (todo) => {
    await wait(500)
    const id = idSequence++
    const data = { ...todo, id }
    todos[id] = data
    return data
  }

  const list = async () => {
    await wait(100)
    return Object.values(todos)
  }

  const get = async (id) => {
    await wait(100)
    return todos[id]
  }

  const update = async (todo) => {
    await wait(500)
    todos[todo.id] = todo
    return todo
  }

  const del = async (id) => {
    await wait(500)
    delete todos[id]
  }

  return {
    insert,
    list,
    get,
    update,
    del,
  }
}

module.exports = {
  TodosRepository,
}

