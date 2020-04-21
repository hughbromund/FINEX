import React, { Component } from "react";
import Card from "react-bootstrap/Card";
import CardGroup from "react-bootstrap/CardGroup";
import Jumbotron from "react-bootstrap/Jumbotron";
import ListGroup from "react-bootstrap/ListGroup";
import Container from "react-bootstrap/Container";
import history from "../../routing/History";
import { YOUR_STOCKS_PATH } from "../../constants/Constants";
import { DarkModeContext } from "../../contexts/DarkModeContext";

import classes from "./InvestmentTactics.module.css";

class InvestmentTactics extends Component {
  render() {
    return (
      <div
        className={
          this.context.isDarkMode ? classes.wrapperDark : classes.wrapperLight
        }
      >
        <Container>
          <div>
            <Jumbotron
              className={this.context.isDarkMode ? "bg-dark" : "bg-light"}
            >
              <h1>Investment Strategy</h1>
              <p>
                Once you've made the choice to start investing your money, it's
                important to think about what you're going to put your money to
                work. A sound investment strategy is the cornerstone of a good
                portfolio.
              </p>
            </Jumbotron>
          </div>
          <div>
            <CardGroup>
              <Card
                className={this.context.isDarkMode ? "bg-dark" : "bg-light"}
              >
                <Card.Body>
                  <Card.Title>Sector Investing</Card.Title>
                  <Card.Text>
                    If you're an expert in a given field or keyed into how a
                    certain market works, this strategy might be for you. Famous
                    investors, such as Michael Burry, focus on certain sectors
                    such as water, and work hard to understand the market.
                  </Card.Text>
                </Card.Body>
                <Card.Footer>
                  <ListGroup>
                    <ListGroup.Item
                      action
                      variant={this.context.isDarkMode ? "dark" : "light"}
                      onClick={() => history.push(YOUR_STOCKS_PATH + "/YORW")}
                    >
                      York Water
                    </ListGroup.Item>
                    <ListGroup.Item
                      action
                      variant={this.context.isDarkMode ? "dark" : "light"}
                      onClick={() => history.push(YOUR_STOCKS_PATH + "/WTRG")}
                    >
                      Aqua America
                    </ListGroup.Item>
                    <ListGroup.Item
                      action
                      variant={this.context.isDarkMode ? "dark" : "light"}
                      onClick={() => history.push(YOUR_STOCKS_PATH + "/AWK")}
                    >
                      American Water Works
                    </ListGroup.Item>
                    <ListGroup.Item
                      action
                      variant={this.context.isDarkMode ? "dark" : "light"}
                      onClick={() => history.push(YOUR_STOCKS_PATH + "/SBS")}
                    >
                      SABESP
                    </ListGroup.Item>
                    <ListGroup.Item
                      action
                      variant={this.context.isDarkMode ? "dark" : "light"}
                      onClick={() => history.push(YOUR_STOCKS_PATH + "/SJW")}
                    >
                      SJW Group
                    </ListGroup.Item>
                  </ListGroup>
                </Card.Footer>
              </Card>
              <Card
                className={this.context.isDarkMode ? "bg-dark" : "bg-light"}
              >
                <Card.Body>
                  <Card.Title>Conservative Portfolio</Card.Title>
                  <Card.Text>
                    A conservative approach to investing focuses more on
                    fixed-income securities and bonds, as opposed to more
                    volatile stocks and equities. This type of strategy helps
                    protect investors from volatility and risk.
                  </Card.Text>
                </Card.Body>
                <Card.Footer>
                  <ListGroup>
                    <ListGroup.Item
                      action
                      variant={this.context.isDarkMode ? "dark" : "light"}
                      onClick={() => history.push(YOUR_STOCKS_PATH + "/RHT")}
                    >
                      Red Hat Inc.
                    </ListGroup.Item>
                    <ListGroup.Item
                      action
                      variant={this.context.isDarkMode ? "dark" : "light"}
                      onClick={() => history.push(YOUR_STOCKS_PATH + "/WMT")}
                    >
                      Walmart Inc.
                    </ListGroup.Item>
                    <ListGroup.Item
                      action
                      variant={this.context.isDarkMode ? "dark" : "light"}
                      onClick={() => history.push(YOUR_STOCKS_PATH + "/SYY")}
                    >
                      Sysco Corp.
                    </ListGroup.Item>
                    <ListGroup.Item
                      action
                      variant={this.context.isDarkMode ? "dark" : "light"}
                      onClick={() => history.push(YOUR_STOCKS_PATH + "/EVRG")}
                    >
                      Everegy Inc.
                    </ListGroup.Item>
                    <ListGroup.Item
                      action
                      variant={this.context.isDarkMode ? "dark" : "light"}
                      onClick={() => history.push(YOUR_STOCKS_PATH + "/WU")}
                    >
                      Western Union Company
                    </ListGroup.Item>
                  </ListGroup>
                </Card.Footer>
              </Card>
              <Card
                className={this.context.isDarkMode ? "bg-dark" : "bg-light"}
              >
                <Card.Body>
                  <Card.Title>Moderately Aggressive Portfolio</Card.Title>
                  <Card.Text>
                    A moderately aggressive approach to investing is the most
                    common approach among the average investors. It revloves
                    around a majority of funds being invested in stocks with
                    some diversification among bonds and fixed-income
                    securities.
                  </Card.Text>
                </Card.Body>
                <Card.Footer>
                  <ListGroup>
                    <ListGroup.Item
                      action
                      variant={this.context.isDarkMode ? "dark" : "light"}
                      onClick={() => history.push(YOUR_STOCKS_PATH + "/NVDA")}
                    >
                      Nvidia Corp.
                    </ListGroup.Item>
                    <ListGroup.Item
                      action
                      variant={this.context.isDarkMode ? "dark" : "light"}
                      onClick={() => history.push(YOUR_STOCKS_PATH + "/M")}
                    >
                      Macy's Inc.
                    </ListGroup.Item>
                    <ListGroup.Item
                      action
                      variant={this.context.isDarkMode ? "dark" : "light"}
                      onClick={() => history.push(YOUR_STOCKS_PATH + "/AMD")}
                    >
                      Advanced Micro Devices Inc.
                    </ListGroup.Item>
                    <ListGroup.Item
                      action
                      variant={this.context.isDarkMode ? "dark" : "light"}
                      onClick={() => history.push(YOUR_STOCKS_PATH + "/NKTR")}
                    >
                      Nektar Therapeutics
                    </ListGroup.Item>
                    <ListGroup.Item
                      action
                      variant={this.context.isDarkMode ? "dark" : "light"}
                      onClick={() => history.push(YOUR_STOCKS_PATH + "/RMD")}
                    >
                      ResMed Inc.
                    </ListGroup.Item>
                  </ListGroup>
                </Card.Footer>
              </Card>
            </CardGroup>
          </div>
        </Container>
      </div>
    );
  }
}

InvestmentTactics.contextType = DarkModeContext;
export default InvestmentTactics;
