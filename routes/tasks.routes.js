const express = require('express');

// Controllers
const { createTask, getAllTask, getTaskByStatus, updateTaskById, cancelTaskById } = require('../controllers/tasks.controller');
const { taskExists, activeTaskStatus } = require('../middlewares/tasks.middleware');
const { createTaskValidators } = require('../middlewares/validators.middleware');

const tasksRouter = express.Router()

tasksRouter.post('/', createTaskValidators, createTask)
tasksRouter.get('/', getAllTask)
tasksRouter.get('/:status', getTaskByStatus)
tasksRouter.patch('/:id', taskExists, activeTaskStatus, updateTaskById)
tasksRouter.delete('/:id', taskExists, activeTaskStatus, cancelTaskById)

module.exports = { tasksRouter }