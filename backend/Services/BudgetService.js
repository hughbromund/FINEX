//from https://github.com/b-bly/simple-mern-passport

const User = require('../database/models/user');
const Budget = require('../database/models/budget');
const Spending = require('../database/models/spending');

//var databaseAccess = require('../DatabaseAccess/mongo_commands')  


exports.createBudget = async function (req, res, next) {

    try {
        console.log('new budget');
        console.log(req.body);
        console.log(req.user.username);
        const { month, year, total, housing, utilities, transportation, food, medical, 
            savings, personal, entertainment, other } = req.body

        if (housing + utilities + transportation + food + medical + savings + personal
            + entertainment + other != total) {
            //return res.status(400).json({ status: 400, message: e.message });
            //this does not work correctly, you cannot return res. 
        }

        const newBudget = new Budget({
            username: req.user.username,
            month: month,
            year: year,
            total: total,
            housing: housing,
            utilities: utilities,
            transportation: transportation,
            food: food,
            medical: medical,
            savings: savings,
            personal: personal,
            entertainment: entertainment,
            other: other
        })
        newBudget.save((err, savedBudget) => {
            if (err) {
                console.log(err);
            }
        })

        const newSpending = new Spending({
            username: req.user.username,
            month: month,
            year: year,
            total: 0,
            income: 0,
            housing: 0,
            utilities: 0,
            transportation: 0,
            food: 0,
            medical: 0,
            savings: 0,
            personal: 0,
            entertainment: 0,
            other: 0
        })
        newSpending.save((err, savedSpending) => {
            if (err) {
                console.log(err);
            }
        })

    } catch (e) {
        //return res.status(400).json({ status: 400, message: e.message });
         //this does not work correctly, you cannot return res. 
        console.log(e)
    }   
}

exports.getBudget = async function(req) {
    var currDate = new Date()

    var budget = await Budget.findOne({ username: req.user.username, month: currDate.getMonth(), year: currDate.getFullYear()}, (err, user) => {}).exec();
    var spending = await Spending.findOne({ username: req.user.username, month: currDate.getMonth(), year: currDate.getFullYear()}, (err, user) => {}).exec();

    if (budget == null) {
        return {
            status: 400,
            message: "Budget has not been created for this month."
        }
    }
    return [
            {category: "Housing", budgeted: budget.housing, spent: spending.housing},
            {category: "Utilities", budgeted: budget.utilities, spent: spending.utilities},
            {category: "Transportation", budgeted: budget.transportation, spent: spending.transportation},
            {category: "Food", budgeted: budget.food, spent: spending.food},
            {category: "Medical", budgeted: budget.medical, spent: spending.medical},
            {category: "Savings", budgeted: budget.savings, spent: spending.savings},
            {category: "Personal", budgeted: budget.personal, spent: spending.personal},
            {category: "Entertainment", budgeted: budget.entertainment, spent: spending.entertainment},
            {category: "Other", budgeted: budget.other, spent: spending.other}
        ]
}

exports.getTotal = async function(req) {
    var currDate = new Date()

    var budget = await Budget.findOne({ username: req.user.username, month: currDate.getMonth(), year: currDate.getFullYear()}, (err, user) => {}).exec();
    var spending = await Spending.findOne({ username: req.user.username, month: currDate.getMonth(), year: currDate.getFullYear()}, (err, user) => {}).exec();

    if (budget == null) {
        return {
            status: 400,
            message: "Budget has not been created for this month."
        }
    }
    return {budgeted: budget.total, spent: spending.total}
}
