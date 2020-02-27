// Code from example on https://codesandbox.io/s/github/rrag/react-stockcharts-examples2/tree/master/examples/LineAndScatterChartGrid

import React from "react";
import { getData } from "./ChartUtils/ChartUtils";

import StockChart from "./ChartUtils/StockChart";

export default class Chart extends React.Component {
  async componentDidMount() {
    // getData().then(data => {
    //   this.setState({ data });
    // });

    var myData = await getData();
    console.log(myData);
    this.setState({ data: myData });
  }
  render() {
    if (this.state == null) {
      return <div>Loading...</div>;
    }
    return <StockChart type="svg" data={this.state.data} />;
  }
}
