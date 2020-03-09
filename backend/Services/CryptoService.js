const alpha = require('alphavantage')({ key: '204HFII8A4KASQYO' });

//This returns data for each day going back as long as we want
exports.getCryptoDaily = async function (code) {
    return alpha.crypto.daily(code, 'USD').then(data => {
        return alpha.util.polish(data);
    });
}

//This returns data for each week going back as long as we want
exports.getCryptoWeekly = async function (code) {
    return alpha.crypto.weekly(code, 'USD').then(data => {
        return alpha.util.polish(data);
    });
}