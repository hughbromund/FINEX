import React, { Component } from "react";
import classes from "./StockInfo.module.css";
import Chart from "./Chart";
import { Button, ButtonGroup } from "react-bootstrap";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import {
  YOUR_STOCKS_PATH,
  STOCK_DAILY_URL,
  CRYPTO_EXTENSION,
  CRYPTO_DAILY_URL,
  USER_INFO_URL,
  FOLLOW_STOCK_URL,
  UNFOLLOW_STOCK_URL,
  GET_FOLLOWED_STOCKS_URL
} from "../constants/Constants";
import history from "../routing/History";
import { DarkModeContext } from "../contexts/DarkModeContext";

/**
 * This page displays a chart and other basic information about a stock.
 *
 * Code snippets from:
 * https://reacttraining.com/react-router/web/guides/quick-start
 * https://stackoverflow.com/questions/23593052/format-javascript-date-as-yyyy-mm-dd
 */
class StockInfo extends Component {
  state = {
    stockSymbol: null,
    open: "Loading...",
    close: "Loading...",
    high: "Loading...",
    low: "Loading...",
    volume: "Loading...",
    isCrypto: false,
    isValid: true,
    daily: true,
    isLoggedIn: false,
    following: false,
    followedStocks: []
  };

  /**
   * Gets stock information from backend.
   */
  componentDidMount = () => {
    this.callAuthAPI().catch(err => {
      console.log(err);
    });

    let currPath = this.props.location.pathname;
    if (currPath.includes(CRYPTO_EXTENSION)) {
      this.state.isCrypto = true;
    } else {
      this.state.isCrypto = false;
    }

    let pathLength;
    let searchedSymbol;
    if (!this.state.isCrypto) {
      pathLength = (YOUR_STOCKS_PATH + "/").length;
      searchedSymbol = currPath.slice(pathLength);
    } else {
      pathLength = (YOUR_STOCKS_PATH + CRYPTO_EXTENSION).length;
      searchedSymbol = currPath.slice(pathLength);
    }

    this.callDataAPI(searchedSymbol).catch(err => {
      console.log(err);
      history.push("/stocknotfound");
      this.setState({ isValid: false });
    });
    searchedSymbol = searchedSymbol.toUpperCase();
    this.setState({ stockSymbol: searchedSymbol });

    this.getFollowedStocks().catch(err => {
      console.log(err);
    });
  };

  /**
   * Makes a call to backend requesting stock data based on
   * input provided.
   */
  callDataAPI = async symbol => {
    console.log(STOCK_DAILY_URL + symbol);
    let response;

    if (!this.state.isCrypto) {
      response = await fetch(STOCK_DAILY_URL + symbol);
    } else {
      response = await fetch(CRYPTO_DAILY_URL + symbol);
    }

    const body = await response.json();

    // console.log(body);

    let tmpOpen = "No Data";
    let tmpHigh = "No Data";
    let tmpLow = "No Data";
    let tmpClose = "No Data";
    let tmpVol = "No Data";

    let dateStr = this.getCurrentDate();
    let key = dateStr + "T00:00:00.000Z";

    // console.log("KEY: " + key);

    // console.log(body[key]);

    if (body[key] != undefined) {
      tmpOpen = "$" + parseFloat(body[key]["open"]).toFixed(2);
      tmpHigh = "$" + parseFloat(body[key]["high"]).toFixed(2);
      tmpLow = "$" + parseFloat(body[key]["low"]).toFixed(2);
      tmpClose = "$" + parseFloat(body[key]["close"]).toFixed(2);
      tmpVol = body[key]["volume"];
    }

    this.setState({ open: tmpOpen });
    this.setState({ high: tmpHigh });
    this.setState({ low: tmpLow });
    this.setState({ close: tmpClose });
    this.setState({ volume: tmpVol });

    return body;
  };

  callAuthAPI = async () => {
    console.log(USER_INFO_URL);
    let response;
    response = await fetch(USER_INFO_URL);
    const body = await response.json();
    // console.log(body.status);

    if (response.status != 200) {
      // console.log("false");
      this.setState({ isLoggedIn: false });
    } else {
      // console.log("true");
      this.setState({ isLoggedIn: true });
    }
  };

  followStock = async () => {
    console.log(FOLLOW_STOCK_URL);
    var response = await fetch(FOLLOW_STOCK_URL, {
      method: "POST",
      body: JSON.stringify({ stock_id: this.state.stockSymbol }),
      headers: {
        "content-type": "application/json"
      }
    });

    if (response.status === 200) {
      // console.log("Success");
      this.setState({ following: true });
    }

    this.getFollowedStocks().catch(err => {
      console.log(err);
    });
  };

  unfollowStock = async () => {
    console.log(UNFOLLOW_STOCK_URL);
    var response = await fetch(UNFOLLOW_STOCK_URL, {
      method: "POST",
      body: JSON.stringify({ stock_id: this.state.stockSymbol }),
      headers: {
        "content-type": "application/json"
      }
    });

    if (response.status === 200) {
      // console.log("Success");
      this.setState({ following: false });
    }

    this.getFollowedStocks().catch(err => {
      console.log(err);
    });
  };

