const Router = require('express').Router()
const Contr = require('./../controllers/todoController')

Router.get('/todo/:id')
Router.get('/todos',Contr.getAllTodo)
Router.post('/todo')
Router.patch('/todo/:id')
Router.delete('/todo/:id')

module.exports = Router