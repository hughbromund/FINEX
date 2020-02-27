// Code from example on https://codesandbox.io/s/github/rrag/react-stockcharts-examples2/tree/master/examples/LineAndScatterChartGrid

import { tsvParse } from "d3-dsv";
import { timeParse } from "d3-time-format";

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

const parseDate = timeParse("%Y-%m-%d");

export async function getData(ticker) {
  // This is where we will need to pull from the backend to get the required csv
  // const promiseMSFT = fetch("http://localhost:5000/api/stock/daily/MSFT")
  //   .then(response => {
  //     return response.text();
  //   })
  //   .then(data => tsvParse(data, parseData(parseDate)));
  // return promiseMSFT;

  const url = "http://localhost:5000/api/stock/daily/" + ticker;
  var response = await fetch(url, {
    method: "GET",
    withCredentials: true
  });
  console.log(response);
  var body = await response.json();
  console.log(body);
  var data = body["data"]["Time Series (Daily)"];
  console.log(data);
  // this.state.user = body.user.username
  var out = [];
  var j = 0;
  for (var key in data) {
    out[j] = {
      open: data[key]["1. open"],
      high: data[key]["2. high"],
      low: data[key]["3. low"],
      date: parseDate(key),
      close: data[key]["4. close"],
      volume: data[key]["5. volume"]
    };
    j++;
  }
  console.log(out);
  return out.reverse();
}
