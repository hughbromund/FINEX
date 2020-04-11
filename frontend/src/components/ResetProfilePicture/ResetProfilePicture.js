import React, { Component } from "react";

import classes from "./ResetProfilePicture.module.css";

export default class ResetProfilePicture extends Component {
  render() {
    return (
      <div className={classes.wrapper}>
        <div className={classes.inner}>
          <h1>Update Profile Picture</h1>
        </div>
      </div>
    );
  }
}
