var stockService = require('../Services/StockService')  
var auto_complete_service = require('../Services/AutoCompleteService.js')  

exports.getHello = async function (req, res, next) {
    // Validate request parameters
    
    var result = await stockService.HelloWorld();
    res.json(result);
    /*
    try {
        var users = await UserService.getUsers({}, page, limit)
        return res.status(200).json({ status: 200, data: users, message: "Succesfully Users Retrieved" });
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
     */
}

// function to validate, get, and return alpha vantage intraday stock info
exports.get_stock_intraday = async function (req, res, next) {
    try {
        let stock = await stockService.get_stock_intraday(req.params.code);
        return res.status(200).json({ status: 200, data: stock, message: "Stock Retrieved" });
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
}

// function to validate, get, and return alpha vantage daily stock info
exports.get_stock_daily = async function (req, res, next) {
    try {
        let stock = await stockService.get_stock_daily(req.params.code);
        return res.status(200).json({ status: 200, data: stock, message: "Stock Retrieved" });
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
}

//autocompletes the search bar.
//TODO - add error catch
exports.get_auto_complete = async function (req, res, next) {
    var stocks = await auto_complete_service.stockAutoComplete(req.params.input);
    return res.json(stocks);
}
exports.get_auto_complete_empty = async function (req, res, next) {
    var stocks = await auto_complete_service.stockAutoComplete("");
    return res.json(stocks);
}