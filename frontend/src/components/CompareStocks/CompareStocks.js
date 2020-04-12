import React, { Component } from "react";
import StockInfo from "../StockInfo";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

class CompareStocks extends Component {
  state = {};
  render() {
    return (
      <div>
        <Container>
          <Row>
            <Col lg>
              Col1
              {/* <StockInfo symbol="AAPL"></StockInfo> */}
            </Col>
            <Col>
              Col2
              {/* <StockInfo symbol="MSFT"></StockInfo> */}
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default CompareStocks;
