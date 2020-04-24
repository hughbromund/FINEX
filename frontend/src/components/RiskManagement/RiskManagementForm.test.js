import React from "react";
import ReactDOM from "react-dom";
import { shallow } from "enzyme";

import RiskManagement from "./RiskManagement";

test("renders without crashing", () => {
  shallow(<RiskManagement />);
  const div = document.createElement("div");
  ReactDOM.render(<RiskManagement />, div);
});

