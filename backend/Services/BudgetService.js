//from https://github.com/b-bly/simple-mern-passport

const User = require('../database/models/user');
const Budget = require('../database/models/budget');

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
                //return res.json(err);
            }
            //console.log(res);
            //res.status(200).json(savedBudget);
        })
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }   
}

