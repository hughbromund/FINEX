//from https://github.com/b-bly/simple-mern-passport

const User = require('../database/models/user');
const Transaction = require('../database/models/transactions');

//var databaseAccess = require('../DatabaseAccess/mongo_commands')  


exports.insertTransaction = async function (req, res, next) {

    try {
        console.log('new transaction');
        console.log(req.body)
        const {type, category, cost, name, date } = req.body

        const newTransaction = new Transaction({
            username: req.user.username,
            type: type,
            category: category,
            cost: cost,
            name: name,
            date: date
        })
        newTransaction.save((err, savedTransaction) => {
            if (err) {
                res.status(200).json(savedTransaction)
            }
        })
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }   
}

//in progress
exports.addTransactionToUser = async function (req) {
    return await User.updateOne( { username: req.user.username }, 
        { $push: { transaction_ids: transaction }}).catch(() => {}).exec();
}

exports.getExpenses = async function (req) {
    var minDate = new Date()
    minDate.setMilliseconds(0);
    minDate.setSeconds(0);
    minDate.setMinutes(0);
    minDate.setHours(0);
    minDate.setDate(1);
    
   return await Transaction.find({username: req.user.username, type: "expense", date: {$gte: minDate}}, (err, user) => {}).exec();
}

exports.getIncome = async function (req) {
    var minDate = new Date()
    minDate.setMilliseconds(0);
    minDate.setSeconds(0);
    minDate.setMinutes(0);
    minDate.setHours(0);
    minDate.setDate(1);
    
   return await Transaction.find({username: req.user.username, type: "income", date: {$gte: minDate}}, (err, user) => {}).exec();
}