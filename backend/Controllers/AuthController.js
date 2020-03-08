//var databaseAccess = require('../DatabaseAccess/mongo_commands')

var auth_service = require('../Services/AuthService.js')  

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
    let result = await auth_service.login(req);
    res.status(result.code).send({
        username: result.username
    }); 
}


exports.user = async function (req, res, next) {
    //console.log("this is the return")
    //console.log(user);
    
    if (req.user) {
        try {
            let user = await auth_service.user(req)
            res.status(200).json({
                username: user.username,
                name: user.name,
                email: user.email
            })
        }
        catch (e) {
            console.log(e)
            res.status(400).json({
                status: "an error occured"
            })
        }
    }
    else {
        res.status(400).json({
            status: "user not logged in!"
        })
    }
}

exports.logout = async function (req, res, next) {
    let status = await auth_service.logout(req, res, next);
    res.status(status.code).json({status: status.status});
}

exports.updateEmail = async function (req, res, next) {
    const { email } = req.body;
    //console.log(req.user.username)
    if ( email == null ) {
        res.status(400).json({status: "new email not passed!"})
    }
    else if (req.user) {
        try {
            let result = await auth_service.updateEmail(req);
            //console.log(result)
            res.status(200).json({status: "email updated"})
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
            let result = await auth_service.updateName(req);
            //console.log(result)
            res.status(200).json({status: "name updated"})
        }
        catch(e) {
            res.status(400).json({status: "an error occurred"})
        }
    }
    else {
        res.status(400).json({status: "not logged in!"})
    }

}

