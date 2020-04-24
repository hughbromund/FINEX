import React from "react";
import ReactDOM from "react-dom";
import { shallow } from "enzyme";

import InvestmentTactics from "./InvestmentTactics";

test("renders without crashing", () => {
  shallow(<InvestmentTactics />);
  const div = document.createElement("div");
  ReactDOM.render(<InvestmentTactics />, div);
});

