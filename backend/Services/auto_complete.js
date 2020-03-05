const fs = require('fs');


//crypto list for Alpha Vantage from: https://notebooks.ai/santiagobasulto/alpha-vantage-cryptos-live-docs-36d7bb5f
const nasdaqFile = '../backend/lists/nasdaq_list.csv'
const cryptoFile = '../backend/lists/digital_currency_list.csv'


//parses nasdaq file into array
//source: https://stackoverflow.com/questions/49616609/javascript-node-js-search-and-return-lines-that-contain-a-string-in-a-file
const nasdaq_list = (fs.readFileSync(nasdaqFile))
    .toString()
    .replace(/['"\r]+/g, '')
    .split('\n')
    .map(line => line.split(',', 2))
    .map(line => Object.values(line))
    .filter(function (e) {
        if (e[1] !== undefined) {
            return true;
        }
        return false;
    });

const cryptoList = (fs.readFileSync(cryptoFile))
    .toString()
    .replace(/['"\r]+/g, '')
    .split('\n')
    .map(line => line.split(',', 2))
    .map(line => Object.values(line))
    .filter(function (e) {
        if (e[1] !== undefined) {
            return true;
        }
        return false;
    });

//manually test functionality
//console.log(auto_complete('aapl'));


//returns first 5 stocks with matching symbols/names. exact match symbol comes first
exports.stockAutoComplete = async function (search_term) {
    if (search_term == "") {
        let lines = [...nasdaq_list];
        return lines.splice(0, 5);
    }
    console.log(nasdaq_list.length);
    const search_lower = search_term.toLowerCase();

    //filters all stocks which contain the searched term
    let lines = nasdaq_list.filter(function (e) {
        return e[0].toLowerCase().includes(search_lower) || 
        e[1].toLowerCase().includes(search_lower);
    });
    
    //if search matches stock symbol, place on top of list
    for (line_num = 0; line_num < lines.length; line_num++) {
        if (lines[line_num][0].toLowerCase() == search_lower) {
            found_line = lines[line_num];
            lines.splice(line_num, 1);
            lines.unshift(found_line);
            break;
        }
    }
    
    //get first 5 results
    lines = lines.splice(0, Math.min(5, lines.length)); 
    
    return lines;
}

exports.cryptoAutoComplete = async function (search_term) {
    if (search_term == "") {
        let lines = [...cryptoList];
        return lines.splice(0, 5);
    }
    console.log(cryptoList.length);
    const search_lower = search_term.toLowerCase();

    //filters all stocks which contain the searched term
    let lines = cryptoList.filter(function (e) {
        return e[0].toLowerCase().includes(search_lower) || 
        e[1].toLowerCase().includes(search_lower);
    });
    
    //if search matches stock symbol, place on top of list
    for (line_num = 0; line_num < lines.length; line_num++) {
        if (lines[line_num][0].toLowerCase() == search_lower) {
            found_line = lines[line_num];
            lines.splice(line_num, 1);
            lines.unshift(found_line);
            break;
        }
    }
    
    //get first 5 results
    lines = lines.splice(0, Math.min(5, lines.length)); 
    
    return lines;
}