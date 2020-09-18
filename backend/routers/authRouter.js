const express = require('express')
const Router = express.Router()
const Contr = require('./../controllers/authController')

Router.post('/register' , Contr.register)
Router.post('/login', Contr.login)
Router.patch('/user-email-verification', Contr.verification)


module.exports = Router