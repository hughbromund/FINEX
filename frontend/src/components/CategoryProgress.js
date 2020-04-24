import React, { Component } from "react";

import ProgressBar from "react-bootstrap/ProgressBar";

/*
 *
 * This Component Takes in the currentSpending, budgetedSpending, and a category
 * Based on the CURRENT date it calcuates if the category is on Track or not.
 * It then displays the budget progress and styles it depending on whether or not the category
 * is on track.
 *
 */

export default class CategoryProgress extends Component {
  constructor(props) {
    super(props);
    var today = new Date();
    // console.log(today.getMonth())
    this.state = {
      category: props.category,
      currentSpending: props.currentSpending,
      budgetedSpending: props.budgetedSpending,
      month: today.getMonth(),
      day: today.getDate(),
      year: today.getFullYear(),
    };

    this.getDaysInMonth = this.getDaysInMonth.bind(this);
    this.onTrack = this.onTrack.bind(this);
    this.getVarient = this.getVarient.bind(this);
  }

  getDaysInMonth() {
    return new Date(this.state.year, this.state.month, 0).getDate();
  }

  onTrack() {
    // console.log(this.state);
    if (this.state.currentSpending > this.state.budgetedSpending) {
      return false;
    } else {
      return true;
    }
  }

  getVarient() {
    // console.log(onTrack)
    if (this.onTrack() === true) {
      return "success";
    } else {
      return "danger";
    }
  }

  render() {
    return (
      <div>
        <div hidden={this.state.budgetedSpending > 0 ? false : true}>
          <b>{this.state.category} </b>
          <br />
          <ProgressBar
            now={this.state.currentSpending}
            max={this.state.budgetedSpending}
            label={"$" + this.state.currentSpending}
            variant={this.getVarient()}
          ></ProgressBar>
          <div hidden={this.onTrack()}>
            You are overbudget by{" "}
            <b>${this.state.currentSpending - this.state.budgetedSpending}</b>!
          </div>
          <div hidden={!this.onTrack()}>
            Your spending in this category is looking good! You have{" "}
            <b>${this.state.budgetedSpending - this.state.currentSpending}</b>{" "}
            left for this month.
          </div>
          <hr />
        </div>
      </div>
    );
  }
}
