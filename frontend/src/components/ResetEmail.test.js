import React from "react";
import ResetEmail from "./ResetEmail";

const resetEmail = new ResetEmail();

test("validateEmail() invalid email", () => {
  expect(resetEmail.validateEmail("asdf")).toBe(false);
});

test("validateEmail() valid email", () => {
  expect(resetEmail.validateEmail("myemail@gmail.com")).toBe(true);
});
