import React, { Component } from "react";
import classes from "./NotFound.module.css";
import SearchBar from './SearchBar/SearchBar';
import {DarkModeProvider, useDarkModeState, useDarkModeToggle} from "../contexts/DarkModeContext";

/**
 * This class displays the page navigated to by a user entering
 * an invalid URL or path. It displays a quick message and a search
 * bar.
 */
class NotFound extends Component {

    render() {
        return (
            <CustomWrapper>
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
            </CustomWrapper>
        )

    }
}

function CustomWrapper({children}) {
    const {isDarkMode} = useDarkModeState();
    let classNameVar = classes.lightWrapper;
    if (isDarkMode) classNameVar = classes.darkWrapper;
    return (
        <div className={classNameVar}>
            {children}
        </div>
    );
}

export default NotFound;