const alpha = require('alphavantage')({ key: 'PIL8EASGF14AB1M6' });
const User = require('../database/models/user');
const StockSim = require('../database/models/stocksim');

exports.helloWorld = async function () {
    return { "Hello": "World" };
}

//This has "realtime" data on a 1 minute interval
exports.getStockIntraday = async function (code) {
    console.log("sp");
    return alpha.data.intraday(code).then(data => {
        return alpha.util.polish(data).data;
    });
}

//This returns data for each day going back as long as we want
exports.getStockDaily = async function (code) {
    return alpha.data.daily(code).then(data => {
        return alpha.util.polish(data).data;
    });
}


//ANALYTICS

//This returns data for SMA (simple moving average) based on the interval provided
exports.getSMA = async function (code, interval, series_type) {
    let numInterval;
    if (interval === "intraday") {
        numInterval = "1min";
    } else {
        numInterval = "daily";
    }

    return alpha.technical.sma(code, numInterval, 50, series_type).then(data => {
        return alpha.util.polish(data).data;
    });
}

//This returns data for EMA (exponential moving average) based on the interval provided
exports.getEMA = async function (code, interval, series_type) {
    let numInterval;
    if (interval === "intraday") {
        numInterval = "1min";
    } else {
        numInterval = "daily";
    }

    return alpha.technical.ema(code, numInterval, 50, series_type).then(data => {
        return alpha.util.polish(data).data;
    });
}

//This returns data for RSI (relative strength index) based on the interval provided
exports.getRSI = async function (code, interval, series_type) {
    let numInterval;
    if (interval === "intraday") {
        numInterval = "1min";
    } else {
        numInterval = "daily";
    }

    return alpha.technical.rsi(code, numInterval, 14, series_type).then(data => {
        return alpha.util.polish(data).data;
    });
}

//This returns data for bbands (Bollinger Bands) based on the interval provided
exports.getBbands = async function (code, interval, series_type) {
    let numInterval;
    if (interval === "intraday") {
        numInterval = "1min";
    } else {
        numInterval = "daily";
    }

    return alpha.technical.bbands(code, numInterval, 20, series_type, 2, 2).then(data => {
        return alpha.util.polish(data).data;
    });
}

//This returns data for EMA (moving average convergence / divergence) based on the interval provided
exports.getMACD = async function (code, interval, series_type) {
    let numInterval;
    if (interval === "intraday") {
        numInterval = "1min";
    } else {
        numInterval = "daily";
    }

    return alpha.technical.macd(code, numInterval, series_type, 12, 26, 9).then(data => {
        return alpha.util.polish(data).data;
    });
}

//add a stock ID to the user's stock array
exports.addStockToUser = async function (req) {
    return await User.updateOne({ username: req.user.username }, { $addToSet: { stocks: req.body.stock_id } },
        (err, user) => { }).exec();
}

//remove a stock ID from the user's stock array
exports.removeStockFromUser = async function (req) {
    return await User.updateOne({ username: req.user.username }, { $pull: { stocks: req.body.stock_id } },
        (err, user) => { }).exec();
}

//get all stock IDs for a given user
exports.getStocks = async function (req) {
    return await User.findOne({ username: req.user.username },
        {
          _id: 0,
          stocks: 1
        }, (err, user) => {}).exec()
}


//stock sim functions
exports.createPortfolio = async function (req) {

    let foundPortfolio = await StockSim.findOne({ username: req.user.username}, (err, user) => {}).exec();

    if (foundPortfolio != null) {
        return {
            "status": 400,
            "message": "Portfolio already created."
        }
    }

    const newPortfolio = new StockSim({
        username: req.user.username,
        wallet: 5000,
        stocks: [],
    })
    //save user in database
    await newPortfolio.save((err, savedPortfolio) => {});
    return {
        "status": 200,
        "message": "success!"
    }

}


