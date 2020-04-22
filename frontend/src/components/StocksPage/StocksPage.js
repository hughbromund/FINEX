import React, { Component } from "react";
import {
  LOGIN_PATH,
  USER_INFO_URL,
  GET_PORTFOLIO_URL,
  CREATE_PORTFOLIO_URL,
  YOUR_STOCKS_PATH,
} from "../../constants/Constants";
import history from "../../routing/History";
import { Jumbotron, Button, Table, Spinner } from "react-bootstrap";
import { DarkModeContext } from "../../contexts/DarkModeContext";
import classes from "./StocksPage.module.css";

class StocksPage extends Component {
  state = {
    isLoggedIn: null,
    portfolio: null,
    dataReceived: false,
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
    response = await fetch(USER_INFO_URL, {
      method: "GET",
      withCredentials: true,
      credentials: "include",
    });
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
    response = await fetch(GET_PORTFOLIO_URL, {
      method: "GET",
      withCredentials: true,
      credentials: "include",
    });
    const body = await response.json();
    console.log(body);

    if (response.status === 200) {
      // console.log("false");
      this.setState({ portfolio: body });
    }
    this.setState({ dataReceived: true });
  };

  createPortfolio = async () => {
    fetch(CREATE_PORTFOLIO_URL, {
      method: "POST",
      withCredentials: true,
      credentials: "include",
    });

    let defaultPortfolio = {
      status: 200,
      wallet: 5000,
      investing: 0,
      stocks: [],
    };

    this.setState({ portfolio: defaultPortfolio });
  };

  renderStockTable = () => {
    let dataArr = this.state.portfolio["stocks"];
    let tableArr = [];

    if (dataArr.length === 0) {
      return (
        <div className={classes.jumboWrapper}>
          <Jumbotron
            className={this.context.isDarkMode ? "bg-dark" : "bg-light"}
          >
            <h1>No Stocks Purchased</h1>
            <p>
              You haven't invested any of your money! Do some research on which
              stocks you want to buy and come back when you have.
            </p>
          </Jumbotron>
        </div>
      );
    }

    tableArr.push(
      <tr key={"header"}>
        <th>Stock</th>
        <th>Shares</th>
        <th>Purchase Price</th>
        <th>Current Price</th>
        <th>Purchase Value</th>
        <th>Current Value</th>
        <th>Percent Change</th>
      </tr>
    );

    for (let i = 0; i < dataArr.length; i++) {
      let totalChange =
        parseFloat(dataArr[i]["price"]) - parseFloat(dataArr[i]["buyPrice"]);
      let percentChange =
        (totalChange * 100.0) / parseFloat(dataArr[i]["buyPrice"]);

      let color = classes.none;

      if (totalChange > 0) {
        color = classes.green;
      }

      if (totalChange < 0) {
        color = classes.red;
      }

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
          <td>{"$" + parseFloat(dataArr[i]["buyPrice"]).toFixed(2)}</td>
          <td>{"$" + parseFloat(dataArr[i]["price"]).toFixed(2)}</td>
          <td>{"$" + parseFloat(dataArr[i]["buyValue"]).toFixed(2)}</td>
          <td>{"$" + parseFloat(dataArr[i]["value"]).toFixed(2)}</td>
          <td className={color}>{percentChange.toFixed(2) + "%"}</td>
        </tr>
      );
    }

    return (
      <Table responsive hover variant={this.context.isDarkMode ? "dark" : ""}>
        <tbody>{tableArr}</tbody>
      </Table>
    );
  };

  renderNetChange = () => {
    let change = (
      this.state.portfolio["wallet"] +
      this.state.portfolio["investing"] -
      5000.0
    ).toFixed(2);

    if (change < 0) {
      return (
        <div className={classes.netChange}>
          <h3>Net Loss: </h3>
          <h3 className={classes.red}>{"$" + Math.abs(change)}</h3>
        </div>
      );
    } else if (change > 0) {
      return (
        <div className={classes.netChange}>
          <h3 className={classes.red}>Net Gain: </h3>
          <h3>{"$" + Math.abs(change)}</h3>
        </div>
      );
    } else {
      return null;
    }
  };

  render() {
    if (this.state.isLoggedIn != null && !this.state.isLoggedIn) {
      history.push(LOGIN_PATH);
      return null;
    } else if (this.state.isLoggedIn == null || !this.state.dataReceived) {
      return <Spinner animation="border" variant="success" />;
    } else if (
      this.state.portfolio == null ||
      this.state.portfolio === undefined
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
              <div>
                <h3>
                  {"Total Portfolio Value: $" +
                    (
                      this.state.portfolio["investing"] +
                      this.state.portfolio["wallet"]
                    ).toFixed(2)}
                </h3>
              </div>
              {this.renderNetChange()}
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
