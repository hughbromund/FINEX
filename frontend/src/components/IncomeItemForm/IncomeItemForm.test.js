import React from "react";
import ReactDOM from "react-dom";
import { shallow } from "enzyme";

import IncomeItemForm from "./IncomeItemForm";

test("renders without crashing", () => {
    shallow(<IncomeItemForm />);
    const div = document.createElement("div");
    ReactDOM.render(<IncomeItemForm />, div);
});

test("initial values set properly", () => {
    const wrapper = shallow(<IncomeItemForm />);

    const componentInstance = wrapper.instance();

    const mockState = {
        amount: "",
        name: "",
        type: "Income",
        startDate: "",
        success: false,
        error: false
    }

    expect(componentInstance.state).toStrictEqual(mockState);
});
