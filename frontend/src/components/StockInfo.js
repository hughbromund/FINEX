import React, { Component } from "react";
import classes from "./StockInfo.module.css";
import Chart from "./Chart";
import {
  YOUR_STOCKS_PATH,
  STOCK_DAILY_URL,
  CRYPTO_EXTENSION,
  CRYPTO_DAILY_URL
} from "../constants/Constants";
import history from "../routing/History";

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
    isValid: true
  };

  /**
   * Gets stock information from backend.
   */
  componentDidMount = () => {
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

    // TODO: call backend based on path on load
    this.callDataAPI(searchedSymbol).catch(err => {
      console.log(err);
      history.push("/stocknotfound");
      this.setState({ isValid: false });
    });
    searchedSymbol = searchedSymbol.toUpperCase();
    this.setState({ stockSymbol: searchedSymbol });
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

    console.log(body);

    let tmpOpen = "No Data";
    let tmpHigh = "No Data";
    let tmpLow = "No Data";
    let tmpClose = "No Data";
    let tmpVol = "No Data";

    let dateStr = this.getCurrentDate();
    let key = dateStr + "T00:00:00.000Z";

    console.log("KEY: " + key);

    console.log(body[key]);

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

  render() {
    return (
      <div className={classes.wrapper}>
        <div className={classes.title}>{this.state.stockSymbol}</div>
        {this.state.stockSymbol != null && this.state.isValid == true ? (
          <Chart
            isCrypto={this.state.isCrypto}
            symbol={this.state.stockSymbol}
          />
        ) : null}
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
      </div>
    );
  }
}

export default StockInfo;
