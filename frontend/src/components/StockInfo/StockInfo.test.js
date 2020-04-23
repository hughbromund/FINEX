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

test("initial state values set properly for social media", () => {
  const wrapper = shallow(<StockInfo />);

  const componentInstance = wrapper.instance();

  const mockState = {
    shareURL: "https://www.finex.money",
    shareQuote1: "I am following ",
    shareQuote2: " stock using FINEX! Come join me!",
  };

  expect(componentInstance.state.shareURL).toStrictEqual(mockState.shareURL);
  expect(componentInstance.state.shareQuote1).toStrictEqual(
    mockState.shareQuote1
  );
  expect(componentInstance.state.shareQuote2).toStrictEqual(
    mockState.shareQuote2
  );
});
