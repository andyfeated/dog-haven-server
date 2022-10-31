const usersRouter = require('express').Router();
const { requestValidator } = require('../utils/middleware');
const { body } = require('express-validator');
const User = require('../models/user');
const bcrypt = require('bcrypt');

usersRouter.post(
	'/', 
	body('email')
		.isEmail()
		.withMessage('Invalid email format'),
	body('password')
		.isLength({ min: 8 })
		.withMessage('Password should be at least 8 characters long'),
	requestValidator,
	async (req, res,) => {
		const { email, password } = req.body;

		const existingUser = await User.findOne({ email });

		if(existingUser){
			return res.status(400).send({ error: 'There\'s already an account for this email'});
		}

		const passwordHash = await bcrypt.hash(password, 10);

		const newUser = new User({
			email,
			passwordHash,
			name: email.substring(0, email.indexOf('@')),
			hasUnsetName: true,
		});

		const savedUser = await newUser.save();
		
		res.status(201).send(savedUser);
	}
);

module.exports = usersRouter;