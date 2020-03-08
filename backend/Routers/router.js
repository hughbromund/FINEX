var express = require('express');
var request = require('request');
var router = express.Router();
const cors = require('cors');

var stockController = require('../Controllers/stock_controller');
var cryptoController = require('../Controllers/CryptoController');
var authController = require('../Controllers/auth_controller');
var financeController = require('../Controllers/financeController');

const passport = require('../passport');


router.use(function timeLog(req, res, next) {
  console.log('Time: ', Date.now());
  next();
});

//test endpoint
router.get('/hi', cors(), stockController.getHello);

//autofill search list endpoint
router.get('/api/stock/auto/:input', cors(), stockController.get_auto_complete);
router.get('/api/stock/auto/', cors(), stockController.get_auto_complete_empty);

router.get('/api/crypto/auto/:input', cors(), cryptoController.getAutoComplete);
router.get('/api/crypto/auto/', cors(), cryptoController.getAutoCompleteEmpty);


//retrieve stock intraday data endpoint
router.get('/api/stock/intraday/:code', cors(), stockController.get_stock_intraday);

//retrieve stock daily data endpoint
router.get('/api/stock/daily/:code', cors(), stockController.get_stock_daily);


//router.post('/', user_controller.signup);
//router.post('/login', passport.authenticate('local'), user_controller.login);
//router.post('/logout', user_controller.logout);
//router.get('/', user_controller.user);


//STUBS

//register account stub
router.post('/auth_stub/register', cors(), authController.register_stub);

//login account stub
router.post('/auth_stub/login', cors(), authController.login_stub);

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
router.get('/finance/transaction', cors(), financeController.transactionStub);
router.get('/finance/total', cors(), financeController.totalStub);

module.exports = router;
