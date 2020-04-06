import React, { Component } from "react";

import ProgressBar from "react-bootstrap/ProgressBar";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import history from "../../routing/History";

import {
  CREATE_NEW_BUDGET,
  GET_OVERALL_BUDGET,
  SPENT_SUMMARY_PATH,
} from "../../constants/Constants";

export default class MonthProgress extends Component {
  constructor(props) {
    super(props);

    var today = new Date();

    // console.log(today.getMonth());
    this.state = {
      month: today.getMonth() + 1,
      day: today.getDate(),
      year: today.getFullYear(),
      budgeted: 0,
      spent: 0,
      serverError: false,
      noBudget: true,
    };
    // console.log(this.state)

    this.getDaysInMonth = this.getDaysInMonth.bind(this);
    this.getVarient = this.getVarient.bind(this);
    this.getBudgetProgress = this.getBudgetProgress.bind(this);
  }

  componentDidMount() {
    this.getBudgetProgress();
  }

  getDaysInMonth() {
    // console.log(new Date(this.state.year, this.state.month, 0).getDate());
    return new Date(this.state.year, this.state.month, 0).getDate();
  }

  getVarient() {
    // console.log(onTrack)
    if (this.onTrack() === true) {
      return "success";
    } else {
      return "danger";
    }
  }

  onTrack() {
    var daysInMonth = this.getDaysInMonth();

    var budgetPerDay = this.state.budgeted / daysInMonth;
    // console.log(budgetPerDay)
    // var currentPerDay = this.state.currentSpending / daysInMonth;

    var projectedSpending = budgetPerDay * this.state.day;

    //console.log(projectedSpending)
    //console.log(this.state.spent)

    if (projectedSpending > this.state.spent) {
      return true;
    } else {
      return false;
    }
  }

  getBudgetProgress = async () => {
    var response = await fetch(GET_OVERALL_BUDGET, {
      method: "GET",
      withCredentials: true,
      // credentials: 'same-origin'
    }).catch((err) => {
      this.setState({
        serverError: true,
      });
      console.error(err);
      return;
    });

    var body = await response.json();
    // console.log(body);

    var isBudget = false;
    if (body.message === "Budget has not been created for this month.") {
      isBudget = true;
    }

    this.setState({
      budgeted: body.budgeted,
      spent: body.spent,
      noBudget: isBudget,
    });
    // console.log(this.state)
  };

  render() {
    // console.log(onTrack)
    // console.log(this.getDaysInMonth(month,year))
    return (
      <div>
        <Alert show={this.state.serverError} variant="danger">
          Looks like we are having some trouble communicating with the server.{" "}
          <br />
          Try refreshing the page or logging back in!
        </Alert>
        <Alert
          show={this.state.noBudget && !this.state.serverError}
          variant="success"
        >
          Looks like you haven't made a budget yet. Would you like to create one
          now?
          <hr />
          <Button
            variant="outline-success"
            onClick={() => history.push(CREATE_NEW_BUDGET)}
          >
            Create New Budget
          </Button>
        </Alert>
        <div hidden={this.state.serverError || this.state.noBudget}>
          <b>Current Spending:</b> ${this.state.spent} <br />
          <b>Budgeted Spending:</b> ${this.state.budgeted}
          <ProgressBar
            variant={this.getVarient()}
            now={this.state.day}
            max={this.getDaysInMonth()}
          ></ProgressBar>
          <div>
            There are <b>{this.getDaysInMonth() - this.state.day}</b> days left
            this Month!
          </div>
          <div hidden={this.onTrack()}>
            You are not on track for this Month! <br />
            Try spending less or revise your budget to get back on track!
          </div>
          <div hidden={!this.onTrack()}>
            Your Budget is Looking Good! <br />
          </div>
          <Button
            variant="outline-success"
            onClick={() => history.push(SPENT_SUMMARY_PATH)}
          >
            View Spending Details
          </Button>
        </div>
      </div>
    );
  }
}
