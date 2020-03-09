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

//STUBS

//new transaction stub, todo testing
router.post('/transaction_stub/new', cors(), transactionController.insertTransaction);

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


//FINANCE

router.get('/finance/budget', cors(), financeController.budgetStub);
router.get('/finance/income', cors(), financeController.incomeStub);
router.get('/finance/expense', cors(), financeController.expenseStub);
router.get('/finance/total', cors(), financeController.totalStub);

module.exports = router;
