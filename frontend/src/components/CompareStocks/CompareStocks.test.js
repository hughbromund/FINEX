import React from "react";
import ReactDOM from "react-dom";
import { shallow } from "enzyme";

import CompareStocks from "./CompareStocks";

test("renders without crashing", () => {
  shallow(<CompareStocks />);
  const div = document.createElement("div");
  ReactDOM.render(<CompareStocks />, div);
});

test("initial values set properly", () => {
  const wrapper = shallow(<CompareStocks />);

  const componentInstance = wrapper.instance();

  const mockState = {
    leftTicker: "AAPL",
    rightTicker: "MSFT",
    followedStocks: [],
  };

  expect(componentInstance.state).toStrictEqual(mockState);
});
