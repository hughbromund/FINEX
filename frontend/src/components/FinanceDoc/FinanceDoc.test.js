import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import ReactDOM from "react-dom";
import { act } from "react-dom/test-utils";
import { shallow } from "enzyme";

import FinanceDoc from "./FinanceDoc";

test("stock info page renders without crashing", () => {
  shallow(<FinanceDoc />);
  const div = document.createElement("div");
  ReactDOM.render(<FinanceDoc />, div);
});

test("initial state values set properly for stock info page", () => {
  const wrapper = shallow(<FinanceDoc />);
  // const totalBudget = wrapper.find("#total-budget-input");

  const componentInstance = wrapper.instance();
  // console.log(componentInstance);

  expect(componentInstance.state.isLoggedIn).toBe(null);
  expect(componentInstance.state.data).toBe(null);
  expect(componentInstance.state.spentTotal).toBe(0);
  expect(componentInstance.state.budgetedTotal).toBe(0);
  expect(componentInstance.state.dataLoaded).toBe(false);
  expect(componentInstance.state.loadingError).toBe(false);
});
