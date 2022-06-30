// Model
const { User } = require('../models/user.model')

// Error handlers
const { catchAsync } = require('../utils/catchAsync.util')
const { appError } = require('../utils/appError.util')

//Petitions
const createUser = catchAsync(async (req, res, next) => {
        const { name, email, password } = req.body

        const newUser = await User.create({
            name,
            email,
            password
        })

        res.status(201).json({
            status: 'success',
            newUser
        })
})

const getAllActiveUsers = catchAsync(async (req, res, next) => {

        const users = await User.findAll({
            where: {
                status: "active"
            }
        })
        res.status(200).json({
            status: 'success',
            users
        })
})

const updateUser = catchAsync(async (req, res, next) => {
        const { id } = req.params
        const { name, email } = req.body

        const user = await User.findOne({ where: { id } })

        await user.update({ name, email })

        res.status(201).json({
            status: 'success',
            user
        })
})

const disableUser = catchAsync(async (req, res, next) => {
        const { id } = req.params

        const user = await User.findOne({ where: { id } })
        await user.update({
            status: 'disabled'
        })

        res.status(201).json({
            status: 'success',
            user
        })
})

module.exports = { createUser, getAllActiveUsers, updateUser, disableUser }