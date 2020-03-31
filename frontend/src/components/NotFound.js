import React, { Component } from "react";
import classes from "./NotFound.module.css";
import SearchBar from "./SearchBar/SearchBar";
import { DarkModeContext } from "../contexts/DarkModeContext";

/**
 * This class displays the page navigated to by a user entering
 * an invalid URL or path. It displays a quick message and a search
 * bar.
 */
class NotFound extends Component {
  render() {
    return (
      <div
        className={
          this.context.isDarkMode ? classes.darkWrapper : classes.lightWrapper
        }
      >
        <div className={classes.content}>
          <div className={classes.message}>
            Sorry, we were unable to find that page.
          </div>
          <div className={classes.searchBarText}>
            In the mean time, feel free to search for a stock you're interested
            in...
          </div>
          <div className={classes.searchBar}>
            <SearchBar />
          </div>
        </div>
      </div>
    );
  }
}

NotFound.contextType = DarkModeContext;
export default NotFound;
