const express = require('express')

// Routers
const { usersRouter } = require('./routes/users.routes')
const { tasksRouter } = require('./routes/tasks.routes')

// Models
const { User } = require('./models/user.model')
const { Task } = require('./models/task.model')

// Utils
const { db } = require('./utils/database.util')

// Init express app
const app = express()
app.use(express.json())

// Define endpoints
app.use('/api/v1/users', usersRouter)
app.use('/api/v1/tasks', tasksRouter)

// Authenticate sync and listen server
db.authenticate()
.then(() => console.log('db authenticated'))
.catch(err => console.log(err));

// Establish models relations
User.hasMany(Task, { foreignKey: 'userId'})
Task.belongsTo(User)

db.sync()
.then(() => console.log('db create or synced'))
.catch(err => console.log(err));

app.listen(4030, () => {
    console.log('Server listening at http://localhost:4030')
})