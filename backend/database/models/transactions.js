//from https://github.com/b-bly/simple-mern-passport

const mongoose = require('mongoose')
const Schema = mongoose.Schema
mongoose.promise = Promise

// Define userSchema
const transactionSchema = new Schema({

	username: { type: String, unique: true, required: false },
    cost: { type: String, unique: false, required: false},
    type: { type: String, unique: false, required: false},
    name: { type: String, unique: false, required: false},
    date: { type: Date, default: Date.now }
}, { collection: "Transactions"})

// Define schema methods
transactionSchema.methods = {
	
}




const Transaction = mongoose.model('Transaction', transactionSchema)
module.exports = Transaction