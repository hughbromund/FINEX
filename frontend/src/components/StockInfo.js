import React, { Component } from 'react';
import classes from './StockInfo.module.css';
import Chart from './Chart';
import { YOUR_STOCKS_PATH, STOCK_DAILY_URL } from '../constants/Constants';
import history from '../routing/History';

/**
 * This page displays a chart and other basic information about a stock.
 * 
 * Code snippets from:
 * https://reacttraining.com/react-router/web/guides/quick-start
 * https://stackoverflow.com/questions/23593052/format-javascript-date-as-yyyy-mm-dd
 */
class StockInfo extends Component {

    state = {
        stockSymbol: "Stock Name",
        open: "N/A",
        close: "N/A",
        high: "N/A",
        low: "N/A",
        volume: "N/A",
    };

    /**
     * Gets stock information from backend.
     */
    componentDidMount = () => {

        let currPath = this.props.location.pathname;
        let pathLength = (YOUR_STOCKS_PATH + '/').length;
        let searchedSymbol = currPath.slice(pathLength);

        this.setState({stockSymbol:searchedSymbol});

        // TODO: call backend based on path on load
        this.callDataAPI(searchedSymbol)
            .catch(err => console.log(err));
    }

    /**
     * Makes a call to backend requesting stock data based on
     * input provided.
     */
    callDataAPI = async (symbol) => {
        console.log(STOCK_DAILY_URL + symbol)
        const response = await fetch(STOCK_DAILY_URL + symbol);
        const body = await response.json();

        let tmpOpen = parseFloat(body.data["Time Series (Daily)"][this.getCurrentDate()]["1. open"]);
        let tmpHigh = parseFloat(body.data["Time Series (Daily)"][this.getCurrentDate()]["2. high"]);
        let tmpLow = parseFloat(body.data["Time Series (Daily)"][this.getCurrentDate()]["3. low"]);
        let tmpClose = parseFloat(body.data["Time Series (Daily)"][this.getCurrentDate()]["4. close"]);
        let tmpVol = body.data["Time Series (Daily)"][this.getCurrentDate()]["5. volume"];

        tmpOpen = Math.round(tmpOpen * 100) / 100.0;

        // TODO: change state
        this.setState({open:tmpOpen.toFixed(2)});
        this.setState({high:tmpHigh.toFixed(2)});
        this.setState({low:tmpLow.toFixed(2)});
        this.setState({close:tmpClose.toFixed(2)});
        this.setState({volume:tmpVol});
      
        if (response.status !== 200) {
            history.push("/stocknotfound");
        }
        return body;
    }

    /**
     * Returns current date in the format yyyy-mm-dd.
     */
    getCurrentDate = () => {
        let  d = new Date();
        let month = '' + (d.getMonth() + 1);
        let day = '' + d.getDate();
        let year = d.getFullYear();

        if (month.length < 2) {
            month = '0' + month;
        }
        if (day.length < 2) {
            day = '0' + day;
        }

        return [year, month, day].join('-');
    }

    render() {
        return (
            <div className={classes.wrapper}>
                <div className={classes.title}>{this.state.stockSymbol}</div>
                <Chart />
                <div className={classes.infoTitle} >Daily Summary:</div>
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