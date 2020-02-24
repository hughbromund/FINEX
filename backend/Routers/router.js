var express = require('express');
var request = require('request');
var router = express.Router();

var stockController = require('../Controllers/stock_controller');
var user_controller = require('../Controllers/user_controller');

const passport = require('../passport');


router.use(function timeLog(req, res, next) {
  console.log('Time: ', Date.now());
  next();
});

router.get('/hi', stockController.getHello);
router.get('/api/stock/auto/:input', stockController.get_auto_complete);


router.post('/', user_controller.signup);
router.post('/login', passport.authenticate('local'), user_controller.login);
router.post('/logout', user_controller.logout);



router.get('/', user_controller.user);


module.exports = router; 