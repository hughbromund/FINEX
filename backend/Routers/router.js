var express = require('express');
var request = require('request');
var router = express.Router();

var stockController = require('../Controllers/stock_controller')

router.use(function timeLog(req, res, next) {
  console.log('Time: ', Date.now());
  next();
});

router.get('/hi', stockController.getHello);

module.exports = router;