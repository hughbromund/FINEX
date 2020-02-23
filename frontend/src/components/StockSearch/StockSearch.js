import React, { Component } from 'react';
import Dropdown from 'react-bootstrap/Dropdown'
import FormControl from 'react-bootstrap/FormControl'
import classes from './StockSearch.module.css'
import Jumbotron from 'react-bootstrap/Jumbotron'
import Button from 'react-bootstrap/Button';
import { STOCK_LIST_API } from '../../constants/Constants';
import SearchBar from '../SearchBar/SearchBar';


class StockSearch extends Component {

    render() {
        return (
            <div className={classes.wrapper}>
                <div className={classes.innerDiv}>
                    <Jumbotron className={classes.jumbo}>
                            <h1>Welcome to FINEX's Stock Search Page!</h1>
                            <p>
                                Below, you may search for a stock by symbol or name. Clicking on the stock will bring you to its own, 
                                dedicated screen where you can learn more about its recent trends.
                            </p>
                    </Jumbotron>
                </div>
                <div className={classes.innerDiv}>
                    <SearchBar />
                </div>
            </div>
        );
    }
}

export default StockSearch;