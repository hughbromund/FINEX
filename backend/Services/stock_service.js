const alpha = require('alphavantage')({ key: '204HFII8A4KASQYO' });

exports.HelloWorld = async function () {
    return {"Hello": "World"};
}

//This has "realtime" data on a 1 minute interval
exports.get_stock_intraday = async function (code) {
    return alpha.data.intraday(code).then(data => {
        return data
    });
}

//This returns data for each day going back as long as we want
exports.get_stock_daily = async function (code) {
    return alpha.data.daily(code).then(data => {
        return data
    });
}