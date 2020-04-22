const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
var cors = require("cors");
require('dotenv').config();

//for user auth
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);
const passport = require("./passport");

const port = process.env.PORT || 5000;
const app = express();

console.log(process.env.NODE_ENV)

if (process.env.REACT_APP_RUNTIME === "development") {
  app.use(cors())
} else {
  var whitelist = ["https://finex.money", "https://www.finex.money"]

  app.use(
    cors({
      origin: function (origin, callback) {
        if (whitelist.indexOf(origin) !== -1) {
          callback(null, true)
        } else {
          callback(new Error('Not allowed by CORS'))
        }
      },
      credentials: true
    })
  );
}

app.use(express.json());

app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);
app.use(bodyParser.json());

const dbConnection = require("./database");
//const user = require('./routes/user')

//session setup to save session info
app.use(
  session({
    secret: "super-secret-secret",
    store: new MongoStore({ mongooseConnection: dbConnection }),
    resave: false,
    saveUninitialized: false,
  })
);

//passport
app.use(passport.initialize());
app.use(passport.session());

app.use(require("./Routers/router"));

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
