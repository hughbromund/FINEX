import React, { Component } from "react";
import classes from "./NotFound.module.css";
import image from "../assets/img/not-found.jpg";

class NotFound extends Component {

    render() {

        return (
            <div className={classes.wrapper}>
                <div className={classes.content}>
                    <div className={classes.message}>
                        Sorry, we were unable to find that page.
                    </div>
                    <div className={classes.searchBar}>
                        Yeet lol
                    </div>
                </div>
            </div>
        )

    }
}

export default NotFound;