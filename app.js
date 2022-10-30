const express = require('express');
const mongoose = require('mongoose');
const config = require('./utils/config');
const logger = require('./utils/logger');
const app = express();

mongoose.connect(config.MONGO_URI)
	.then(() => logger.info('connected to MongoDB'))
	.catch(e => logger.error(e));

app.get('/api', (req, res) => {
	res.status(200).send({ test: 'works'});
});

module.exports = app;