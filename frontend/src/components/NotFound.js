import React, { Component } from "react";
import classes from "./NotFound.module.css";
import SearchBar from './SearchBar/SearchBar';

class NotFound extends Component {

    render() {

        return (
            <div className={classes.wrapper}>
                <div className={classes.content}>
                    <div className={classes.message}>
                        Sorry, we were unable to find that page.
                    </div>
                    <div className={classes.searchBarText}>
                        In the mean time, feel free to search for a stock you're interested in...
                    </div>
                    <div className={classes.searchBar}>
                        <SearchBar />
                    </div>
                </div>
            </div>
        )

    }
}

export default NotFound;