import React, { Component } from "react";
import { HorizontalBar } from "react-chartjs-2";

export default class BudgetGraph extends Component {
  componentWillReceiveProps(nextProps) {
    console.log(nextProps);
    var tempData = [
      nextProps.budget.housingBudget,
      nextProps.budget.utilitiesBudget,
      nextProps.budget.transportationBudget,
      nextProps.budget.foodBudget,
      nextProps.budget.medicalBudget,
      nextProps.budget.savingsBudget,
      nextProps.budget.personalBudget,
      nextProps.budget.entertainmentBudget,
      nextProps.budget.otherBudget,
    ];
    this.setState({ data: tempData });
  }

  constructor(props) {
    super(props);
    this.state = {
      data: [0, 0, 0, 0, 0, 0, 0, 0, 0],
    };
  }
  render() {
    // console.log(this.state);
    var data = {
      labels: [
        "Housing",
        "Utilities",
        "Transportation",
        "Food",
        "Medical",
        "Savings",
        "Personal",
        "Entertainment",
        "Other",
      ],
      datasets: [
        {
          label: "Budgeted",
          backgroundColor: "rgba(52,199,89,0.75)",
          borderColor: "rgba(52,199,89,0.2)",
          borderWidth: 1,
          hoverBackgroundColor: "rgba(255,99,132,0.4)",
          hoverBorderColor: "rgba(255,99,132,1)",
          data: this.state.data,
        },
      ],
    };

    return (
      <div>
        <h2>Your Current Budget Breakdown</h2>
        <HorizontalBar data={data} />
      </div>
    );
  }
}
