import React, { Component } from "react";
import {
  LOGIN_PATH,
  USER_INFO_URL,
  GET_PORTFOLIO_URL,
  CREATE_PORTFOLIO_URL,
  YOUR_STOCKS_PATH,
} from "../../constants/Constants";
import history from "../../routing/History";
import { Jumbotron, Button, Table } from "react-bootstrap";
import { DarkModeContext } from "../../contexts/DarkModeContext";
import classes from "./StocksPage.module.css";

class StocksPage extends Component {
  state = {
    isLoggedIn: null,
    portfolio: null,
  };

  componentDidMount = () => {
    this.callAuthAPI().catch((err) => {
      console.log(err);
    });

    this.getPortfolio().catch((err) => {
      console.log(err);
    });
  };

  /**
   * Checks to make sure the client trying to access
   * the page is a logged in user.
   */
  callAuthAPI = async () => {
    console.log(USER_INFO_URL);
    let response;
    response = await fetch(USER_INFO_URL);
    // const body = await response.json();
    // console.log(body.status);

    if (response.status !== 200) {
      // console.log("false");
      this.setState({ isLoggedIn: false });
    } else {
      // console.log("true");
      this.setState({ isLoggedIn: true });
    }
  };

  /**
   * Get the portfolio information
   * via a backend call.
   */
  getPortfolio = async () => {
    console.log(GET_PORTFOLIO_URL);
    let response;
    response = await fetch(GET_PORTFOLIO_URL);
    const body = await response.json();
    console.log(body);

    if (response.status == 200) {
      // console.log("false");
      this.setState({ portfolio: body });
    }
  };

  createPortfolio = async () => {
    fetch(CREATE_PORTFOLIO_URL, {
      method: "POST",
      withCredentials: true,
      // headers: {
      //   "Content-Type": "application/json",
      // },
      // body: JSON.stringify({ good_color: newGoodColor }),
    });

    let defaultPortfolio = {
      status: 200,
      wallet: 4000,
      investing: 1000,
      stocks: [],
    };

    this.setState({ portfolio: defaultPortfolio });
  };

  renderStockTable = () => {
    let dataArr = this.state.portfolio["stocks"];
    let tableArr = [];

    tableArr.push(
      <tr key={"header"}>
        <th>Stock</th>
        <th>Shares</th>
        <th>Current Price</th>
        <th>Purchase Price</th>
        <th>Current Value</th>
        <th>Purchase Value</th>
      </tr>
    );

    for (let i = 0; i < dataArr.length; i++) {
      tableArr.push(
        <tr
          key={i}
          onClick={() => {
            history.push(
              YOUR_STOCKS_PATH + "/" + dataArr[i]["code"].toUpperCase()
            );
          }}
        >
          <td>{dataArr[i]["code"].toUpperCase()}</td>
          <td>{dataArr[i]["quantity"]}</td>
          <td>{"$" + parseFloat(dataArr[i]["price"]).toFixed(2)}</td>
          <td>{"$" + parseFloat(dataArr[i]["price"]).toFixed(2)}</td>
          <td>{"$" + parseFloat(dataArr[i]["value"]).toFixed(2)}</td>
          <td>{"$" + parseFloat(dataArr[i]["value"]).toFixed(2)}</td>
        </tr>
      );
    }

    return (
      <Table responsive hover variant={this.context.isDarkMode ? "dark" : ""}>
        <tbody>{tableArr}</tbody>
      </Table>
    );
  };

  render() {
    if (this.state.isLoggedIn != null && !this.state.isLoggedIn) {
      history.push(LOGIN_PATH);
      return null;
    } else if (this.state.isLoggedIn == null) {
      return <h1>Loading...</h1>;
    } else if (
      this.state.portfolio == null ||
      this.state.portfolio == undefined
    ) {
      return (
        <div className={classes.jumboWrapper}>
          <Jumbotron
            className={this.context.isDarkMode ? "bg-dark" : "bg-light"}
          >
            <h1>No Portfolio Found</h1>
            <p>
              It seems you haven't made a portfolio as of yet, click the button
              below to create a simulated portfolio. Start with $5000 and try
              and make as much as you can!
            </p>
            <Button variant="success" onClick={this.createPortfolio}>
              Create Portfolio
            </Button>
          </Jumbotron>
        </div>
      );
    } else {
      return (
        <div className={classes.wrapper}>
          <div className={classes.investmentDiv}>
            <div>
              <h1>Simulated Portfolio:</h1>
            </div>
            <div className={classes.contentWrapper}>
              <div>
                <h3>
                  {"Remaining Money: $" +
                    this.state.portfolio["wallet"].toFixed(2)}
                </h3>
              </div>
              <div>
                <h3>
                  {"Invested Money: $" +
                    this.state.portfolio["investing"].toFixed(2)}
                </h3>
              </div>
              <div className={classes.table}>{this.renderStockTable()}</div>
            </div>
          </div>
        </div>
      );
    }
  }
}

StocksPage.contextType = DarkModeContext;
export default StocksPage;
