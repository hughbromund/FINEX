import React, { Component } from "react";
// import Dropdown from "react-bootstrap/Dropdown";
// import FormControl from "react-bootstrap/FormControl";
import classes from "./StockSearch.module.css";
import Jumbotron from "react-bootstrap/Jumbotron";
// import Button from "react-bootstrap/Button";
// import { STOCK_LIST_API } from "../../constants/Constants";
import SearchBar from "../SearchBar/SearchBar";
import { DarkModeContext } from "../../contexts/DarkModeContext";

/**
 * This page is a page where the user may search for a stock.
 * Clicking on the provided button will navigate to the stock's
 * summary page.
 */
class StockSearch extends Component {
  render() {
    return (
      <div className={classes.wrapper}>
        <div className={classes.innerWrapper}>
          <div className={classes.innerDiv}>
            <Jumbotron
              className={this.context.isDarkMode ? "bg-dark" : "bg-light"}
            >
              <h1>Welcome to FINEX's Stock Search Page!</h1>
              <p>
                Below, you may search for a stock by symbol or name. Clicking on
                the stock will bring you to its own, dedicated screen where you
                can learn more about its recent trends.
              </p>
            </Jumbotron>
          </div>
          <div className={classes.innerDiv}>
            <SearchBar />
          </div>
        </div>
      </div>
    );
  }
}

StockSearch.contextType = DarkModeContext;
export default StockSearch;
