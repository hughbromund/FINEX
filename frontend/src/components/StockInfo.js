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
        stockSymbol: null,
        open: "Loading...",
        close: "Loading...",
        high: "Loading...",
        low: "Loading...",
        volume: "Loading...",
        isValid: true
    };

    /**
     * Gets stock information from backend.
     */
    componentDidMount = () => {

        let currPath = this.props.location.pathname;
        let pathLength = (YOUR_STOCKS_PATH + '/').length;
        let searchedSymbol = currPath.slice(pathLength);

        // TODO: call backend based on path on load
        this.callDataAPI(searchedSymbol)
            .catch(err => {
                console.log(err)
                history.push("/stocknotfound")
                this.setState({isValid:false});
            }
        );
        searchedSymbol = searchedSymbol.toUpperCase();
        this.setState({stockSymbol:searchedSymbol});
    }

    /**
     * Makes a call to backend requesting stock data based on
     * input provided.
     */
    callDataAPI = async (symbol) => {
        console.log(STOCK_DAILY_URL + symbol)
        const response = await fetch(STOCK_DAILY_URL + symbol);

        const body = await response.json();

        console.log(body);

        let tmpOpen = "No Data";
        let tmpHigh = "No Data";
        let tmpLow = "No Data";
        let tmpClose = "No Data";
        let tmpVol = "No Data";

        if (body.data["Time Series (Daily)"] != undefined && body.data["Time Series (Daily)"][this.getCurrentDate()] != undefined) {
            tmpOpen = '$' + parseFloat(body.data["Time Series (Daily)"][this.getCurrentDate()]["1. open"]).toFixed(2);
            tmpHigh = '$' + parseFloat(body.data["Time Series (Daily)"][this.getCurrentDate()]["2. high"]).toFixed(2);
            tmpLow = '$' + parseFloat(body.data["Time Series (Daily)"][this.getCurrentDate()]["3. low"]).toFixed(2);
            tmpClose = '$' + parseFloat(body.data["Time Series (Daily)"][this.getCurrentDate()]["4. close"]).toFixed(2);
            tmpVol = body.data["Time Series (Daily)"][this.getCurrentDate()]["5. volume"];
        }

        // TODO: change state
        this.setState({open:tmpOpen});
        this.setState({high:tmpHigh});
        this.setState({low:tmpLow});
        this.setState({close:tmpClose});
        this.setState({volume:tmpVol});
      
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

    renderChart = () => {
        if (this.state == null) {
            return;
        } else {
            return <Chart symbol={this.state.stockSymbol} />;
        }
    }

    render() {
        return (
            <div className={classes.wrapper}>
                <div className={classes.title}>{this.state.stockSymbol}</div>
                { (this.state.stockSymbol != null && this.state.isValid == true) ? <Chart symbol={this.state.stockSymbol} /> : null }
                <div className={classes.infoTitle} >Daily Summary ({this.getCurrentDate()}):</div>
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