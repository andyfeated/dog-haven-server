const loginRouter = require('express').Router();
const { body } = require('express-validator');
const { requestValidator } = require('../utils/middleware');
const bcrypt = require('bcrypt');
const User = require('../models/user');
const jwt = require('jsonwebtoken');

loginRouter.post(
	'/',
	body('email')
		.isEmail()
		.withMessage('Invalid email format'),
	body('password')
		.isLength({ min: 8})
		.withMessage('Password should be at least 8 characters long'),
	body('rememberUser'),
	requestValidator,
	async (req, res) => {
		const { email, password, rememberUser } = req.body;

		const user = await User.findOne({ email });

		if(!user){
			return res.status(400).send({ error: 'Account does not exist'});
		}

		const passwordCorrect = await bcrypt.compare(password, user.passwordHash);

		if(!passwordCorrect){
			return res.status(400).send({ error: 'Incorrect password' });
		}

		const userForToken = {
			_id: user._id,
			email: user.email,
		};

		const token = jwt.sign(
			userForToken, process.env.JWT_SECRET,
			{ expiresIn: rememberUser ? '30d' : '2d'}
		);

		res.status(200).send({ 
			token,
			email: user.email,
			name: user.name,
			hasUnsetName: user.hasUnsetName
		});
	}
);

module.exports = loginRouter;