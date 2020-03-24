//from https://github.com/b-bly/simple-mern-passport

const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcryptjs');
mongoose.promise = Promise

// Define userSchema
const userSchema = new Schema({

	username: { type: String, unique: true, required: false },
	password: { type: String, unique: false, required: false },
	email: { type: String, unique: true, required: false },
	name: { type: String, unique: false, required: false },
	stocks: { type: Array, default: [], unique: false, required: false},
	transaction_ids: { type: String, unique: false, required: false},
	good_color: { type: String, unique: false, required: false},
	bad_color: { type: String, unique: false, required: false},
	dark_mode: { type: Boolean },
}, { collection: "Users"})

// Define schema methods
userSchema.methods = {
	checkPassword: function (inputPassword) {
		return bcrypt.compareSync(inputPassword, this.password)
	},
	hashPassword: plainTextPassword => {
		return bcrypt.hashSync(plainTextPassword, 10)
	},
}

userSchema.methods.updatePassword = function updatePassword (password) {
	return bcrypt.hashSync(password, 10)
}

// Define hooks for pre-saving
userSchema.pre('save', function (next) {
	if (!this.password) {
		console.log('models/user.js =======NO PASSWORD PROVIDED=======')
		next()
	} else {
		console.log('models/user.js hashPassword in pre save');
		
		this.password = this.hashPassword(this.password)
		next()
	}
})

const User = mongoose.model("User", userSchema)
module.exports = User