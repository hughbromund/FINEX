import React, { Component } from 'react';
import classes from './StockInfo.module.css';
import Chart from './Chart';
import { YOUR_STOCKS_PATH } from '../constants/Constants';
import history from '../routing/History';

/**
 * This page displays a chart and other basic information about a stock.
 * 
 * Code snippets from:
 * https://reacttraining.com/react-router/web/guides/quick-start
 */
class StockInfo extends Component {

    state = {
        stockName: "Stock Name",
        open: "N/A",
        close: "N/A",
        high: "N/A",
        low: "N/A",
        divYield: "N/A",
        prevClose: "N/A",
        yearHigh: "N/A",
        yearLow: "N/A"
    };

    /**
     * Gets stock information from backend.
     */
    componentDidMount = () => {

        let currPath = this.props.location.pathname;
        let pathLength = (YOUR_STOCKS_PATH + '/').length;
        let searchedSymbol = currPath.slice(pathLength);

        // TODO: call backend based on path on load

        // TODO: change to more permanent solution
        if (searchedSymbol === "nostock") {
            history.push("/stocknotfound");
        } else {
            searchedSymbol = searchedSymbol.toUpperCase();
            this.setState({stockName:searchedSymbol});
        }
    }

    /**
     * Makes a call to backend requesting stock list based on
     * input provided.
     */
    callListAPI = async () => {
        // TODO: Get data from backend
    }

    render() {
        return (
            <div className={classes.wrapper}>
                <div className={classes.title}>{this.state.stockName}</div>
                <Chart />
                <div className={classes.infoBox}>
                    <div className={classes.headerColumn}>
                        <p>Open:</p>
                        <p>Close:</p>
                        <p>High:</p>
                        <p>Low:</p>
                    </div>
                    <div className={classes.dataColumn}>
                        <p>1330.23</p>
                        <p>1231.43</p>
                        <p>120.23</p>
                        <p>123.3123</p>
                    </div>
                    <div className={classes.headerColumn}>
                        <p>Div Yield:</p>
                        <p>Prev. Close:</p>
                        <p>52-wk High:</p>
                        <p>52-wk Low:</p>
                    </div>
                    <div className={classes.dataColumn}>
                        <p>1482.31</p>
                        <p>1423.23</p>
                        <p>3214.23</p>
                        <p>2313.32</p>
                    </div>
                </div>
            </div>
        );
    }

}

export default StockInfo;