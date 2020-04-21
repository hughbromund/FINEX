import React, { Component } from "react";
import classes from "./StockInfo.module.css";
import {
  Button,
  ButtonGroup,
  InputGroup,
  FormControl,
  Collapse,
  Alert,
} from "react-bootstrap";
import Chart from "../Chart/Chart";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import Popover from "react-bootstrap/Popover";
import Badge from "react-bootstrap/Badge";
import {
  YOUR_STOCKS_PATH,
  STOCK_DAILY_URL,
  CRYPTO_EXTENSION,
  CRYPTO_DAILY_URL,
  USER_INFO_URL,
  FOLLOW_STOCK_URL,
  UNFOLLOW_STOCK_URL,
  GET_FOLLOWED_STOCKS_URL,
  GET_BBANDS,
  GET_RSI,
  GET_EMA,
  GET_SMA,
  GET_MACD,
  GET_PORTFOLIO_URL,
  BUY_STOCK_URL,
  SELL_STOCK_URL,
} from "../../constants/Constants";
import {
  FacebookShareButton,
  FacebookIcon,
  TwitterShareButton,
  TwitterIcon,
  RedditShareButton,
  RedditIcon,
} from "react-share";
import history from "../../routing/History";
import { DarkModeContext } from "../../contexts/DarkModeContext";

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
    loadedDate: "Loading...",
    open: "Loading...",
    close: "Loading...",
    high: "Loading...",
    low: "Loading...",
    volume: "Loading...",
    bbands: "Loading...",
    ema: "Loading...",
    rsi: "Loading...",
    sma: "Loading...",
    macd: "Loading...",
    isCrypto: false,
    isValid: true,
    daily: true,
    isLoggedIn: false,
    following: false,
    followedStocks: [],
    shareURL: "finex.com",
    shareQuote: "I am following stocks using FINEX! Come join me!",
    hasPortfolio: false,
    buyShares: 0,
    sellShares: 0,
    alertBuy: false,
    alertSell: false,
    alertError: false,
  };

  /**
   * Gets stock information from backend.
   */
  componentDidMount = () => {
    this.callAuthAPI().catch((err) => {
      console.log(err);
    });

    let currPath;
    if (this.props.location == undefined) {
      currPath = "/AAPL";
    } else {
      currPath = this.props.location.pathname;
    }
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

    if (this.props.symbol != null) {
      searchedSymbol = this.props.symbol;
    }
    this.callDataAPI(searchedSymbol).catch((err) => {
      console.log(err);
      history.push("/stocknotfound");
      this.setState({ isValid: false });
    });
    searchedSymbol = searchedSymbol.toUpperCase();
    this.setState({ stockSymbol: searchedSymbol });

    this.getFollowedStocks().catch((err) => {
      console.log(err);
    });

    this.getDeepAnalytics(searchedSymbol);

    this.getPortfolio().catch((err) => {
      console.log(err);
    });
  };

  componentDidUpdate(prevProps) {
    if (this.props.symbol !== prevProps.symbol) {
      this.setState({ stockSymbol: this.props.symbol });
    }
  }

  getDeepAnalytics = async (symbol) => {
    var ending = symbol + "/";
    if (this.state.daily === true) {
      ending = ending + "daily/";
    } else {
      ending = ending + "intraday/";
    }
    const seriesType = "high";

    ending = ending + seriesType;

    // console.log(ending);

    // Get BBANDS
    console.log(GET_BBANDS + ending);
    var bbands_res = await fetch(GET_BBANDS + ending);
    var bbands_data = 0;
    if (bbands_res.status === 200) {
      const bbands = await bbands_res.json();

      for (var key in bbands) {
        bbands_data = bbands[key]["Real Middle Band"];
        // console.log(bbands[key]);
        break;
      }
    } else {
      bbands_data = "No Data";
    }

    // console.log(bbands);

    // Get EMA

    var ema_res = await fetch(GET_EMA + ending);
    var ema_data = 0;
    if (ema_res.status === 200) {
      const ema = await ema_res.json();

      for (var key in ema) {
        ema_data = ema[key]["EMA"];
        break;
      }
    } else {
      ema_data = "No Data";
    }

    // Get RSI

    var rsi_res = await fetch(GET_RSI + ending);
    var rsi_data = 0;
    if (rsi_res.status === 200) {
      const rsi = await rsi_res.json();
      for (var key in rsi) {
        rsi_data = rsi[key]["RSI"];
        break;
      }
    } else {
      rsi_data = "No Data";
    }

    // Get SMA

    var sma_res = await fetch(GET_SMA + ending);
    var sma_data = 0;
    if (sma_res.status === 200) {
      const sma = await sma_res.json();
      for (var key in sma) {
        sma_data = sma[key]["SMA"];
        break;
      }
    } else {
      sma_data = "No Data";
    }

    // Get MACD

    var macd_res = await fetch(GET_MACD + ending);
    var macd_data = 0;
    if (macd_res.status === 200) {
      const macd = await macd_res.json();
      for (var key in macd) {
        macd_data = macd[key]["MACD"];
        break;
      }
    } else {
      macd_data = "No Data";
    }

    this.setState({
      bbands: bbands_data,
      ema: ema_data,
      rsi: rsi_data,
      sma: sma_data,
      macd: macd_data,
    });
  };

  /**
   * Makes a call to backend requesting stock data based on
   * input provided.
   */
  callDataAPI = async (symbol) => {
    console.log(STOCK_DAILY_URL + symbol);
    let response;

    if (!this.state.isCrypto) {
      response = await fetch(STOCK_DAILY_URL + symbol);
    } else {
      response = await fetch(CRYPTO_DAILY_URL + symbol);
    }

    const body = await response.json();

    console.log(body);

    let key = "";
    for (let k in body) {
      key = k + "";
      break;
    }

    let tmpOpen = "No Data";
    let tmpHigh = "No Data";
    let tmpLow = "No Data";
    let tmpClose = "No Data";
    let tmpVol = "No Data";

    // let dateStr = this.getCurrentDate();
    // let key = dateStr + "T00:00:00.000Z";

    // console.log("KEY: " + key);

    // console.log(body[key]);

    if (body[key] !== undefined) {
      tmpOpen = "$" + parseFloat(body[key]["open"]).toFixed(2);
      tmpHigh = "$" + parseFloat(body[key]["high"]).toFixed(2);
      tmpLow = "$" + parseFloat(body[key]["low"]).toFixed(2);
      tmpClose = "$" + parseFloat(body[key]["close"]).toFixed(2);
      tmpVol = body[key]["volume"];
    }

    this.setState({ loadedDate: key.substring(0, 10) });
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

  followStock = async () => {
    console.log(FOLLOW_STOCK_URL);
    var response = await fetch(FOLLOW_STOCK_URL, {
      method: "POST",
      body: JSON.stringify({ stock_id: this.state.stockSymbol }),
      headers: {
        "content-type": "application/json",
      },
    });

    if (response.status === 200) {
      // console.log("Success");
      this.setState({ following: true });
    }

    this.getFollowedStocks().catch((err) => {
      console.log(err);
    });
  };

  unfollowStock = async () => {
    console.log(UNFOLLOW_STOCK_URL);
    var response = await fetch(UNFOLLOW_STOCK_URL, {
      method: "POST",
      body: JSON.stringify({ stock_id: this.state.stockSymbol }),
      headers: {
        "content-type": "application/json",
      },
    });

    if (response.status === 200) {
      // console.log("Success");
      this.setState({ following: false });
    }

    this.getFollowedStocks().catch((err) => {
      console.log(err);
    });
  };

  getFollowedStocks = async () => {
    console.log(GET_FOLLOWED_STOCKS_URL);
    let response;
    response = await fetch(GET_FOLLOWED_STOCKS_URL);
    const body = await response.json();
    // console.log(body);

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

  /**
   * Get the portfolio information
   * via a backend call.
   */
  getPortfolio = async () => {
    console.log(GET_PORTFOLIO_URL);
    let response;
    response = await fetch(GET_PORTFOLIO_URL);

    if (response.status == 200) {
      // console.log("false");
      this.setState({ hasPortfolio: true });
    }
  };

  renderChart = () => {
    if (this.state === null) {
      return;
    } else {
      return <Chart symbol={this.state.stockSymbol} />;
    }
  };

  buyStock = () => {
    fetch(BUY_STOCK_URL, {
      method: "POST",
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        code: this.state.stockSymbol,
        quantity: parseFloat(this.state.buyShares, 10),
      }),
    })
      .then((response) => {
        if (response.status === 200) {
          this.setState({ alertError: false });
          this.setState({ alertBuy: true });
          this.setState({ alertSell: false });
        } else {
          this.setState({ alertError: true });
          this.setState({ alertBuy: false });
          this.setState({ alertSell: false });
        }
      })
      .catch((err) => console.log(err));
  };

  sellStock = () => {
    fetch(SELL_STOCK_URL, {
      method: "POST",
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        code: this.state.stockSymbol,
        quantity: parseFloat(this.state.sellShares, 10),
      }),
    })
      .then((response) => {
        if (response.status === 200) {
          this.setState({ alertError: false });
          this.setState({ alertBuy: false });
          this.setState({ alertSell: true });
        } else {
          this.setState({ alertError: true });
          this.setState({ alertBuy: false });
          this.setState({ alertSell: false });
        }
      })
      .catch((err) => console.log(err));
  };

  handleBuyChange = (event) => {
    this.setState({ buyShares: event.target.value });
  };

  handleSellChange = (event) => {
    this.setState({ sellShares: event.target.value });
  };

  renderAlerts = () => {
    return (
      <div className={classes.alertDiv}>
        <Collapse in={this.state.alertBuy && this.state.buyShares > 0}>
          <div>
            <Alert
              variant="success"
              onClose={() => this.setState({ alertBuy: false })}
              dismissible
            >
              <Alert.Heading>Stock successfully bought!</Alert.Heading>
            </Alert>
          </div>
        </Collapse>
        <Collapse in={this.state.alertSell && this.state.sellShares > 0}>
          <div>
            <Alert
              variant="danger"
              onClose={() => this.setState({ alertSell: false })}
              dismissible
            >
              <Alert.Heading>Stock successfully sold!</Alert.Heading>
            </Alert>
          </div>
        </Collapse>
        <Collapse in={this.state.alertError}>
          <div>
            <Alert
              variant="danger"
              onClose={() => this.setState({ alertError: false })}
              dismissible
            >
              <Alert.Heading>
                Could not perform the requested operation!
              </Alert.Heading>
            </Alert>
          </div>
        </Collapse>
      </div>
    );
  };

  renderBuyAndSell = () => {
    if (!this.state.isLoggedIn || !this.state.hasPortfolio) {
      return null;
    } else {
      return (
        <div className={classes.buySellDiv}>
          <div className={classes.buySellField}>
            <InputGroup>
              <FormControl
                value={this.state.buyShares}
                type="number"
                placeholder="Shares"
                onChange={this.handleBuyChange}
              />
              <InputGroup.Append>
                <Button variant="success" onClick={() => this.buyStock()}>
                  Buy
                </Button>
              </InputGroup.Append>
            </InputGroup>
          </div>
          <div className={classes.buySellField}>
            <InputGroup>
              <FormControl
                value={this.state.sellShares}
                type="number"
                placeholder="Shares"
                onChange={this.handleSellChange}
              />
              <InputGroup.Append>
                <Button variant="danger" onClick={() => this.sellStock()}>
                  Sell
                </Button>
              </InputGroup.Append>
            </InputGroup>
          </div>
        </div>
      );
    }
  };

  renderFollowButton = () => {
    // console.log(this.state.isLoggedIn);

    if (this.state.isLoggedIn === true && !this.state.isCrypto) {
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
    const openPopover = (
      <Popover>
        <Popover.Title as="h3">Open</Popover.Title>
        <Popover.Content>
          <b>Open</b> represents the stock price at the open of the New York
          Stock Exchange. This is usually 9:30 AM EST.
        </Popover.Content>
      </Popover>
    );
    const closePopover = (
      <Popover>
        <Popover.Title as="h3">Close</Popover.Title>
        <Popover.Content>
          <b>Close</b> represents the stock price at the close of the New York
          Stock Exchange. This is usually 4:00 PM EST.
        </Popover.Content>
      </Popover>
    );
    const highPopover = (
      <Popover>
        <Popover.Title>High</Popover.Title>
        <Popover.Content>
          <b>High</b> represents the highest price the stock has been during the
          current days trading hours.
        </Popover.Content>
      </Popover>
    );
    const lowPopover = (
      <Popover>
        <Popover.Title>Low</Popover.Title>
        <Popover.Content>
          <b>Low</b> represents the lowest price the stock has been during the
          current days trading hours.
        </Popover.Content>
      </Popover>
    );
    const volumePopover = (
      <Popover>
        <Popover.Title>Volume</Popover.Title>
        <Popover.Content>
          <b>Volume</b> represents the total number of shares that have changed
          hands during the course of the current day.
        </Popover.Content>
      </Popover>
    );
    const smaPopover = (
      <Popover>
        <Popover.Title>
          SMA (<i>Simple Moving Average</i>)
        </Popover.Title>
        <Popover.Content>
          <b>SMA</b> shows the average price of an index over a period of time.
        </Popover.Content>
      </Popover>
    );
    const emaPopover = (
      <Popover>
        <Popover.Title>
          EMA (<i>Exponential Moving Average</i>)
        </Popover.Title>
        <Popover.Content>
          <b>EMA</b> shows the average price of an index over a period of time,
          but places a greater weight and significance on the most recent data
          points.
        </Popover.Content>
      </Popover>
    );
    const rsiPopover = (
      <Popover>
        <Popover.Title>
          RSI (<i>Relative Strength Index</i>)
        </Popover.Title>
        <Popover.Content>
          <b>RSI</b> measures the momentum of recent price changes. It ranges
          from 0-100 and at the low end signifies an index that is being
          oversold while at the high end signifies an overbought index.
        </Popover.Content>
      </Popover>
    );
    const bbandsPopover = (
      <Popover>
        <Popover.Title>Bollinger Bands</Popover.Title>
        <Popover.Content>
          <b>Bollinger Bands</b> are two lines, above and below the index plot,
          that expand when the index is volatile and contract when it is less
          volatile. They can be used to measure where the market will be headed,
          but not necessarily when, or with what severity it will occur.
        </Popover.Content>
      </Popover>
    );
    const macdPopover = (
      <Popover>
        <Popover.Title>
          MACD (<i>Moving Average Convergence / Divergence</i>)
        </Popover.Title>
        <Popover.Content>
          <b>MACD</b> shows momentum in an index. Positive momentum signifies
          continued gains while negative momentum signifies the opposite.
        </Popover.Content>
      </Popover>
    );

    return (
      <div
        className={
          this.context.isDarkMode ? classes.wrapperDark : classes.wrapperLight
        }
        key={this.state.stockSymbol}
      >
        <div className={classes.infoHeader}>
          <div className={classes.title}>{this.state.stockSymbol}</div>
          <div
            hidden={this.props.hideFollowed}
            className={classes.followButtonDiv}
          >
            {this.renderFollowButton()}
          </div>
          {this.renderBuyAndSell()}
          <FacebookShareButton
            url={this.state.shareURL}
            quote={this.state.shareQuote}
          >
            <FacebookIcon size={32} round />
          </FacebookShareButton>
          <TwitterShareButton
            url={this.state.shareURL}
            quote={this.state.shareQuote}
          >
            <TwitterIcon size={32} round />
          </TwitterShareButton>
          <RedditShareButton
            url={this.state.shareURL}
            quote={this.state.shareQuote}
          >
            <RedditIcon size={32} round />
          </RedditShareButton>
        </div>
        {this.renderAlerts()}
        {this.state.stockSymbol !== null && this.state.isValid === true ? (
          this.state.daily ? (
            <Chart
              isCrypto={this.state.isCrypto}
              symbol={this.state.stockSymbol}
              isDaily={true}
            />
          ) : null
        ) : null}
        {this.state.stockSymbol !== null && this.state.isValid === true ? (
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
          &nbsp;
          <Button
            variant="success"
            onClick={() => this.setState({ daily: false })}
          >
            Intraday
          </Button>
        </ButtonGroup>
        <div className={classes.infoTitle}>
          Daily Summary ({this.state.loadedDate}):
        </div>
        <div className={classes.infoBox}>
          <div className={classes.headerColumn}>
            <p>
              <OverlayTrigger
                trigger="click"
                placement="top"
                overlay={openPopover}
              >
                <Badge>Open:</Badge>
              </OverlayTrigger>
            </p>
            <p>
              <OverlayTrigger
                trigger="click"
                placement="top"
                overlay={closePopover}
              >
                <Badge>Close:</Badge>
              </OverlayTrigger>
            </p>
            <p>
              <OverlayTrigger
                trigger="click"
                placement="top"
                overlay={highPopover}
              >
                <Badge>High:</Badge>
              </OverlayTrigger>
            </p>
            <p>
              <OverlayTrigger
                trigger="click"
                placement="top"
                overlay={lowPopover}
              >
                <Badge>Low:</Badge>
              </OverlayTrigger>
            </p>
            <p>
              <OverlayTrigger
                trigger="click"
                placement="top"
                overlay={volumePopover}
              >
                <Badge>Volume:</Badge>
              </OverlayTrigger>
            </p>
          </div>
          <div className={classes.dataColumn}>
            <p>{this.state.open}</p>
            <p>{this.state.close}</p>
            <p>{this.state.high}</p>
            <p>{this.state.low}</p>
            <p>{this.state.volume}</p>
          </div>
          <div className={classes.headerColumn}>
            <p>
              <Badge variant="warning" pill>
                <b>FINEX</b> Deep Analysis Data
              </Badge>
            </p>
            <p>
              <OverlayTrigger
                trigger="click"
                placement="top"
                overlay={smaPopover}
              >
                <Badge variant="warning" pill>
                  SMA
                </Badge>
              </OverlayTrigger>
            </p>
            <p>
              <OverlayTrigger
                trigger="click"
                placement="top"
                overlay={emaPopover}
              >
                <Badge variant="warning" pill>
                  EMA
                </Badge>
              </OverlayTrigger>
            </p>
            <p>
              <OverlayTrigger
                trigger="click"
                placement="top"
                overlay={rsiPopover}
              >
                <Badge variant="warning" pill>
                  RSI
                </Badge>
              </OverlayTrigger>
            </p>
            <p>
              <OverlayTrigger
                trigger="click"
                placement="top"
                overlay={bbandsPopover}
              >
                <Badge variant="warning" pill>
                  Bollinger Bands
                </Badge>
              </OverlayTrigger>
            </p>
            <p>
              <OverlayTrigger
                trigger="click"
                placement="top"
                overlay={macdPopover}
              >
                <Badge variant="warning" pill>
                  MACD
                </Badge>
              </OverlayTrigger>
            </p>
          </div>
          <div className={classes.dataColumn}>
            <p>
              <Badge pill variant="warning">
                BETA
              </Badge>
            </p>
            <p>{this.state.sma}</p>
            <p>{this.state.ema}</p>
            <p>{this.state.rsi}</p>
            <p>{this.state.bbands}</p>
            <p>{this.state.macd}</p>
          </div>
        </div>
        <div hidden={this.props.hideFollowed}>
          {this.renderFollowedStocks()}
        </div>
      </div>
    );
  }
}

StockInfo.contextType = DarkModeContext;
export default StockInfo;
