const alpha = require('alphavantage')({ key: 'PIL8EASGF14AB1M6' });

//This returns data for each day going back as long as we want
exports.getCryptoDaily = async function (code) {
    return alpha.crypto.daily(code, 'USD').then(data => {
        return modifyJSON(data);
    });
}

//This returns data for each week going back as long as we want
exports.getCryptoWeekly = async function (code) {
    return alpha.crypto.weekly(code, 'USD').then(data => {
        return modifyJSON(data);
    });
}

//helper function to take care of the key modification
function modifyJSON(data) {
    let polished = alpha.util.polish(data).data;
    for (curr in polished) {
        delete polished[curr].market_open;
        delete polished[curr].market_high;
        delete polished[curr].market_low;
        delete polished[curr].market_close;
        delete polished[curr].cap;
    }
    let str = JSON.stringify(polished);
    str = str.replace("\"usd_open\":", "\"open\":");
    str = str.replace("\"usd_high\":", "\"high\":");
    str = str.replace("\"usd_low\":", "\"low\":");
    str = str.replace("\"usd_close\":", "\"close\":");
    polished = JSON.parse(str);
    return polished;
}