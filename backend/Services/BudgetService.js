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
            return res.status(400).json({ status: 400, message: e.message });
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
        return res.status(400).json({ status: 400, message: e.message });
    }   
}

