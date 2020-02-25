var express = require('express');
var request = require('request');
var router = express.Router();
const cors = require('cors');

var stockController = require('../Controllers/stock_controller');
var authController = require('../Controllers/auth_controller');

const passport = require('../passport');


router.use(function timeLog(req, res, next) {
  console.log('Time: ', Date.now());
  next();
});

//test endpoint
router.get('/hi', cors(), stockController.getHello);

//autofill search list endpoint
router.get('/api/stock/auto/:input', cors(), stockController.get_auto_complete);

//retrieve stock intraday data endpoint
router.get('/api/stock/intraday/:code', cors(), stockController.get_stock_intraday);

//retrieve stock daily data endpoint
router.get('/api/stock/daily/:code', cors(), stockController.get_stock_daily);


//router.post('/', user_controller.signup);
//router.post('/login', passport.authenticate('local'), user_controller.login);
//router.post('/logout', user_controller.logout);
//router.get('/', user_controller.user);

//register account
router.post('/auth/register', cors(), authController.register);

//login account
router.post('/auth/login', cors(), passport.authenticate('local'), authController.login);

//logout account
router.post('/auth/logout', cors(), authController.logout);

//get username of logged in account
router.get('/auth/username', cors(), authController.user);

module.exports = router;