  getFollowedStocks = async () => {
    console.log(GET_FOLLOWED_STOCKS_URL);
    let response;
    response = await fetch(GET_FOLLOWED_STOCKS_URL);
    const body = await response.json();
    console.log(body);

    if (response.status == 200) {
      // console.log("false");
      this.setState({ followedStocks: body["stocks"] });
      if (body["stocks"].indexOf(this.state.stockSymbol) == -1) {
        this.setState({ following: false });
      } else {
        this.setState({ following: true });
      }
    }
  };

  /**
   * Returns current date in the format yyyy-mm-dd.
   */
  getCurrentDate = () => {
    let d = new Date();
    let month = "" + (d.getMonth() + 1);
    let day = "" + d.getDate();
    let year = d.getFullYear();

    if (month.length < 2) {
      month = "0" + month;
    }
    if (day.length < 2) {
      day = "0" + day;
    }

    return [year, month, day].join("-");
  };

  renderChart = () => {
    if (this.state == null) {
      return;
    } else {
      return <Chart symbol={this.state.stockSymbol} />;
    }
  };

  renderFollowButton = () => {
    // console.log(this.state.isLoggedIn);

    if (this.state.isLoggedIn == true && !this.state.isCrypto) {
      // TODO: render unfollow if already following
      if (this.state.following) {
        return (
          <Button
            variant="danger"
            onClick={this.unfollowStock}
            className={classes.followButton}
          >
            Unfollow
          </Button>
        );
      } else {
        return (
          <Button
            variant="success"
            onClick={this.followStock}
            className={classes.followButton}
          >
            Follow
          </Button>
        );
      }
    }
    return (
      <div>
        <OverlayTrigger
          overlay={
            <Tooltip id="tooltip-disabled">
              Login or search for a stock to follow!
            </Tooltip>
          }
          placement="right"
        >
          <span>
            <Button
              variant="success"
              disabled
              className={classes.followButtonDisabled}
            >
              Follow
            </Button>
          </span>
        </OverlayTrigger>
      </div>
    );
  };

  renderFollowedStocks = () => {
    if (!this.state.isLoggedIn) {
      return;
    }

    let stocksArr = [];
    for (let i = 0; i < this.state.followedStocks.length; i++) {
      stocksArr[i] = (
        <Button
          key={i}
          variant={this.context.isDarkMode ? "outline-light" : "outline-dark"}
          className={classes.followedStockButton}
          onClick={() => {
            history.push(YOUR_STOCKS_PATH + "/" + this.state.followedStocks[i]);
            // this.setState({ stockSymbol: this.state.followedStocks[i] });
            window.location.reload();
          }}
        >
          {this.state.followedStocks[i]}
        </Button>
      );
    }

    return (
      <div
        className={
          this.context.isDarkMode
            ? classes.followedStocksWrapperDark
            : classes.followedStocksWrapperLight
        }
      >
        <div className={classes.followedTitle}> Followed Stocks: </div>
        {stocksArr}
      </div>
    );
  };

  render() {
    return (
      <div
        className={
          this.context.isDarkMode ? classes.wrapperDark : classes.wrapperLight
        }
      >
        <div className={classes.infoHeader}>
          <div className={classes.title}>{this.state.stockSymbol}</div>
          <div className={classes.followButtonDiv}>
            {this.renderFollowButton()}
          </div>
        </div>
        {this.state.stockSymbol != null && this.state.isValid == true ? (
          this.state.daily ? (
            <Chart
              isCrypto={this.state.isCrypto}
              symbol={this.state.stockSymbol}
              isDaily={true}
            />
          ) : null
        ) : null}
        {this.state.stockSymbol != null && this.state.isValid == true ? (
          !this.state.daily ? (
            <Chart
              isCrypto={this.state.isCrypto}
              symbol={this.state.stockSymbol}
              isDaily={false}
            />
          ) : null
        ) : null}
        <ButtonGroup aria-label="Basic example">
          <Button
            variant="success"
            onClick={() => this.setState({ daily: true })}
          >
            Daily
          </Button>
          <Button
            variant="success"
            onClick={() => this.setState({ daily: false })}
          >
            Intraday
          </Button>
        </ButtonGroup>
        <div className={classes.infoTitle}>
          Daily Summary ({this.getCurrentDate()}):
        </div>
        <div className={classes.infoBox}>
          <div className={classes.headerColumn}>
            <p>Open:</p>
            <p>Close:</p>
            <p>High:</p>
            <p>Low:</p>
          </div>
          <div className={classes.dataColumn}>
            <p>{this.state.open}</p>
            <p>{this.state.close}</p>
            <p>{this.state.high}</p>
            <p>{this.state.low}</p>
          </div>
          <div className={classes.headerColumn}>
            <p>Volume:</p>
          </div>
          <div className={classes.dataColumn}>
            <p>{this.state.volume}</p>
          </div>
        </div>
        {this.renderFollowedStocks()}
      </div>
    );
  }
}

StockInfo.contextType = DarkModeContext;
export default StockInfo;
