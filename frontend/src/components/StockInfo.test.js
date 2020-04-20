import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import ReactDOM from "react-dom";
import { act } from "react-dom/test-utils";
import { shallow } from "enzyme";

import StockInfo from "./StockInfo";

test("stock info page renders without crashing", () => {
  shallow(<StockInfo />);
  const div = document.createElement("div");
  ReactDOM.render(<StockInfo />, div);
});

test("initial state values set properly for stock info page", () => {
  const wrapper = shallow(<StockInfo />);
  // const totalBudget = wrapper.find("#total-budget-input");

  const componentInstance = wrapper.instance();
  // console.log(componentInstance);
  expect(componentInstance.state.following).toBe(false);
  expect(componentInstance.state.followedStocks).toStrictEqual([]);
});
