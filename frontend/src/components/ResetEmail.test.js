import React from "react";
import ResetEmail from "./ResetEmail";

const resetEmail = new ResetEmail();

test("invalid email", () => {
  expect(resetEmail.validateEmail("asdf")).toBe(false);
});
