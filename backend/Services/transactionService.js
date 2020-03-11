//from https://github.com/b-bly/simple-mern-passport

const User = require('../database/models/user');
const Transaction = require('../database/models/transactions');

//var databaseAccess = require('../DatabaseAccess/mongo_commands')  


exports.insertTransaction = async function (req, res, next) {

    try {
        console.log('new transaction');
        console.log(req.body)
        const { username, type, cost, name, date } = req.body

        const newTransaction = new Transaction({
            username: username,
            type: type,
            cost: cost,
            name: name,
            date: date
        })
        newTransaction.save((err, savedTransaction) => {
            if (err) return res.json(err)
            res.status(200).json(savedTransaction)
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