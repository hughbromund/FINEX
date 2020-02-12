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

export function getData() {
  // This is where we will need to pull from the backend to get the required csv
  const promiseMSFT = fetch(
    "https://cdn.rawgit.com/rrag/react-stockcharts/master/docs/data/MSFT.tsv"
  )
    .then(response => response.text())
    .then(data => tsvParse(data, parseData(parseDate)));
  return promiseMSFT;
}
