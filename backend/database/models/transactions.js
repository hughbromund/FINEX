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
	
}




const Transaction = mongoose.model('Transaction', transactionSchema)
module.exports = Transactions