const alpha = require('alphavantage')({ key: '204HFII8A4KASQYO' });

exports.helloWorld = async function () {
    return {"Hello": "World"};
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