var express = require("express");
var request = require("request");
var router = express.Router();
const cors = require("cors");
const path = require("path");

var stockController = require(path.resolve(
  __dirname,
  "../Controllers/StockController"
));
var cryptoController = require(path.resolve(
  __dirname,
  "../Controllers/CryptoController"
));
var authController = require(path.resolve(
  __dirname,
  "../Controllers/AuthController"
));
var financeController = require(path.resolve(
  __dirname,
  "../Controllers/FinanceController"
));

const passport = require("../passport");

router.use(function timeLog(req, res, next) {
  console.log("Time: ", Date.now());
  next();
});

//test endpoint
router.get("/hi", stockController.getHello);

//autofill stock search list endpoint
router.get("/api/stock/auto/:input", stockController.getAutoComplete);
router.get("/api/stock/auto/", stockController.getAutoCompleteEmpty);

//autofill crypto search list endpoint
router.get("/api/crypto/auto/:input", cryptoController.getAutoComplete);
router.get("/api/crypto/auto/", cryptoController.getAutoCompleteEmpty);

//retrieve stock intraday data endpoint
router.get(
  "/api/stock/intraday/:code",
  stockController.getStockIntraday
);

//retrieve stock daily data endpoint
router.get("/api/stock/daily/:code", stockController.getStockDaily);

//retrieve crypto daily data endpoint
router.get("/api/crypto/daily/:code", cryptoController.getCryptoDaily);

//retrieve crypto daily data endpoint
router.get(
  "/api/crypto/weekly/:code",
  cryptoController.getCryptoWeekly
);

//retrieve SMA data endpoint
router.get(
  "/api/stock/sma/:code/:interval/:series_type",
  stockController.getSMA
);

//retrieve EMA data endpoint
router.get(
  "/api/stock/ema/:code/:interval/:series_type",
  stockController.getEMA
);

//retrieve EMA data endpoint
router.get(
  "/api/stock/rsi/:code/:interval/:series_type",
  stockController.getRSI
);

//retrieve EMA data endpoint
router.get(
  "/api/stock/bbands/:code/:interval/:series_type",
  stockController.getBbands
);

//retrieve EMA data endpoint
router.get(
  "/api/stock/macd/:code/:interval/:series_type",
  stockController.getMACD
);

//update user's stock array
router.post("/stock/addStock", stockController.addStockToUser);
router.post("/stock/removeStock", stockController.removeStockFromUser);

//get user's stock array
router.get("/stock/getStocks", stockController.getStocks);

//stock sims
router.post(
  "/stock/sim/createPortfolio",
  stockController.createPortfolio
);
router.get("/stock/sim/getPortfolio", stockController.getPortfolio);
router.post("/stock/sim/buyStock", stockController.buyStock);
router.post("/stock/sim/sellStock", stockController.sellStock);
//STUBS

//register account stub
router.post("/auth_stub/register", authController.registerStub);

//login account stub
router.post("/auth_stub/login", authController.loginStub);

//logout account stub
//router.post('/auth_stub/logout', cors(), authController.logout_stub);

//get username of logged in account stub
//router.get('/auth_stub/username', cors(), authController.user_stub);

//AUTHENTICATION

//register account
router.post("/auth/register", authController.register);

//login account
router.post(
  "/auth/login",
  passport.authenticate("local"),
  authController.login
);

//logout account
router.post("/auth/logout", authController.logout);

//get username of logged in account
router.get("/auth/user", authController.user);

//update email
router.put("/auth/updateEmail", authController.updateEmail);
router.put("/auth/updateName", authController.updateName);
router.put("/auth/updatePassword", authController.updatePassword);

//reset password
router.put("/auth/resetPassword", authController.resetPassword);

//change color preferences
router.post("/user/updateGoodColor", authController.updateGoodColor);
router.post("/user/updateBadColor", authController.updateBadColor);

//update dark/light mode
router.post("/user/lightDarkMode", authController.updateMode);

//accept warnings
router.post("/user/acceptWarnings", authController.acceptWarnings);
router.get("/user/warningStatus", authController.warningStatus);

//get good/bad color hex value
router.get('/user/getGoodColor', cors(), authController.getGoodColor);
router.get('/user/getBadColor', cors(), authController.getBadColor);

//get/set profile picture
router.get('/user/getProfilePicture', cors(), authController.getProfilePicture);
router.post('/user/setProfilePicture', cors(), authController.setProfilePicture);

//FINANCE

//get the user's predicted and spent budget
router.get("/finance/budget", financeController.getBudget);

//get the user's recent income transactions
router.get("/finance/income", financeController.getIncome);

//get the user's recent expense transactions
router.get("/finance/expense", financeController.getExpenses);

//get the user's recent expenses in specified category
router.get("/finance/expense/:category", financeController.getCategory);

//get the user's predicted and spent total
router.get("/finance/total", financeController.getTotal);

//insert new transaction
router.post(
  "/transaction/newTransaction",
  financeController.insertTransaction
);

//create new budget
router.post('/budget/createBudget', financeController.createBudget);

//generate advice
router.get('/finance/advice', financeController.getAdvice);


module.exports = router;
