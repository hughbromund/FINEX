var databaseAccess = require('../DatabaseAccess/mongo_commands')  

// controller that will call the database access functions to login
// THIS IS A STUB


exports.login_stub = async function (req, res, next) {
    const { username, password} = req.body
  
    if (username && password) {
        res.status(200).json({status: "Login Success!"})
    }
    else {
        res.status(400).json({status: "Login Failed"})
    }
}


// controller that will call the reguster database access functions
// THIS IS A STUB

exports.register_stub = async function (req, res, next) {
    const { username, password, email, name } = req.body
    if (username && password && email && name) {
        res.status(200).json(
            {status: username
        })
        
    } else {
        res.status(400).json({status: "Registration Failed"})
    }
}


//from https://github.com/b-bly/simple-mern-passport

const User = require('../database/models/user');


exports.register = async function (req, res, next) {
    console.log('user signup');
    console.log(req.body)
    const { username, password, email, name } = req.body
    // ADD VALIDATION
    User.findOne({ username: username }, (err, user) => {
        if (err) {
            console.log('User.js post error: ', err)
            res.status(400).json({
                status: "Sorry, an error occured"
            })
        } else if (user) {
            res.status(400).json({
                status: `Sorry, already a user with the username: ${username}`
            })
        }
        else {
            const newUser = new User({
                username: username,
                password: password,
                email: email,
                name: name
            })
            newUser.save((err, savedUser) => {
                if (err) return res.json(err)
                res.status(200).json(savedUser)
            })
        }
    })
}

//additional code for logging?
/*
exports.login = async function (req, res, next) {{
        console.log('routes/user.js, login, req.body: ');
        console.log(req.body)
        next()
    }
*/


exports.login = async function (req, res, next) {
    console.log('logged in', req.user);
    var userInfo = {
        username: req.user.username
    };
    res.status(200).send(userInfo); 
}


exports.user = async function (req, res, next) {
    console.log('===== user!!======')
    console.log(req.user)
    if (req.user) {
        User.findOne({ username: req.user.username }, (err, user) => {
            console.log(user);

            if (err) {
                console.log('User.js post error: ', err)
                res.status(400).json({
                    status: "Sorry, an error occured"
                })
            } 
            else if (user) {
                res.status(200).json({ 
                    username: user.username,
                    name: user.name,
                    email: user.email
                })
            } 
            else {
                res.status(400).json({ user: null })
            }  
        })
    }
    else {
        res.status(400).json({ status: "no user logged in"})
    }
}


exports.logout = async function (req, res, next) {
    if (req.user) {
        req.logout()
        res.status(200).send({ status: 'logging out' })
    } else {
        res.status(400).send({ status: 'no user to log out' })
    }
}

