//var databaseAccess = require('../DatabaseAccess/mongo_commands')

var transactionService = require('../Services/TransactionService.js')  


//from https://github.com/b-bly/simple-mern-passport

const Transaction = require('../database/models/transactions');
/* exports.insertTransaction = async function (req, res, next) {
    console.log('new transaction');
    console.log(req.body)
    const { username, type, cost, name } = req.body
    User.findOne({ username: username }, (err, user) => {
        if (err) {
            console.log('User.js post error: ', err)
            res.status(400).json({
                status: "Sorry, an error occured"
            })
        } else if (!user) {
            res.status(400).json({
                status: "Sorry, username not found"
            })
        }
        else {
            const newTransaction = new Transaction({
                username: username,
                type: type,
                cost: cost,
                name: name
            })
            newTransaction.save((err, savedTransaction) => {
                if (err) return res.json(err)
                res.status(200).json(savedTransaction)
            })
        }
    })
} */

/*exports.insertTransaction = async function (req, res, next) {
    console.log(req.body)
    const { username, type, cost, name, date } = req.body
    let result = await transactionService.insertTransaction(req);
    res.status(result.code).send({
        transactions: result.transaction
    }); 
} */

//TODO: req.body is returning undefined
exports.insertTransaction = async function (req, res, next) {
    console.log('new transaction');
    console.log('body');
    console.log(req.body)
    const { username, type, cost, name, date } = req.body

    // ADD VALIDATION
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
}
