import React from "react";
import ReactDOM from "react-dom";
import { shallow } from "enzyme";

import BudgetAdvice from "./BudgetAdvice";

test("renders without crashing", () => {
  const data = {
    totalBudget: 0,
    housingBudget: 0,
    utilitiesBudget: 0,
    transportationBudget: 0,
    foodBudget: 0,
    medicalBudget: 0,
    savingsBudget: 0,
    personalBudget: 0,
    entertainmentBudget: 0,
    otherBudget: 0,
    currentMonth: 0,
    currentYear: 0,
    error: false,
    success: false,
  };

  shallow(<BudgetAdvice budget={data} />);
  const div = document.createElement("div");
  ReactDOM.render(<BudgetAdvice budget={data} />, div);
});

test("initial values set properly", () => {
  const data = {
    totalBudget: 0,
    housingBudget: 0,
    utilitiesBudget: 0,
    transportationBudget: 0,
    foodBudget: 0,
    medicalBudget: 0,
    savingsBudget: 0,
    personalBudget: 0,
    entertainmentBudget: 0,
    otherBudget: 0,
    currentMonth: 0,
    currentYear: 0,
    error: false,
    success: false,
  };

  const wrapper = shallow(<BudgetAdvice budget={data} />);

  const componentInstance = wrapper.instance();

  expect(componentInstance.state.data).toMatchObject(data);
});
