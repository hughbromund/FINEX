//from https://github.com/b-bly/simple-mern-passport

const User = require('../database/models/user');
const Budget = require('../database/models/budget');
const Spending = require('../database/models/spending');

//var databaseAccess = require('../DatabaseAccess/mongo_commands')  


exports.createBudget = async function (req, res, next) {
    var currDate = new Date()

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

        var budget = await Budget.findOne({ username: req.user.username, month: currDate.getMonth(), year: currDate.getFullYear()}, (err, user) => {}).exec();


        if (budget == null) {
            
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
        }
        else {
            await Budget.updateOne({username: req.user.username, month: currDate.getMonth(), year: currDate.getFullYear()}, 
            {
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
            }, (err, user) => {}).exec();
        }

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


exports.getAdvice = async function(req) {
    var currDate = new Date()

    var budget = await Budget.findOne({ username: req.user.username, month: currDate.getMonth(), year: currDate.getFullYear()}, (err, user) => {}).exec();
    var spending = await Spending.findOne({ username: req.user.username, month: currDate.getMonth(), year: currDate.getFullYear()}, (err, user) => {}).exec();


    if (budget == null || spending == null) {
        return {
            status: 400,
            message: "Budget has not been created for this month."
        }
    }

    let advice = [];

    //begin advice generation

    if (spending.total > spending.income) {
        advice.push({
            trigger: "Total spent greater than total income.",
            advice: "Keep spending under your income so you can accumulate savings.",
            isBudget: false
        })
    }

    if (budget.savings / budget.total < .20) {
        advice.push({
            trigger: "Budgeted savings less than 20%.",
            advice: "Save at least 20% of your income for emergencies and large purchases.",
            isBudget: true
        })
    }

    if (budget.housing / budget.total > .33) {
        advice.push({
            trigger: "Budgeted housing more than 33%.",
            advice: "It's recommended to spend no more than a third of your income on housing.",
            isBudget: true
        })
    }

    if (budget.personal / budget.total > .30) {
        advice.push({
            trigger: "Budgeted personal spending more than 30%.",
            advice: "It's recommended to spend no more than 30% of your income on personal items.",
            isBudget: true
        })
    }

    if (spending.total > budget.total) {
        advice.push({
            trigger: "Total spent greater than total budgeted.",
            advice: "Stay within your budget to effectively manage your money.",
            isBudget: false
        })
    }

    //each category
    if (spending.housing > budget.housing) {
        advice.push({
            trigger: "Total spent greater than total budgeted for housing.",
            advice: "Keep spending within your budgeted amount so you don't overspend.",
            isBudget: false
        })
    }

    if (spending.utilities > budget.utilities) {
        advice.push({
            trigger: "Total spent greater than total budgeted for utilities.",
            advice: "Keep spending within your budgeted amount so you don't overspend.",
            isBudget: false
        })
    }

    if (spending.transportation > budget.transportation) {
        advice.push({
            trigger: "Total spent greater than total budgeted for transportation.",
            advice: "Keep spending within your budgeted amount so you don't overspend.",
            isBudget: false
        })
    }

    if (spending.food > budget.food) {
        advice.push({
            trigger: "Total spent greater than total budgeted for food.",
            advice: "Keep spending within your budgeted amount so you don't overspend.",
            isBudget: false
        })
    }

    if (spending.medical > budget.medical) {
        advice.push({
            trigger: "Yotal spent greater than total budgeted for medical.",
            advice: "Keep spending within your budgeted amount so you don't overspend.",
            isBudget: false
        })
    }

    if (spending.personal > budget.personal) {
        advice.push({
            trigger: "Total spent greater than total budgeted for personal.",
            advice: "Keep spending within your budgeted amount so you don't overspend.",
            isBudget: false
        })
    }

    if (spending.entertainment > budget.entertainment) {
        advice.push({
            trigger: "Total spent greater than total budgeted for entertainment.",
            advice: "Keep spending within your budgeted amount so you don't overspend.",
            isBudget: false
        })
    }

    if (spending.other > budget.other) {
        advice.push({
            trigger: "Total spent greater than total budgeted for other.",
            advice: "Keep spending within your budgeted amount so you don't overspend.",
            isBudget: false
        })
    }

    let oldDate = new Date(currDate.getTime())

    oldDate.setMonth(oldDate.getMonth() - 1)

    var oldBudget = await Budget.findOne({ username: req.user.username, month: oldDate.getMonth(), year: oldDate.getFullYear()}, (err, user) => {}).exec();
    var oldSpending = await Spending.findOne({ username: req.user.username, month: oldDate.getMonth(), year: oldDate.getFullYear()}, (err, user) => {}).exec();

    if (oldBudget != null && oldSpending != null) {
        
        if (oldSpending.total > oldBudget.total) {
            advice.push({
                trigger: "Overspent on total budget last month.",
                advice: "Try to stay within your budget this month.",
                isBudget: false
            })
        }

        if (oldSpending.housing > oldBudget.housing) {
            advice.push({
                trigger: "Overspent on housing last month.",
                advice: "Try to keep within your housing budget this month.",
                isBudget: false
            })
        }
    
        if (oldSpending.utilities > oldBudget.utilities) {
            advice.push({
                trigger: "Overspent on utilities last month.",
                advice: "Try to keep within your utilities budget this month.",
                isBudget: false
            })
        }
    
        if (oldSpending.transportation > oldBudget.transportation) {
            advice.push({
                trigger: "Overspent on transportation last month.",
                advice: "Try to keep within your transportation budget this month.",
                isBudget: false
            })
        }
    
        if (oldSpending.food > oldBudget.food) {
            advice.push({
                trigger: "Overspent on food last month.",
                advice: "Try to keep within your food budget this month.",
                isBudget: false
            })
        }
    
        if (oldSpending.medical > oldBudget.medical) {
            advice.push({
                trigger: "Overspent on medical last month.",
                advice: "Try to keep within your medical budget this month.",
                isBudget: false
            })
        }
    
        if (oldSpending.personal > oldBudget.personal) {
            advice.push({
                trigger: "Overspent on personal last month.",
                advice: "Try to keep within your personal budget this month.",
                isBudget: false
            })
        }
    
        if (oldSpending.entertainment > oldBudget.entertainment) {
            advice.push({
                trigger: "Overspent on entertainment last month.",
                advice: "Try to keep within your entertainment budget this month.",
                isBudget: false
            })
        }
    
        if (oldSpending.other > oldBudget.other) {
            advice.push({
                trigger: "Overspent on other last month.",
                advice: "Try to keep within your other budget this month.",
                isBudget: false
            })
        }


    }


    return advice
}