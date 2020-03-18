//var databaseAccess = require('../DatabaseAccess/mongo_commands')

var authService = require('../Services/AuthService.js')  

// controller that will call the database access functions to login
// THIS IS A STUB


exports.loginStub = async function (req, res, next) {
    const { username, password} = req.body
  
    if (username && password) {
        res.status(200).json({status: "Login Successful."})
    }
    else {
        res.status(400).json({status: "Login Failed."})
    }
}


// controller that will call the reguster database access functions
// THIS IS A STUB

exports.registerStub = async function (req, res, next) {
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
   let result = await authService.register(req);
   res.status(result.code).json(result)
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
    let result = await authService.login(req);
    res.status(result.code).json({username: result.username}); 
}


exports.user = async function (req, res, next) {
    //console.log("this is the return")
    //console.log(user);
    
    if (req.user) {
        try {
            let user = await authService.user(req)
            res.status(200).json({
                username: user.username,
                name: user.name,
                email: user.email
            })
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


exports.getGoodColor = async function (req, res, next) {
    if (req.user) {
        try {
            let color_hex = await authService.getGoodColor(req)
            res.status(200).json({
                good_color: color_hex
            })
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


exports.getBadColor = async function (req, res, next) {
    if (req.user) {
        try {
            let color_hex = await authService.getBadColor(req)
            res.status(200).json({
                bad_color: color_hex
            })
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


exports.logout = async function (req, res, next) {
    try {
        let status = await authService.logout(req, res, next);
        res.status(status.code).json({status: status.status});
    }
    catch (e) {
        console.log(e)
        res.status(400).json({status: "an error occured."})
    }
}

exports.updateEmail = async function (req, res, next) {
    const { email } = req.body;
    //console.log(req.user.username)
    if ( email == null ) {
        res.status(400).json({status: "new email not passed!"})
    }
    else if (req.user) {
        try {
            let result = await authService.updateEmail(req);
            //console.log(result)
            res.status(200).json({status: "email updated"})
        }
        catch(e) {
            res.status(400).json({status: "An error occured."})
        }
        
    }
    else {
        res.status(400).json({status: "No user logged in."})
    }
}

exports.updateGoodColor = async function (req, res, next) {
    const { good_color } = req.body;
    //console.log(req.user.username)
    if ( good_color == null ) {
        res.status(400).json({status: "new good color not passed!"})
    }
    else if (req.user) {
        try {
            let result = await authService.updateGoodColor(req);
            //console.log(result)
            res.status(200).json({status: "good color updated"})
        }
        catch(e) {
            res.status(400).json({status: "an error occurred"})
        }
        
    }
    else {
        res.status(400).json({status: "not logged in!"})
    }
}

exports.updateBadColor = async function (req, res, next) {
    const { bad_color } = req.body;
    //console.log(req.user.username)
    if ( bad_color == null ) {
        res.status(400).json({status: "new bad color not passed!"})
    }
    else if (req.user) {
        try {
            let result = await authService.updateGoodColor(req);
            //console.log(result)
            res.status(200).json({status: "bad color updated"})
        }
        catch(e) {
            res.status(400).json({status: "an error occurred"})
        }
        
    }
    else {
        res.status(400).json({status: "not logged in!"})
    }
}

exports.updateName = async function (req, res, next) {
    const { name } = req.body;
    if ( name == null ) {
        res.status(400).json({status: "new name not passed!"})
    }
    else if (req.user) {
        try {
            let result = await authService.updateName(req);
            //console.log(result)
            res.status(200).json({status: "name updated"})
        }
        catch(e) {
            res.status(400).json({status: "An error occured."})
        }
    }
    else {
        res.status(400).json({status: "No user logged in."})
    }
}

exports.updatePassword = async function (req, res, next) {
    const { password } = req.body;
    if ( password == null ) {
        res.status(400).json({status: "new password not passed!"})
    }
    else if (req.user) {
        try {
            let result = await authService.updatePassword(req);
            //console.log(result)
            res.status(200).json({status: "password updated"})
        }
        catch(e) {
            console.log(e)
            res.status(400).json({status: "An error occured."})
        }
    }
    else {
        res.status(400).json({status: "No user logged in."})
    }
}

exports.resetPassword = async function (req, res, next) {
    const { email } = req.body;
    if ( email == null ) {
        res.status(400).json({status: "email not passed!"})
    } 
    else {
        try {
            let result = await authService.resetPassword(req);
            //console.log(result)
            res.status(result.code).json({status: result.status})
        }
        catch(e) {
            console.log(e)
            res.status(400).json({status: "An error occured."})
        }
    }
}


exports.updateMode = async function (req, res, next) {
    const { dark_mode } = req.body;
    //console.log(req.user.username)
    if ( dark_mode == null ) {
        res.status(400).json({status: "mode preference not passed!"})
    }
    else if (req.user) {
        try {
            let result = await authService.updateMode(req);
            //console.log(result)
            res.status(200).json({status: "mode updated"})
        }
        catch(e) {
            res.status(400).json({status: "an error occurred"})
        }
        
    }
    else {
        res.status(400).json({status: "not logged in!"})
    }
}
