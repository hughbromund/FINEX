var databaseAccess = require('../DatabaseAccess/mongo_commands')  

// controller that will call the database access functions to login
// THIS IS A STUB FOR RIGHT NOW
exports.login = async function (req, res, next) {
    if (req.params.username === "username" && req.params.password == "password") {
        res.status(200).json({status: "Login Success!"})
    } else {
        res.status(400).json({status: "Login Failed"})
    }
}

// controller that will call the reguster database access functions
// THIS IS A STUB FOR RIGHT NOW
exports.register = async function (req, res, next) {
    if (req.params.username === "exist") {
        res.status(400).json({status: "Registration Failed"})
    } else {
        res.status(200).json(
            {"username" : req.params.username, 
            "password" : req.params.password,
            "email" : req.params.email
        })
    }
}