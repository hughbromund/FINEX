//from https://github.com/b-bly/simple-mern-passport

const User = require('../database/models/user');
const Budget = require('../database/models/budget');

//var databaseAccess = require('../DatabaseAccess/mongo_commands')  


exports.createBudget = async function (req, res, next) {

    try {
        console.log('new budget');
        console.log(req.body)
        const { username, month, year, total, housing, utilities, transportation, food, medical, 
            savings, personal, entertainment, other, date } = req.body

        const newBudget = new Budget({
            username: username,
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
            other: other,
            date: date
        })
        newBudget.save((err, savedBudget) => {
            if (err) return res.json(err)
            res.status(200).json(savedBudget)
        })
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }   
}

