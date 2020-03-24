var transactionService = require('../Services/TransactionService.js')  
const Transaction = require('../database/models/transactions');
var budgetService = require('../Services/BudgetService.js')
const Budget = require('../database/models/budget')


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
        res.status(400).json({status: "No user logged in."})
    }
}

exports.insertTransaction = async function (req, res, next) {
    const { category, type, cost, name} = req.body
    //console.log(req.user.username)
    if ( category && type && cost && name) {
        try {
            let result = await transactionService.insertTransaction(req, res);
            res.status(200).json({status: "new transaction inserted"})
        } catch(e) {
            res.status(400).json({status: "an error occurred"})
        }
    }
    else {
        res.status(400).json({status: "incomplete fields"})
    }
}

exports.createBudget = async function (req, res, next) {
    const { username, month, year, total, housing, utilities, transportation, food, medical, 
        savings, personal, entertainment, other, date } = req.body
    //console.log(req.user.username)
    if ( username && month && year && total && housing && utilities && transportation && food && medical &&
        savings && personal && entertainment && other && date ) {
        try {
            let result = await budgetService.createBudget(req);
            res.status(200).json({status: "new budget created"})
        } catch(e) {
            res.status(400).json({status: "an error occurred"})
        }
    }
    else {
        res.status(400).json({status: "incomplete fields"})
    }
}

exports.expenseStub = async function (req, res, next) {
    if (req.user) {
        res.status(200).json([
            {username: req.user.username, cost: "3000", type: "expense", category: "food", name: "cornucopia"},
            {username: req.user.username, cost: "1", type: "expense", category: "savings", name: "poor boy"},
            {username: req.user.username, cost: "999999", type: "expense", category: "housing", name: "cupertino"}
        ])
    }
    else {
        res.status(400).json({status: "No user logged in."})
    }
}

exports.getExpenses = async function (req, res, next) {
    if (req.user) {
        try {
            var expenseList = await transactionService.getExpenses(req)
            res.status(200).json(expenseList)
        }
        catch (e) {
            console.log(e)
            res.status(400).json({status: "An error occured."})
        }
    }
    else {
        res.status(400).json({status: "No user logged in."})
    }
}

exports.incomeStub = async function (req, res, next) {
    if (req.user) {
        res.status(200).json([
            {username: req.user.username, cost: "3000", type: "income", category: "other", name: "salary"},
            {username: req.user.username, cost: "782", type: "income", category: "other", name: "salary"},
            {username: req.user.username, cost: "99991", type: "income", category: "other", name: "salary"}
        ])
    }
    else {
        res.status(400).json({status: "No user logged in."})
    }
}

exports.getIncome = async function (req, res, next) {
    if (req.user) {
        try {
            var incomeList = await transactionService.getIncome(req)
            res.status(200).json(incomeList)
        }
        catch (e) {
            console.log(e)
            res.status(400).json({status: "An error occured."})
        }
    }
    else {
        res.status(400).json({status: "No user logged in."})
    }
}

exports.totalStub = async function (req, res, next) {
    if (req.user) {
        res.status(200).json({budgeted: "1000", spent: "999999"})
    }
    else {
        res.status(400).json({status: "No user logged in."})
    }
}