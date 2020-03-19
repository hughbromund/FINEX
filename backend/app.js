const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
var cors = require("cors");

//for user auth
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);
const passport = require("./passport");

const port = process.env.PORT || 5000;
const app = express();

app.use(express.json());

app.use(
  bodyParser.urlencoded({
    extended: false
  })
);
app.use(bodyParser.json());
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:3000",
    preFlightContinue: true
  })
);

const dbConnection = require("./database");
//const user = require('./routes/user')

//session setup to save session info
app.use(
  session({
    secret: "super-secret-secret",
    store: new MongoStore({ mongooseConnection: dbConnection }),
    resave: false,
    saveUninitialized: false
  })
);

//passport
app.use(passport.initialize());
app.use(passport.session());

app.use(require("./Routers/router"));

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
