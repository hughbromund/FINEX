var stockService = require('../Services/stock_service')  
var auto_complete_service = require('../Services/auto_complete.js')  

exports.getHello = async function (req, res, next) {
    // Validate request parameters
    
    var result = await stockService.HelloWorld();
    return res.json(result);
    /*
    try {
        var users = await UserService.getUsers({}, page, limit)
        return res.status(200).json({ status: 200, data: users, message: "Succesfully Users Retrieved" });
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
     */
}

// function to validate, get, and return alpha vantage stock info
exports.get_stock = async function (req, res, next) {
    try {
        let stock = await stockService.get_stock(req.params.code)
        return res.json(stock);
        //return res.status(200).json({ status: 200, data: stock, message: "Stock Retrieved" });
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
}

exports.get_auto_complete = async function (req, res, next) {
    var stocks = await auto_complete_service.auto_complete(req.params.input);
    return res.json(stocks);
}