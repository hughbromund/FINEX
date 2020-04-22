const fs = require("fs");
const path = require("path");

//crypto list for Alpha Vantage from: https://notebooks.ai/santiagobasulto/alpha-vantage-cryptos-live-docs-36d7bb5f
const nasdaqFile = "../lists/nasdaq_list.csv";
const cryptoFile = "../lists/digital_currency_list.csv";

//parses nasdaq file into array
//source: https://stackoverflow.com/questions/49616609/javascript-node-js-search-and-return-lines-that-contain-a-string-in-a-file
const nasdaqList = fs
  .readFileSync(path.resolve(__dirname, nasdaqFile))
  .toString()
  .replace(/['"\r]+/g, "")
  .split("\n")
  .map((line) => line.split(",", 2))
  .map((line) => Object.values(line))
  .filter(function (e) {
    if (e[1] !== undefined) {
      return true;
    }
    return false;
  });

//parses crypto file into array
const cryptoList = fs
  .readFileSync(path.resolve(__dirname, cryptoFile))
  .toString()
  .replace(/['"\r]+/g, "")
  .split("\n")
  .map((line) => line.split(",", 2))
  .map((line) => Object.values(line))
  .filter(function (e) {
    if (e[1] !== undefined) {
      return true;
    }
    return false;
  });

//manually test functionality
//console.log(auto_complete('aapl'));

//returns first 5 stocks with matching symbols/names. exact match symbol comes first
exports.stockAutoComplete = async function (searchTerm) {
  if (searchTerm == "") {
    let lines = [...nasdaqList];
    return lines.splice(0, 5);
  }
  console.log(nasdaqList.length);
  const searchLower = searchTerm.toLowerCase();

  //filters all stocks which contain the searched term
  let lines = nasdaqList.filter(function (e) {
    return (
      e[0].toLowerCase().includes(searchLower) ||
      e[1].toLowerCase().includes(searchLower)
    );
  });

  //if search matches stock symbol, place on top of list
  for (lineNum = 0; lineNum < lines.length; lineNum++) {
    if (lines[lineNum][0].toLowerCase() == searchLower) {
      foundLine = lines[lineNum];
      lines.splice(lineNum, 1);
      lines.unshift(foundLine);
      break;
    }
  }

  //get first 5 results
  lines = lines.splice(0, Math.min(5, lines.length));

  return lines;
};

exports.cryptoAutoComplete = async function (searchTerm) {
  if (searchTerm == "") {
    let lines = [...cryptoList];
    return lines.splice(0, 5);
  }
  console.log(cryptoList.length);
  const searchLower = searchTerm.toLowerCase();

  //filters all cryptos which contain the searched term
  let lines = cryptoList.filter(function (e) {
    return (
      e[0].toLowerCase().includes(searchLower) ||
      e[1].toLowerCase().includes(searchLower)
    );
  });

  //if search matches crypto symbol, place on top of list
  for (lineNum = 0; lineNum < lines.length; lineNum++) {
    if (lines[lineNum][0].toLowerCase() == searchLower) {
      foundLine = lines[lineNum];
      lines.splice(lineNum, 1);
      lines.unshift(foundLine);
      break;
    }
  }

  //get first 5 results
  lines = lines.splice(0, Math.min(5, lines.length));

  return lines;
};
