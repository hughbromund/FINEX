//from https://github.com/b-bly/simple-mern-passport

const User = require('../database/models/user');
const Transaction = require('../database/models/transactions');
const Spending = require('../database/models/spending');

//var databaseAccess = require('../DatabaseAccess/mongo_commands')  


exports.insertTransaction = async function (req, res, next) {

    try {
        console.log('new transaction');
        console.log(req.body)
        const { username, type, cost, name, date, month, year} = req.body

        const newTransaction = new Transaction({
            username: username,
            type: type,
            cost: cost,
            name: name,
            month: month,
            year: year,
            date: date
        })
        newTransaction.save((err, savedTransaction) => {
            if (err) return res.json(err)
        })

        console.log("saved");
        //var mon = date.getMonth() + 1;
        //var yr = date.getYear() + 1990;

        Spending.findOneAndUpdate( {username: username, month: month, year: year},
             { $inc: {[type]: cost} }, function(err, response) {
                if (err) {
                console.log('error with findoneandupdate');
               } 
            })
        Spending.findOneAndUpdate( {username: username, month: month, year: year},
            { $inc: {total: cost} }, function(err, response) {
                if (err) {
                console.log('error with findoneandupdate');
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