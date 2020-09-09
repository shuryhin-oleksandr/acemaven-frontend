import React from "react";
import RegisterHead from "../RegisterHead";
import RegisterFormTemplate from "../../templates/RegisterFormTemplate";

const SignInPage = () => {
  return (
    <RegisterFormTemplate>
      <RegisterHead title="Log in" buttonText="Register" redirectRoute="/sign-up" />
    </RegisterFormTemplate>
  );
};

export default SignInPage;


