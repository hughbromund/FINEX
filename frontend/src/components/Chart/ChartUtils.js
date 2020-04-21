// Code from example on https://codesandbox.io/s/github/rrag/react-stockcharts-examples2/tree/master/examples/LineAndScatterChartGrid

// import { tsvParse } from "d3-dsv";
import { timeParse } from "d3-time-format";
import {
  CRYPTO_DAILY_URL,
  STOCK_DAILY_URL,
  CRYPTO_INTRADAY_URL,
  STOCK_INTRADAY_URL
} from "../../constants/Constants";
/*
function parseData(parse) {
  return function(d) {
    d.date = parse(d.date);
    d.open = +d.open;
    d.high = +d.high;
    d.low = +d.low;
    d.close = +d.close;
    d.volume = +d.volume;

    return d;
  };
}
*/

const parseDate = timeParse("%Y-%m-%d");

export async function getData(ticker) {
  // This is where we will need to pull from the backend to get the required csv
  // const promiseMSFT = fetch("http://localhost:5000/api/stock/daily/MSFT")
  //   .then(response => {
  //     return response.text();
  //   })
  //   .then(data => tsvParse(data, parseData(parseDate)));
  // return promiseMSFT;

  const url = STOCK_DAILY_URL + ticker;
  var response = await fetch(url, {
    method: "GET",
    withCredentials: true
  });
  console.log(response);
  var body = await response.json();
  console.log(body);
  var data = body;
  console.log(data);
  // this.state.user = body.user.username
  var out = [];
  var j = 0;
  for (var key in data) {
    out[j] = {
      open: data[key]["open"],
      high: data[key]["high"],
      low: data[key]["low"],
      date: parseDate(key.substring(0, key.indexOf("T"))),
      close: data[key]["close"],
      volume: data[key]["volume"]
    };
    j++;
  }
  console.log(out);
  return out.reverse();
}

export async function getIntradayData(ticker) {
  // This is where we will need to pull from the backend to get the required csv
  // const promiseMSFT = fetch("http://localhost:5000/api/stock/daily/MSFT")
  //   .then(response => {
  //     return response.text();
  //   })
  //   .then(data => tsvParse(data, parseData(parseDate)));
  // return promiseMSFT;

  const url = STOCK_INTRADAY_URL + ticker;
  var response = await fetch(url, {
    method: "GET",
    withCredentials: true
  });
  console.log(response);
  var body = await response.json();
  console.log(body);
  var data = body;
  console.log(data);
  // this.state.user = body.user.username
  var out = [];
  var j = 0;
  for (var key in data) {
    out[j] = {
      open: data[key]["open"],
      high: data[key]["high"],
      low: data[key]["low"],
      date: parseDate(key.substring(0, key.indexOf("T"))),
      close: data[key]["close"],
      volume: data[key]["volume"]
    };
    j++;
  }
  console.log(out);
  return out.reverse();
}

export async function getCryptoData(ticker) {
  const url = CRYPTO_DAILY_URL + ticker;
  var response = await fetch(url, {
    method: "GET",
    withCredentials: true
  });
  console.log(response);
  var body = await response.json();
  console.log(body);
  var data = body;
  console.log(data);
  // this.state.user = body.user.username
  var out = [];
  var j = 0;
  for (var key in data) {
    out[j] = {
      open: data[key]["open"] || data[key]["usd_open"],
      high: data[key]["high"] || data[key]["usd_high"],
      low: data[key]["low"] || data[key]["usd_low"],
      date: parseDate(key.substring(0, key.indexOf("T"))),
      close: data[key]["close"] || data[key]["usd_close"],
      volume: data[key]["volume"]
    };
    j++;
  }
  console.log(out);
  return out.reverse();
}

export async function getCryptoIntradayData(ticker) {
  const url = CRYPTO_INTRADAY_URL + ticker;
  var response = await fetch(url, {
    method: "GET",
    withCredentials: true
  });
  console.log(response);
  var body = await response.json();
  console.log(body);
  var data = body;
  console.log(data);
  // this.state.user = body.user.username
  var out = [];
  var j = 0;
  for (var key in data) {
    out[j] = {
      open: data[key]["open"] || data[key]["usd_open"],
      high: data[key]["high"] || data[key]["usd_high"],
      low: data[key]["low"] || data[key]["usd_low"],
      date: parseDate(key.substring(0, key.indexOf("T"))),
      close: data[key]["close"] || data[key]["usd_close"],
      volume: data[key]["volume"]
    };
    j++;
  }
  console.log(out);
  return out.reverse();
}
