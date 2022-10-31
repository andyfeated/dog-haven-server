const { validationResult } = require('express-validator');

const requestValidator = (req, res, next) => {
	const errors = validationResult(req);

	if(errors.isEmpty()){
		return next();
	}

	const extractedErrors = [];
	errors.array().forEach(
		e => extractedErrors.push({ [e.param]: e.msg})
	);
	
	return res.status(400).json(extractedErrors);
};

module.exports = requestValidator;