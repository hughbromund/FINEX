var stockService = require('../Services/StockService')  
var autoCompleteService = require('../Services/AutoCompleteService.js')  

exports.getHello = async function (req, res, next) {
    var result = await stockService.helloWorld();
    res.json(result);
}

//STOCK PRICES

// function to validate, get, and return alpha vantage intraday stock info
exports.getStockIntraday = async function (req, res, next) {
    try {
        let stock = await stockService.getStockIntraday(req.params.code);
        return res.status(200).json(stock);
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
}

// function to validate, get, and return alpha vantage daily stock info
exports.getStockDaily = async function (req, res, next) {
    try {
        let stock = await stockService.getStockDaily(req.params.code);
        return res.status(200).json(stock);
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
}

//ANALYTICS

// function to validate, get, and return alpha vantage sma stock info
exports.getSMA = async function (req, res, next) {
    let check = verifyAnalyticsParameters(req.params.code, req.params.interval, req.params.series_type);
    if (check) {
        return res.status(400).json({ status: 400, message: check });
    }

    try {
        let stock = await stockService.getSMA(req.params.code, req.params.interval, req.params.series_type);
        return res.status(200).json(stock);
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
}

// function to validate, get, and return alpha vantage ema stock info
exports.getEMA = async function (req, res, next) {
    let check = verifyAnalyticsParameters(req.params.code, req.params.interval, req.params.series_type);
    if (check) {
        return res.status(400).json({ status: 400, message: check });
    }

    try {
        let stock = await stockService.getEMA(req.params.code, req.params.interval, req.params.series_type);
        return res.status(200).json(stock);
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
}

// function to validate, get, and return alpha vantage RSI stock info
exports.getRSI = async function (req, res, next) {
    let check = verifyAnalyticsParameters(req.params.code, req.params.interval, req.params.series_type);
    if (check) {
        return res.status(400).json({ status: 400, message: check });
    }

    try {
        let stock = await stockService.getRSI(req.params.code, req.params.interval, req.params.series_type);
        return res.status(200).json(stock);
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
}

// function to validate, get, and return alpha vantage Bbands stock info
exports.getBbands = async function (req, res, next) {
    let check = verifyAnalyticsParameters(req.params.code, req.params.interval, req.params.series_type);
    if (check) {
        return res.status(400).json({ status: 400, message: check });
    }

    try {
        let stock = await stockService.getBbands(req.params.code, req.params.interval, req.params.series_type);
        return res.status(200).json(stock);
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
}

// function to validate, get, and return alpha vantage MACd stock info
exports.getMACD = async function (req, res, next) {
    let check = verifyAnalyticsParameters(req.params.code, req.params.interval, req.params.series_type);
    if (check) {
        return res.status(400).json({ status: 400, message: check });
    }

    try {
        let stock = await stockService.getMACD(req.params.code, req.params.interval, req.params.series_type);
        return res.status(200).json(stock);
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
}

// helper function to verify the parameters for analytics endpoints
function verifyAnalyticsParameters(code, interval, series_type) {
    //check interval
    if (interval !== "intraday" && interval !== "daily") {
        return interval + " is not a valid interval.";
    }

    //check series_type
    if (series_type !== "open" && series_type !== "close" && series_type !== "high" && series_type !== "low") {
        return series_type + " is not a valid series_type.";
    }
    return;
}

//autocompletes the search bar.
//TODO - add error catch
exports.getAutoComplete = async function (req, res, next) {
    var stocks = await autoCompleteService.stockAutoComplete(req.params.input);
    return res.json(stocks);
}

//handles case where nothing is entered in the search bar
exports.getAutoCompleteEmpty = async function (req, res, next) {
    var stocks = await autoCompleteService.stockAutoComplete("");
    return res.json(stocks);
}

//adds given stock ID to user's stock array
exports.addStockToUser = async function (req, res, next) {
    const { stock_id } = req.body;
    if ( stock_id == null ) {
        res.status(400).json({status: "stock id not passed!"})
    }
    else if (req.user) {
        try {
            let result = await stockService.addStockToUser(req);
            //console.log(result)
            res.status(200).json({status: "stock added"})
        }
        catch(e) {
            res.status(400).json({status: "An error occured."})
        }
        
    }
    else {
        res.status(400).json({status: "No user logged in."})
    }
}

//removed given stock ID to user's stock array
exports.removeStockFromUser = async function (req, res, next) {
    const { stock_id } = req.body;
    if ( stock_id == null ) {
        res.status(400).json({status: "stock id not passed!"})
    }
    else if (req.user) {
        try {
            let result = await stockService.removeStockFromUser(req);
            //console.log(result)
            res.status(200).json({status: "stock removed"})
        }
        catch(e) {
            res.status(400).json({status: "An error occured."})
        }
        
    }
    else {
        res.status(400).json({status: "No user logged in."})
    }
}