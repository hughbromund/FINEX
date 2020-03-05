import React, { Component } from 'react'

import ProgressBar from 'react-bootstrap/ProgressBar'
import zxcvbn from "zxcvbn"

/*
 * Code Snippets Taken From:
 * 
 * https://upmostly.com/tutorials/build-a-password-strength-meter-react
 */


export default class PasswordStrength extends Component {

    createPasswordLabel = (result) => {
        switch (result) {
          case 0:
            return 'Weak';
          case 1:
            return 'Weak';
          case 2:
            return 'Fair';
          case 3:
            return 'Good';
          case 4:
            return 'Strong';
          default:
            return 'Weak';
        }
      }

    render() {
        const { password } = this.props;
        // console.log(zxcvbn(password).score);
        const score = zxcvbn(password).score;
        return (
            <div>
                <ProgressBar max="4" now={score} label={this.createPasswordLabel(score)}></ProgressBar>
                <b>Password Strength: </b> {this.createPasswordLabel(score)}
            </div>
        )
    }
}
