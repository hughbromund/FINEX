import React from "react";
import ReactDOM from "react-dom";
import { shallow } from "enzyme";

import ResetProfilePicture from "./ResetProfilePicture";

test("renders without crashing", () => {
  shallow(<ResetProfilePicture />);
  const div = document.createElement("div");
  ReactDOM.render(<ResetProfilePicture />, div);
});

test("initial values set properly", () => {
  const wrapper = shallow(<ResetProfilePicture />);

  const componentInstance = wrapper.instance();

  expect(componentInstance.state.crop).toMatchObject({
    unit: "%",
    width: 100,
    aspect: 1 / 1,
  });
  expect(componentInstance.state.success).toBe(false);
  expect(componentInstance.state.error).toBe(false);
});
