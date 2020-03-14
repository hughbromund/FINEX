// Code from example on https://codesandbox.io/s/github/rrag/react-stockcharts-examples2/tree/master/examples/LineAndScatterChartGrid

import React from "react";
import { getData } from "./ChartUtils/ChartUtils";

import StockChart from "./ChartUtils/StockChart";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Image from "react-bootstrap/Image";
import InputGroup from "react-bootstrap/InputGroup";

export default class Chart extends React.Component {
  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleTickerChange = this.handleTickerChange.bind(this);
  }

  async handleSubmit(event) {
    event.preventDefault();
    var myData = await getData(this.state.ticker);
    console.log(myData);
    this.setState({ data: myData, visible: this.state.ticker });
  }

  handleTickerChange(event) {
    this.setState({ ticker: event.target.value });
  }

  async componentDidMount() {
    // getData().then(data => {
    //   this.setState({ data });
    // });

    console.log(this.props.symbol);

    var myData = await getData(this.props.symbol).catch(err => {
      console.log("Stock not found for chart.");
    });
    console.log(myData);
    this.setState({ data: myData, ticker: this.props.symbol, header: "" });
  }
  render() {
    if (this.state == null) {
      return <div>Loading...</div>;
    } else if (this.state.data[0]["date"] == null) {
      return <div>No data found</div>;
    }
    return (
      <div>
        <h1>{this.state.visible}</h1>
        <StockChart type="svg" data={this.state.data} />
      </div>
    );
  }
}
