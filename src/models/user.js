const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
	email: { type: String, required: true },
	passwordHash: { type: String, required: true },
	name: { type: String },
	hasUnsetName: { type: Boolean }
});

module.exports = mongoose.model('User', UserSchema);