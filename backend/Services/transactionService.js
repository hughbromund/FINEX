//from https://github.com/b-bly/simple-mern-passport

const User = require('../database/models/user');
const transactions = require('../database/models/transactions');

//var databaseAccess = require('../DatabaseAccess/mongo_commands')  


exports.insertTransaction = async function (req) {
    return await transactions.insertOne({username: req.user.username}, {type: req.body.type}, 
        {cost: req.body.cost}, {name: req.body.name}, (err, user) => {}).exec();
}

//in progress
exports.addTransactionToUser = async function (req) {
    return await User.updateOne( { username: req.user.username }, 
        { $push: { transaction_ids: transaction }}).catch(() => {}).exec();
}