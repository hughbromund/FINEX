var auto_complete_service = require('../Services/auto_complete.js')

exports.getAutoComplete = async function (req, res, next) {
    var stocks = await auto_complete_service.cryptoAutoComplete(req.params.input);
    return res.json(stocks);
}
exports.getAutoCompleteEmpty = async function (req, res, next) {
    var stocks = await auto_complete_service.cryptoAutoComplete("");
    return res.json(stocks);
}