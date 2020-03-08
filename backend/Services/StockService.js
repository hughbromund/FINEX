const alpha = require('alphavantage')({ key: '204HFII8A4KASQYO' });

exports.helloWorld = async function () {
    return {"Hello": "World"};
}

//This has "realtime" data on a 1 minute interval
exports.getStockIntraday = async function (code) {
    return alpha.data.intraday(code).then(data => {
        return alpha.util.polish(data);
    });
}

//This returns data for each day going back as long as we want
exports.getStockDaily = async function (code) {
    return alpha.data.daily(code).then(data => {
        return alpha.util.polish(data);
    });
}