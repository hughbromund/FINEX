const alpha = require('alphavantage')({ key: '204HFII8A4KASQYO' });

exports.HelloWorld = async function () {
    return {"Hello": "World"};
}

exports.get_stock = async function (code) {
    return alpha.data.intraday(code).then(data => {
        return data
    });
}