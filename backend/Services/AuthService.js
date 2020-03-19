//from https://github.com/b-bly/simple-mern-passport

const User = require('../database/models/user');
const nodemailer = require('nodemailer');
const randomstring = require("randomstring");
 

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
           user: 'mail.finex.finex@gmail.com',
           pass: 'cosk.fuss9VOR'
       }
   });

//var databaseAccess = require('../DatabaseAccess/mongo_commands')  

// controller that will call the database access functions to login
// THIS IS A STUB


exports.loginStub = async function (req, res, next) {
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

//currently not used or functioning
exports.register = async function (req) {

    console.log('user signup');
    console.log(req.body)

    
    const { username, password, email, name } = req.body
    // ADD VALIDATION
 
    let foundUser = await User.findOne({ username: username }, (err, user) => {}).exec();
    let foundEmail = await User.findOne({ email: email }, (err, user) => {}).exec();
    console.log(foundUser);
    if (foundUser) {
        return {
            "status": "User already registered",
            "code": 400
        }
    }
    else if (foundEmail) {
        return {
            "status": "email already registered",
            "code": 400
        }
    }
    else {
        const newUser = new User({
            username: username,
            password: password,
            email: email,
            name: name
        })
        //save user in database
        await newUser.save((err, savedUser) => {});
        return {
            "status": "Registered.",
            "code": 200
        }
    }
}


exports.login = async function (req) {
    //console.log('logged in', req.user);
    return {
        username: req.user.username,
        code: 200
    }
}


exports.user = async function (req) {
    return await User.findOne({ username: req.user.username }, (err, user) => {}).exec()
}

exports.getGoodColor = async function (req) {
    return await User.findOne( { username: username }, { projection: { _id: 0, username: 0, transaction_ids: 0,
        password: 0, email: 0, stocks: 0, bad_color: 0, name: 0 } }, (err, good_color) => {}).exec()
}

exports.getBadColor = async function (req) {
    return await User.findOne( { username: username }, { projection: { _id: 0, username: 0, transaction_ids: 0,
        password: 0, email: 0, stocks: 0, good_color: 0, name: 0 } }, (err, bad_color) => {}).exec()
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

exports.updatePassword = async function (req) {
    let newPassword = await req.user.updatePassword(req.body.password);
    return await User.updateOne({username: req.user.username}, {password: newPassword}, (err, user) => {}).exec();
}

exports.resetPassword = async function (req) {
    //email code from: https://codeburst.io/sending-an-email-using-nodemailer-gmail-7cfa0712a799

    let resetUser = await User.findOne({ email: req.body.email }, (err, user) => {}).exec();
    if (resetUser) {
        //generate random password

        randomPassword = randomstring.generate(12);

        let newPassword = await resetUser.updatePassword(randomPassword);
        await User.updateOne({username: resetUser.username}, {password: newPassword}, (err, user) => {}).exec();

        const mailOptions = {
            from: 'mail.finex.finex@gmail.com', // sender address
            to: req.body.email, // list of receivers
            subject: 'Temporary Password', // Subject line
            html: '<p>Your new password is: ' + randomPassword + ' </p>'// plain text body
        };
        
        transporter.sendMail(mailOptions, function (err, info) {
            if(err)
              console.log(err)
            else
              console.log(info);
         });
        
        return { 
            status: 'If there was a user associated with that email address, an email was sent to them.',
            code: 200
        }
    } 
    else {
        return { 
            status: 'If there was a user associated with that email address, an email was sent to them.',
            code: 200
        }
    }

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