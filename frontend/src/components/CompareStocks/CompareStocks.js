import React, { Component } from "react";
import StockInfo from "../StockInfo/StockInfo";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { GET_FOLLOWED_STOCKS_URL } from "../../constants/Constants";
import classes from "./CompareStocks.module.css";

class CompareStocks extends Component {
  state = {
    leftTicker: "AAPL",
    rightTicker: "MSFT",
    followedStocks: [],
  };

  constructor(props) {
    super(props);

    this.handleLeftTickerChange = this.handleLeftTickerChange.bind(this);
    this.handleRightTickerChange = this.handleRightTickerChange.bind(this);
  }

  componentDidMount() {
    this.getFollowedStocks();
    console.log(this.state);
  }

  getFollowedStocks = async () => {
    console.log(GET_FOLLOWED_STOCKS_URL);
    let response;
    response = await fetch(GET_FOLLOWED_STOCKS_URL);
    const body = await response.json();
    console.log(body);

    if (response.status === 200) {
      // console.log("false");
      this.setState({ followedStocks: body["stocks"] });
      if (body["stocks"].indexOf(this.state.stockSymbol) === -1) {
        this.setState({ following: false });
      } else {
        this.setState({ following: true });
      }
    }
  };

  handleLeftTickerChange = (event) => {
    this.setState({ leftTicker: event.target.value });
  };

  handleRightTickerChange = (event) => {
    this.setState({ rightTicker: event.target.value });
  };

  renderDropdown = (number, change, val) => {
    let stocksArr = [];
    for (let i = 0; i < this.state.followedStocks.length; i++) {
      stocksArr[i] = <option key={i}>{this.state.followedStocks[i]}</option>;
    }

    console.log(stocksArr);

    return (
      <Form.Group>
        <Form.Label>Stock {number}</Form.Label>
        <Form.Control as="select" onChange={change} value={val}>
          {stocksArr}
        </Form.Control>
      </Form.Group>
    );
  };

  render() {
    return (
      <div
        className={
          this.context.isDarkMode ? classes.wrapperDark : classes.wrapperLight
        }
      >
        <Container fluid>
          <Row>
            <div style={{ width: "50%" }}>
              {this.renderDropdown(
                1,
                this.handleLeftTickerChange,
                this.state.leftTicker
              )}
              <StockInfo
                key="1"
                symbol={this.state.leftTicker}
                hideFollowed
              ></StockInfo>
            </div>
            <div style={{ width: "50%" }}>
              {this.renderDropdown(
                2,
                this.handleRightTickerChange,
                this.state.rightTicker
              )}
              <StockInfo
                symbol={this.state.rightTicker}
                hideFollowed
              ></StockInfo>
            </div>
          </Row>
          {/* <Row>
            Currently, {this.state.leftTicker} is outperforming{" "}
            {this.state.rightTicker}
          </Row> */}
        </Container>
      </div>
    );
  }
}

export default CompareStocks;
