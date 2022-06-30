// Model
const { Task } = require('../models/task.model')

// Error handlers
const { catchAsync } = require('../utils/catchAsync.util')
const { appError } = require('../utils/appError.util')

// Petitions
const createTask = catchAsync(async (req, res, next) => {
        const { title, userId, limitDate } = req.body

        const newTask = await Task.create({
            title,
            userId,
            startDate: new Date(),
            limitDate
        })

        res.status(201).json({
            status: 'success',
            newTask
        })
})

const getAllTask = catchAsync(async (req, res, next) => {
        const tasks = await Task.findAll()
        res.status(200).json({
            status: 'success',
            tasks
        })
})

const getTaskByStatus = catchAsync(async (req, res, next) => {
        const { status } = req.params

        const tasks = await Task.findAll({ where: { status } })

        res.status(201).json({
            status: 'success',
            tasks
        })
})

const updateTaskById = catchAsync(async (req, res, next) => {
        const { id } = req.params
        
        const task = await Task.findOne({ where: { id } })
        const finishDated = new Date()
        const limitDated = task.limitDate
                
            if ((finishDated.getTime() - limitDated.getTime()) < 0) {
                await task.update({
                    finishDate: finishDated,
                    status: "complete"
                })
            } else {
                await task.update({
                    finishDate: finishDated,
                    status: "late"
                })
            }


            res.status(201).json({
                status: 'success',
                task
            })
})

const cancelTaskById = catchAsync(async (req, res, next) => {
        const { id } = req.params

        const task = await Task.findOne({ where: { id } })

        await task.update({
            status: 'cancelled'
        })

        res.status(201).json({
            status: 'success',
            task
        })
})

module.exports = { createTask, getAllTask, getTaskByStatus, updateTaskById, cancelTaskById }