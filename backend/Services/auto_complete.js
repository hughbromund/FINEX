const fs = require('fs');

const filepath = '../stock_list/nasdaq_list.csv'
const nasdaq_list = (fs.readFileSync(filepath))
    .toString()
    .replace(/['"]+/g, '')
    .split('\n')
    .map(line => line.split(',', 2))
    .map(line => Object.values(line));
console.log(nasdaq_list);

console.log(auto_complete("AAIT"));
//parses nasdaq file into JSON data format
//source: https://stackoverflow.com/questions/49616609/javascript-node-js-search-and-return-lines-that-contain-a-string-in-a-file


function auto_complete(search_term) {
    let lines = nasdaq_list.filter(function (e) { 
        console.log(typeof(e[1]));
        if (typeof(e[0]) !== undefined && typeof(e[1]) !== undefined) {
            return e[0].includes(search_term) || 
            e[1].includes(search_term);
        }
        return false;
      
    });
    
    
    
    //let results = JSON.parse(lines);

    return lines;
}