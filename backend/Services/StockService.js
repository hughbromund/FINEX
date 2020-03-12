const alpha = require('alphavantage')({ key: '204HFII8A4KASQYO' });

exports.helloWorld = async function () {
    return {"Hello": "World"};
}

//This has "realtime" data on a 1 minute interval
exports.getStockIntraday = async function (code) {
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

    return alpha.technical.sma(code, numInterval, 10, series_type).then(data => {
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

    return alpha.technical.ema(code, numInterval, 10, series_type).then(data => {
        return alpha.util.polish(data).data;
    });
}