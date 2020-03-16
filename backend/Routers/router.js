var express = require('express');
var request = require('request');
var router = express.Router();
const cors = require('cors');

var stockController = require('../Controllers/StockController');
var cryptoController = require('../Controllers/CryptoController');
var authController = require('../Controllers/AuthController');
var financeController = require('../Controllers/FinanceController');

const passport = require('../passport');


router.use(function timeLog(req, res, next) {
  console.log('Time: ', Date.now());
  next();
});

//test endpoint
router.get('/hi', cors(), stockController.getHello);

//autofill stock search list endpoint
router.get('/api/stock/auto/:input', cors(), stockController.getAutoComplete);
router.get('/api/stock/auto/', cors(), stockController.getAutoCompleteEmpty);

//autofill crypto search list endpoint
router.get('/api/crypto/auto/:input', cors(), cryptoController.getAutoComplete);
router.get('/api/crypto/auto/', cors(), cryptoController.getAutoCompleteEmpty);


//retrieve stock intraday data endpoint
router.get('/api/stock/intraday/:code', cors(), stockController.getStockIntraday);

//retrieve stock daily data endpoint
router.get('/api/stock/daily/:code', cors(), stockController.getStockDaily);

//retrieve crypto daily data endpoint
router.get('/api/crypto/daily/:code', cors(), cryptoController.getCryptoDaily);

//retrieve crypto daily data endpoint
router.get('/api/crypto/weekly/:code', cors(), cryptoController.getCryptoWeekly);

//retrieve SMA data endpoint
router.get('/api/stock/sma/:code/:interval/:series_type', cors(), stockController.getSMA);

//retrieve EMA data endpoint
router.get('/api/stock/ema/:code/:interval/:series_type', cors(), stockController.getEMA);

//retrieve EMA data endpoint
router.get('/api/stock/rsi/:code/:interval/:series_type', cors(), stockController.getRSI);

//retrieve EMA data endpoint
router.get('/api/stock/bbands/:code/:interval/:series_type', cors(), stockController.getBbands);

//retrieve EMA data endpoint
router.get('/api/stock/macd/:code/:interval/:series_type', cors(), stockController.getMACD);

//STUBS



//register account stub
router.post('/auth_stub/register', cors(), authController.registerStub);

//login account stub
router.post('/auth_stub/login', cors(), authController.loginStub);

//logout account stub
//router.post('/auth_stub/logout', cors(), authController.logout_stub);

//get username of logged in account stub
//router.get('/auth_stub/username', cors(), authController.user_stub);


//AUTHENTICATION

//register account
router.post('/auth/register', cors(), authController.register);

//login account
router.post('/auth/login', cors(), passport.authenticate('local'), authController.login);

//logout account
router.post('/auth/logout', cors(), authController.logout);

//get username of logged in account
router.get('/auth/user', cors(), authController.user);

//update email
router.put('/auth/updateEmail', cors(), authController.updateEmail);
router.put('/auth/updateName', cors(), authController.updateName);
router.put('/auth/updatePassword', cors(), authController.updatePassword);

//reset password
router.put('/auth/resetPassword', cors(), authController.resetPassword);

//change color preferences
router.post('/user/updateGoodColor', cors(), authController.updateGoodColor);
router.post('/user/updateBadColor', cors(), authController.updateBadColor);

//update dark/light mode
router.post('/user/lightDarkMode', cors(), authController.updateMode);


//FINANCE

//get the user's predicted and spent budget
router.get('/finance/budget', cors(), financeController.budgetStub);

//get the user's recent income transactions
router.get('/finance/income', cors(), financeController.incomeStub);

//get the user's recent expense transactions
router.get('/finance/expense', cors(), financeController.expenseStub);

//get the user's predicted and spent total
router.get('/finance/total', cors(), financeController.totalStub);

//insert new transaction 
router.post('/transaction/newTransaction', cors(), financeController.insertTransaction);

module.exports = router;
