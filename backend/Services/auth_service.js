//from https://github.com/b-bly/simple-mern-passport

const User = require('../database/models/user');

//var databaseAccess = require('../DatabaseAccess/mongo_commands')  

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

//currently not used or functioning
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


exports.login = async function (req) {
    //console.log('logged in', req.user);
    return {
        username: req.user.username,
        code: 200
    }

    /*
    var userInfo = {
        username: req.user.username
    };
    res.status(200).send(userInfo); 
    */
}


exports.user = async function (req) {
    return await User.findOne({ username: req.user.username }, (err, user) => {}).exec()
}


exports.logout = async function (req, res, next) {
    if (req.user) {
        req.logout()
        return { 
            status: 'logging out',
            code: 200
        }
    } 
    else {
        return { 
            status: 'no user to log out',
            code: 400
        }
    }
}

exports.updateEmail = async function (req) {
    return await User.updateOne({username: req.user.username}, {email: req.body.email}, (err, user) => {}).exec();
}

exports.updateName = async function (req) {
    return await User.updateOne({username: req.user.username}, {name: req.body.name}, (err, user) => {}).exec();
}

exports.updateGoodColor = async function (req) {
    return await User.updateOne({username: req.user.username}, 
        {good_color: req.body.good_color}, (err, user) => {}).exec();  
}

exports.updateBadColor = async function (req) {
    return await User.updateOne({username: req.user.username}, 
        {bad_color: req.body.bad_color}, (err, user) => {}).exec();  
} 

exports.updateMode = async function (req) {
    return await User.updateOne({username: req.user.username},
        {dark_mode: req.body.dark_mode}, (err, user) => {}).exec();
}