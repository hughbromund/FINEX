//from https://github.com/b-bly/simple-mern-passport

const User = require('../database/models/user');


exports.signup = async function (req, res, next) {
    console.log('user signup');

    const { username, password } = req.body
    // ADD VALIDATION
    User.findOne({ username: username }, (err, user) => {
        if (err) {
            console.log('User.js post error: ', err)
        } else if (user) {
            res.json({
                error: `Sorry, already a user with the username: ${username}`
            })
        }
        else {
            const newUser = new User({
                username: username,
                password: password
            })
            newUser.save((err, savedUser) => {
                if (err) return res.json(err)
                res.json(savedUser)
            })
        }
    })
}


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
    res.send(userInfo);
}


exports.user = async function (req, res, next) {
    console.log('===== user!!======')
    console.log(req.user)
    if (req.user) {
        res.json({ user: req.user })
    } else {
        res.json({ user: null })
    }

}

exports.logout = async function (req, res, next) {
    if (req.user) {
        req.logout()
        res.send({ msg: 'logging out' })
    } else {
        res.send({ msg: 'no user to log out' })
    }
}

