import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import ReactDOM from "react-dom";
import { act } from "react-dom/test-utils";
import { shallow } from "enzyme";

import CreateBudget from "./CreateBudget";

test("renders without crashing", () => {
  shallow(<CreateBudget />);
  const div = document.createElement("div");
  ReactDOM.render(<CreateBudget />, div);
});

test("initial values set properly", () => {
  const wrapper = shallow(<CreateBudget />);
  // const totalBudget = wrapper.find("#total-budget-input");

  const componentInstance = wrapper.instance();
  // console.log(componentInstance);
  expect(componentInstance.state.totalBudget).toBe(0);
  expect(componentInstance.state.housingBudget).toBe(0);
  expect(componentInstance.state.utilitiesBudget).toBe(0);
  expect(componentInstance.state.transportationBudget).toBe(0);
  expect(componentInstance.state.foodBudget).toBe(0);
  expect(componentInstance.state.medicalBudget).toBe(0);
  expect(componentInstance.state.savingsBudget).toBe(0);
  expect(componentInstance.state.personalBudget).toBe(0);
  expect(componentInstance.state.entertainmentBudget).toBe(0);
  expect(componentInstance.state.otherBudget).toBe(0);
});

test("getVariant returns correct value", () => {
  const wrapper = shallow(<CreateBudget />);
  const componentInstance = wrapper.instance();

  expect(componentInstance.getVariant()).toBe("success");
});
