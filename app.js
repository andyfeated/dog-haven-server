const express = require('express');
const mongoose = require('mongoose');
const config = require('./src/utils/config');
const logger = require('./src/utils/logger');
const { requestLogger, unknownEndpoint } = require('./src/utils/middleware/');
const app = express();
const cors = require('cors');
const usersRouter = require('./src/controllers/users');

mongoose.connect(config.MONGO_URI)
	.then(() => logger.info('connected to MongoDB'))
	.catch(e => logger.error(e));

app.use(cors());
app.use(express.json());
app.use(requestLogger);

app.use('/api/user', usersRouter);

app.use(unknownEndpoint);

module.exports = app;