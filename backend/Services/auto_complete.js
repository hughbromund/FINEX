const fs = require('fs');

const filepath = '../stock_list/nasdaq_list.csv'

//parses nasdaq file into list
//source: https://stackoverflow.com/questions/49616609/javascript-node-js-search-and-return-lines-that-contain-a-string-in-a-file
const nasdaq_list = (fs.readFileSync(filepath))
    .toString()
    .replace(/['"]+/g, '')
    .split('\n')
    .map(line => line.split(',', 2))
    .map(line => Object.values(line));

console.log(auto_complete("bur"));

//returns all matching stock symbols or names
function auto_complete(search_term) {
    const search_lower = search_term.toLowerCase();

    let lines = nasdaq_list.filter(function (e) {//filters all stocks which contain the searched term
        if (e[1] !== undefined) { //fix by removing undefined from list
            return e[0].toLowerCase().includes(search_lower) || 
            e[1].toLowerCase().includes(search_lower);
        }
        return false;
    });

    return lines;
}