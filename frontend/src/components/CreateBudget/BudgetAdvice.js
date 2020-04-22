import React, { Component } from "react";

import Alert from "react-bootstrap/Alert";
import Collapse from "react-bootstrap/Collapse";
import { Col } from "react-bootstrap";

export default class BudgetAdvice extends Component {
  componentWillReceiveProps(nextProps) {
    console.log(nextProps);
    this.setState({
      data: nextProps.budget,
    });
  }

  constructor(props) {
    super(props);
    this.state = {
      data: props.budget,
    };
  }

  getSavingsPercentage() {
    var percentage =
      (this.state.data.savingsBudget / this.state.data.totalBudget) * 100;

    if (isNaN(percentage)) {
      return 0;
    }
    return percentage;
  }

  getHousingPercentage() {
    var percentage =
      (this.state.data.housingBudget / this.state.data.totalBudget) * 100;
    if (isNaN(percentage)) {
      return 0;
    }
    return percentage;
  }

  getOtherPercentage() {
    var percentage =
      (this.state.data.otherBudget / this.state.data.totalBudget) * 100;
    if (isNaN(percentage)) {
      return 0;
    }
    return percentage;
  }

  isOverBudget() {
    if (
      Number(this.state.data.totalBudget) - Number(this.getBudgetUsed()) <
      0
    ) {
      return true;
    } else {
      return false;
    }
  }

  getBudgetUsed() {
    //console.log(this.state)
    var budgetUsed =
      Number(this.state.data.housingBudget) +
      Number(this.state.data.utilitiesBudget) +
      Number(this.state.data.transportationBudget) +
      Number(this.state.data.foodBudget) +
      Number(this.state.data.medicalBudget) +
      Number(this.state.data.savingsBudget) +
      Number(this.state.data.entertainmentBudget) +
      Number(this.state.data.otherBudget);
    //console.log(budgetUsed)
    return budgetUsed;
  }

  render() {
    return (
      <div>
        <h2>Budget Advice</h2>
        <Collapse in={this.isOverBudget()}>
          <div>
            <Alert variant="danger">
              <Alert.Heading>
                <b>Over Budget!</b>
              </Alert.Heading>
              <p>
                You are currently Over Budget! You cannot submit an budget in
                this state. Please try decreasing the amount you have budgeted.
              </p>
            </Alert>
          </div>
        </Collapse>
        <Collapse in={this.getSavingsPercentage() < 20}>
          <div>
            <Alert variant="warning">
              <Alert.Heading>
                <b>Savings bellow 20%</b>
              </Alert.Heading>
              <p>
                <b>FINEX</b> recommends putting at least 20% of your budget into
                savings each month. You currently have{" "}
                <b>{this.getSavingsPercentage()}%</b> of your total budget in
                savings.
              </p>
            </Alert>
          </div>
        </Collapse>
        <Collapse in={this.getHousingPercentage() > 30}>
          <div>
            <Alert variant="warning">
              <Alert.Heading>
                <b>Housing above 30%</b>
              </Alert.Heading>
              <p>
                <b>FINEX</b> recommends keeping your monthly housing payments
                bellow 30% of your total budget. You currently have{" "}
                <b>{this.getHousingPercentage()}</b>% of your total budget in
                housing
              </p>
            </Alert>
          </div>
        </Collapse>
        <Collapse in={this.getOtherPercentage() > 30}>
          <div>
            <Alert variant="warning">
              <Alert.Heading>
                <b>Other above 30%</b>
              </Alert.Heading>
              <p>
                For <b>FINEX</b> to work best, your budget should be broken into
                categories. Currently your <i>Other</i> category is at{" "}
                <b>{this.getOtherPercentage()}%</b> of your total budget. If you
                keep your budget like this, <b>FINEX</b> will not be able to
                give good feedback as the month progresses.
              </p>
            </Alert>
          </div>
        </Collapse>
        <Collapse
          in={
            this.getOtherPercentage() <= 30 &&
            this.getHousingPercentage() <= 30 &&
            this.getSavingsPercentage() >= 20 &&
            !this.isOverBudget()
          }
        >
          <div>
            <Alert variant="success">
              <Alert.Heading>
                <b>Looking Good!</b>
              </Alert.Heading>
              <p>
                Your budget is in good shape. If you have extra money left over
                consider putting more money into <i>Savings</i>.
              </p>
            </Alert>
          </div>
        </Collapse>
      </div>
    );
  }
}
