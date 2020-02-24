var express = require('express');
var request = require('request');
var router = express.Router();
const cors = require('cors');

var stockController = require('../Controllers/stock_controller')

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

module.exports = router;