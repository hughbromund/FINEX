var transactionService = require('../Services/TransactionService.js')  
const Transaction = require('../database/models/transactions');



exports.budgetStub = async function (req, res, next) {
    if (req.user) {
        res.status(200).json([
            {category: "Housing", budgeted: "100", spent: "123"},
            {category: "Utilities", budgeted: "2", spent: "400"},
            {category: "Transportation", budgeted: "300", spent: "5450"},
            {category: "Food", budgeted: "400", spent: "60"},
            {category: "Medical", budgeted: "5809", spent: "700"},
            {category: "Savings", budgeted: "600", spent: "823423"},
            {category: "Personal Entertainment", budgeted: "700", spent: "900"},
            {category: "Other", budgeted: "800", spent: "99999999999999999999"}
        ])
    }
    else {
        res.status(400).json({status: "not logged in!"})
    }
}

exports.insertTransaction = async function (req, res, next) {
    console.log('new transaction');
    console.log('body');
    console.log(req.body)
    const { username, type, cost, name, date } = req.body

    if (username && type && cost && name && date) {
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
    else {
        res.status(400).json({status: "incomplete fields!"})
    }
    
}

exports.expenseStub = async function (req, res, next) {
    if (req.user) {
        res.status(200).json([
            {username: req.user.username, cost: "3000", type: "food", category: "expense", name: "cornucopia"},
            {username: req.user.username, cost: "1", type: "savings", category: "expense", name: "poor boy"},
            {username: req.user.username, cost: "999999", type: "housing", category: "expense", name: "cupertino"}
        ])
    }
    else {
        res.status(400).json({status: "not logged in!"})
    }
}

exports.incomeStub = async function (req, res, next) {
    if (req.user) {
        res.status(200).json([
            {username: req.user.username, cost: "3000", type: "other", category: "income", name: "salary"},
            {username: req.user.username, cost: "782", type: "other", category: "income", name: "salary"},
            {username: req.user.username, cost: "99991", type: "other", category: "income", name: "salary"}
        ])
    }
    else {
        res.status(400).json({status: "not logged in!"})
    }
}

exports.totalStub = async function (req, res, next) {
    if (req.user) {
        res.status(200).json({budgeted: "1000", spent: "999999"})
    }
    else {
        res.status(400).json({status: "not logged in!"})
    }
}