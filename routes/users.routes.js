const express = require('express')


// Controllers
const { createUser, getAllActiveUsers, updateUser, disableUser } = require('../controllers/users.controller')
const { userExists } = require('../middlewares/users.middleware')
const { createUserValidators } = require('../middlewares/validators.middleware')

const usersRouter = express.Router()

usersRouter.post('/', createUserValidators, createUser)
usersRouter.get('/', getAllActiveUsers)
usersRouter.patch('/:id', userExists, updateUser)
usersRouter.delete('/:id', userExists, disableUser)

module.exports = { usersRouter }