var autoCompleteService = require('../Services/AutoCompleteService.js')
var cryptoService = require('../Services/CryptoService.js')  


//autocompletes the search bar for crypto
exports.getAutoComplete = async function (req, res, next) {
    var cryptos = await autoCompleteService.cryptoAutoComplete(req.params.input);
    return res.json(cryptos);
}

//handles case where nothing is entered in the search bar
exports.getAutoCompleteEmpty = async function (req, res, next) {
    var cryptos = await autoCompleteService.cryptoAutoComplete("");
    return res.json(cryptos);
}

// function to validate, get, and return alpha vantage daily crypto info
exports.getCryptoDaily = async function (req, res, next) {
    try {
        let crypto = await cryptoService.getCryptoDaily(req.params.code);
        return res.status(200).json(crypto);
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
}

// function to validate, get, and return alpha vantage weekly crypto info
exports.getCryptoWeekly = async function (req, res, next) {
    try {
        let crypto = await cryptoService.getCryptoWeekly(req.params.code);
        return res.status(200).json(crypto);
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
}