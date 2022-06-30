const { body, validationResult } = require('express-validator');

const { AppError } = require('../utils/appError.util');

const checkResult = (req, res, next) => {
	const errors = validationResult(req);

	if (!errors.isEmpty()) {
		// Array has errors
		const errorMsgs = errors.array().map(err => err.msg);

		const message = errorMsgs.join('. ');

		return next(new AppError(message, 400));
	}

	next();
};

const createUserValidators = [
	body('name').notEmpty().withMessage('Name cannot be empty'),
	body('email').isEmail().withMessage('Must provide a valid email'),
	body('password')
		.isLength({ min: 8 })
		.withMessage('Password must be at least 8 characters long')
		.isAlphanumeric()
		.withMessage('Password must contain letters and numbers'),
	checkResult,
];

const createTaskValidators = [
	body('title').notEmpty().withMessage('Title cannot be empty'),
	body('userId').isNumeric().withMessage('userId must be a number'),
	/* body('limitDate')
		.not().isDate()
		.withMessage('Date must be a format "%Y-%m-%d %H:%M:%S"'), */
	checkResult,
];

module.exports = { createUserValidators, createTaskValidators };