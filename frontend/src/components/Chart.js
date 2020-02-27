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

    var myData = await getData("MSFT");
    console.log(myData);
    this.setState({ data: myData, ticker: "", header: "" });
  }
  render() {
    if (this.state == null) {
      return <div>Loading...</div>;
    }
    return (
      <div>
        <h1>{this.state.visible}</h1>
        <StockChart type="svg" data={this.state.data} />
        <Form style={{ width: "50rem" }} onSubmit={this.handleSubmit}>
          <Form.Group controlId="validationCustomUsername">
            <Form.Label>Ticker</Form.Label>
            <InputGroup>
              <Form.Control
                type="text"
                placeholder="Ticker"
                required
                value={this.state.ticker}
                onChange={this.handleTickerChange}
              />
            </InputGroup>
          </Form.Group>
          <Button data-testid="submit" variant="success" type="submit">
            Submit
          </Button>
        </Form>
      </div>
    );
  }
}
