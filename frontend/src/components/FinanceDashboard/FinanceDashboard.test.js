import React from "react";
import ReactDOM from "react-dom";
import { shallow } from "enzyme";

import FinanceDashboard from "./FinanceDashboard";

test("renders without crashing", () => {
  shallow(<FinanceDashboard />);
  const div = document.createElement("div");
  ReactDOM.render(<FinanceDashboard />, div);
});

test("initial values set properly", () => {
  const wrapper = shallow(<FinanceDashboard />);

  const componentInstance = wrapper.instance();

  expect(componentInstance.state.transactionToasts).toBe("");
  expect(componentInstance.state.incomeToasts).toBe("");
  expect(componentInstance.state.categoryProgresses).toBe("");
});
