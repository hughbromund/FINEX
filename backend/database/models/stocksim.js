const mongoose = require('mongoose')
const Schema = mongoose.Schema
mongoose.promise = Promise

// Define userSchema
const simSchema = new Schema({
	username: { type: String, unique: true, required: false},
    wallet: { type: Number, min: -1, unique: false, required: false},
    stocks: { type: Array, unique: false, required: false},
}, {collection: "StockSim"})

// Define schema methods
simSchema.methods = {
	
}

const StockSim = mongoose.model('StockSim', simSchema)
module.exports = StockSim