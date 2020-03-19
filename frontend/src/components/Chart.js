// Code from example on https://codesandbox.io/s/github/rrag/react-stockcharts-examples2/tree/master/examples/LineAndScatterChartGrid

import React from "react";
import {
  getData,
  getCryptoData,
  getCryptoIntradayData,
  getIntradayData
} from "./ChartUtils/ChartUtils";

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
    this.setState({
      ticker: this.props.symbol,
      header: "",
      isCrypto: this.props.isCrypto,
      daily: this.props.isDaily
    });

    let myData;

    if (this.props.isDaily) {
      if (!this.props.isCrypto) {
        myData = await getData(this.props.symbol).catch(err => {
          console.log("Stock not found for chart.");
        });
      } else {
        myData = await getCryptoData(this.props.symbol).catch(err => {
          console.log("Stock not found for chart.");
        });
      }
    } else {
      if (!this.props.isCrypto) {
        myData = await getIntradayData(this.props.symbol).catch(err => {
          console.log("Stock not found for chart.");
        });
      } else {
        myData = await getCryptoIntradayData(this.props.symbol).catch(err => {
          console.log("Stock not found for chart.");
        });
      }
    }
    console.log(myData);
    this.setState({
      data: myData
    });
  }
  render() {
    if (this.state == null) {
      return <div>Loading...</div>;
    } else if (this.state.data == null || this.state.data[0]["date"] == null) {
      return <div>Loading...</div>;
    }
    return (
      <div>
        <h1>{this.state.visible}</h1>
        <StockChart type="svg" data={this.state.data} />
      </div>
    );
  }
}
