// Models
const { Task } = require('../models/task.model');

// Utils
const { AppError } = require('../utils/appError.util');
const { catchAsync } = require('../utils/catchAsync.util');

const taskExists = catchAsync(async (req, res, next) => {
	const { id } = req.params;

	const task = await Task.findOne({ where: { id } });

	if (!task) {
		return next(new AppError('Task not found', 404));
	}

	req.task = task;
	next();
});

const activeTaskStatus = catchAsync(async (req, res, next) => {
	const { id } = req.params;

	const task = await Task.findOne({ where: { id } });

	if (task.status !== "active") {
		return next(new AppError('Task status is not active', 404));
	}

	req.task = task;
	next();
});

module.exports = { taskExists, activeTaskStatus };