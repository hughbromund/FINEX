var stockService = require('../Services/stock_service')    

exports.getHello = async function (req, res, next) {
    // Validate request parameters
    
    var result = await stockService.HelloWorld();
    return res.json(result);
    /*
    try {
        var users = await UserService.getUsers({}, page, limit)
        return res.status(200).json({ status: 200, data: users, message: "Succesfully Users Retrieved" });
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
     */
}