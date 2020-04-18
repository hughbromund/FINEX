// from https://github.com/b-bly/simple-mern-passport/
const path = require("path");

const User = require(path.resolve(__dirname, "../database/models/user"));
const LocalStrategy = require("passport-local").Strategy;

const strategy = new LocalStrategy(
  {
    usernameField: "username", // not necessary, DEFAULT
  },
  function (username, password, done) {
    User.findOne({ username: username }, (err, user) => {
      if (err) {
        return done(err);
      }
      if (!user) {
        return done(null, false, { message: "Incorrect username" });
      }
      if (!user.checkPassword(password)) {
        if (user.count == null) {
          User.updateOne(
            { username: user.username },
            { count: 0, lockoutDate: new Date() },
            (err, user) => {}
          ).exec();
        }

        if (user.count >= 3) {
          var date = new Date();
          date.setMinutes(date.getMinutes() + 30);
          User.updateOne(
            { username: user.username },
            { lockoutDate: date },
            (err, user) => {}
          ).exec();
          return done(null, false, { message: "Too many login attempts" });
        }

        User.updateOne(
          { username: user.username },
          { count: user.count + 1 },
          (err, user) => {}
        ).exec();
        return done(null, false, { message: "Incorrect password" });
      }
      if (user.count >= 3) {
        var date = new Date();
        //console.log(date)
        //console.log(user.lockoutDate)
        //console.log(date > user.lockoutDate)
        if (date > user.lockoutDate) {
          User.updateOne(
            { username: user.username },
            { count: 0 },
            (err, user) => {}
          ).exec();
          return done(null, user);
        } else {
          return done(null, false, { message: "Too many login attempts" });
        }
      }
      return done(null, user);
    });
  }
);

module.exports = strategy;
