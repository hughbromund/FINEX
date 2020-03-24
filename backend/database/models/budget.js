//from https://github.com/b-bly/simple-mern-passport

const User = require('./user');
const mongoose = require('mongoose')
const Schema = mongoose.Schema
mongoose.promise = Promise

// Define userSchema
const budgetSchema = new Schema({

	username: { type: String, unique: false, required: false},
    month: { type: Number, min: -1, unique: false, required: false},
    year: { type: Number, min: 2019, unique: false, required: false},
    total: { type: Number, min: -1, unique: false, required: false},
    housing: { type: Number, min: -1, unique: false, required: false},
    utilities: { type: Number, min: -1, unique: false, required: false},
    transportation: { type: Number, min: -1, unique: false, required: false},
    food: { type: Number, min: -1, unique: false, required: false},
    medical: { type: Number, min: -1, unique: false, required: false},
    savings: { type: Number, min: -1, unique: false, required: false},
    personal: { type: Number, min: -1, unique: false, required: false},
    entertainment: { type: Number, min: -1, unique: false, required: false},
    other: { type: Number, min: -1, unique: false, required: false},
}, { collection: "Budgets"})

// Define schema methods
budgetSchema.methods = {
	
}




const Budget = mongoose.model('Budget', budgetSchema)
module.exports = Budget