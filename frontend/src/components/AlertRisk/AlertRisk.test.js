import React from "react";
import ReactDOM from "react-dom";
import { shallow } from "enzyme";

import AlertRisk from "./AlertRisk";

test("renders without crashing", () => {
  shallow(<AlertRisk />);
  const div = document.createElement("div");
  ReactDOM.render(<AlertRisk />, div);
});

test("initial values set properly", () => {
  const wrapper = shallow(<AlertRisk />);

  const componentInstance = wrapper.instance();

  const mockState = {};

  expect(componentInstance.state).toStrictEqual(mockState);
});
