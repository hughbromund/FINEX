//from https://github.com/b-bly/simple-mern-passport

const mongoose = require('mongoose')
const Schema = mongoose.Schema
mongoose.promise = Promise

// Define userSchema
const budgetSchema = new Schema({

	username: { type: String, unique: false, required: false },
    month: { type: Number, unique: false, required: false},
    year: { type: Number, unique: false, required: false},
    total: { type: Number, unique: false, required: false},
    housing: { type: Number, unique: false, required: false},
    utilities: { type: Number, unique: false, required: false},
    transportation: { type: Number, unique: false, required: false},
    food: { type: Number, unique: false, required: false},
    medical: { type: Number, unique: false, required: false},
    savings: { type: Number, unique: false, required: false},
    personal: { type: Number, unique: false, required: false},
    entertainment: { type: Number, unique: false, required: false},
    other: { type: Number, unique: false, required: false},
    date: { type: Date, default: Date.now }
}, { collection: "Budgets"})

// Define schema methods
budgetSchema.methods = {
	
}




const Budget = mongoose.model('Budget', budgetSchema)
module.exports = Budget