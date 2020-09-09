import React from "react";
import RegisterHead from "../RegisterHead";
import RegisterFormTemplate from "../../templates/RegisterFormTemplate";

const SignUpPage = () => {
    return (
        <RegisterFormTemplate>
            <RegisterHead title="Register" buttonText="Log in" redirectRoute="/sign-in" />
        </RegisterFormTemplate>
    );
};

export default SignUpPage;

