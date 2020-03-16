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
    getVarient = (result) => {
        switch (result) {
            case 0:
              return 'danger';
            case 1:
              return 'danger';
            case 2:
              return 'warning';
            case 3:
              return 'success';
            case 4:
              return 'success';
            default:
              return 'danger';
          }
    }

    render() {
        const { password } = this.props;
        // console.log(zxcvbn(password).score);
        const score = zxcvbn(password).score;
        return (
            <div>
                <ProgressBar 
                    variant={this.getVarient(score)}
                    max="4" 
                    min="-1"
                    now={score} 
                    label={this.createPasswordLabel(score)}>

                    </ProgressBar>
                <b>Password Strength: </b> {this.createPasswordLabel(score)}
            </div>
        )
    }
}
