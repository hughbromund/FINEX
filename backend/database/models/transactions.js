//from https://github.com/b-bly/simple-mern-passport

const mongoose = require('mongoose')
const Schema = mongoose.Schema
mongoose.promise = Promise

// Define userSchema
const transactionSchema = new Schema({

	username: { type: String, unique: true, required: true },
    cost: { type: String, unique: false, required: true},
    type: { type: String, unique: false, required: true},
    name: { type: String, unique: false, required: true}
}, { collection: "Transactions"})

// Define schema methods
transactionSchema.methods = {
	addTransaction: function (inputPassword) {
		return bcrypt.compareSync(inputPassword, this.password)
	},
	hashPassword: plainTextPassword => {
		return bcrypt.hashSync(plainTextPassword, 10)
	},
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

const User = mongoose.model('User', userSchema)
module.exports = User