exports.getPortfolio = async function (req) {
    let foundPortfolio = await StockSim.findOne({ username: req.user.username}, (err, user) => {}).exec();

    let stocks = foundPortfolio.stocks

    let investing = 0;

    for (let index = 0; index < stocks.length; index++) {
        let stockData = await alpha.data.intraday(stocks[index].code).then(data => {
            return alpha.util.polish(data).data;
        });
    
        //console.log(stockData)
        //console.log(stockData[Object.keys(stockData)[0]].open)
    
        let stockPrice = stockData[Object.keys(stockData)[0]].open;

        stocks[index].price = stockPrice;
        stocks[index].value = stockPrice * stocks[index].quantity;
        investing += stocks[index].value
    }

    if (foundPortfolio == null) {
        return {
            "status": 400,
            "message": "Portfolio not created!"
        }
    }
    return {
        "status": 200,
        "wallet": foundPortfolio.wallet,
        "investing": investing,
        "stocks": stocks
    }

}


exports.buyStock = async function (req) {
    const {code, quantity} = req.body;

    let foundPortfolio = await StockSim.findOne({ username: req.user.username}, (err, user) => {}).exec();

    let stocks = foundPortfolio.stocks
    let found = false;

    for (let index = 0; index < stocks.length; index++) {
        if (code == stocks[index].code) {
            stocks[index].quantity = quantity + stocks[index].quantity;
            found = true;
        }
    }
    if (!found) {
        stocks.push({
            "code": code,
            "quantity": quantity
        })
    }
    //insert getting price of stock code
    let newWallet = foundPortfolio.wallet

    let stockData = await alpha.data.intraday(code).then(data => {
        return alpha.util.polish(data).data;
    });

    //console.log(stockData)
    //console.log(stockData[Object.keys(stockData)[0]].open)

    let stockPrice = stockData[Object.keys(stockData)[0]].open;
    let cost = stockPrice * quantity;
    newWallet -= cost;

    if (newWallet < 0) {
        return {
            "status": 400,
            "message": "not enough money"
        }
    }

    StockSim.updateOne({username: req.user.username}, {stocks: stocks, wallet: newWallet}, (err, user) => {}).exec();
    //remove money from wallet, if not enough then dont update database
    
    //insert getting price of stock code

    return {
        "status" : 200,
        "message" : "Successfully bought for $" + cost
    }

}

exports.sellStock = async function (req) {
    const {code, quantity} = req.body;

    let foundPortfolio = await StockSim.findOne({ username: req.user.username}, (err, user) => {}).exec();

    let stocks = foundPortfolio.stocks
    let found = false;
    console.log(stocks)

    for (let index = 0; index < stocks.length; index++) {

        if (code == stocks[index].code) {
            found = true;

            if (quantity > stocks[index].quantity) {
                return {
                    "status": 400,
                    "message": "You only own " + stocks[index].quantity + " shares of " + code
                }
            }
            else if (quantity == stocks[index].quantity) {
                //stocks.spice(index, 1)
                //delete stocks.index;

                stocks = stocks.filter( (stock) => {stock.code != code})
                //console.log(stocks)
            }
            else {
                stocks[index].quantity -= quantity;         
            }
        }
    }
    if (!found) {
        return {
            "status": 400,
            "message": code + " not found in portfolio"
        }
    }

    let newWallet = foundPortfolio.wallet

    let stockData = await alpha.data.intraday(code).then(data => {
        return alpha.util.polish(data).data;
    });

    //console.log(stockData)
    //console.log(stockData[Object.keys(stockData)[0]].open)

    let stockPrice = stockData[Object.keys(stockData)[0]].open;
    let value = stockPrice * quantity;

    newWallet += value;

    StockSim.updateOne({username: req.user.username}, {stocks: stocks, wallet: newWallet}, (err, user) => {}).exec();

    return {
        "status" : 200,
        "message" : "Successfully sold for $" + value
    }
}