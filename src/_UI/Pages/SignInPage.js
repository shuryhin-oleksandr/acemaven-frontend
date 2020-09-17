//Core
import React from "react";
import styled from "styled-components";

//Instruments
import { Formik, Form, ErrorMessage } from "formik";

//Components
import RegisterHead from "../components/RegisterHead";
import RegisterFormTemplate from "../templates/RegisterFormTemplate";
import BaseButton from "../components/base/BaseButton";
import BaseInputGroup from "../components/base/BaseInputGroup";

const SignInPage = () => {
  return (
    <RegisterFormTemplate>
      <RegisterHead
        title="Log in"
        buttonText="Register"
        redirectRoute="/sign-up"
      />
      <FormWrapper>
        <Formik
          initialValues={{ email: "", password: "" }}
          onSubmit={(values, { setSubmitting }) => {
            console.log("values", values);
          }}
        >
          {({ values }) => (
            <Form>
              <BaseInputGroup
                name="email"
                placeholder="Email"
                values={values}
                labelText="Email"
                marginBot={46}
              />
              <ErrorMessage name="email" component="div" />
              <BaseInputGroup
                name="password"
                placeholder="Password"
                values={values}
                labelText="Password"
                type="password"
              />
              <ErrorMessage name="password" component="div" />
              <ButtonWrapper>
                <BaseButton type="submit">Log in</BaseButton>
              </ButtonWrapper>
            </Form>
          )}
        </Formik>
      </FormWrapper>
    </RegisterFormTemplate>
  );
};

export default SignInPage;

const FormWrapper = styled.div`
  padding-top: 75px;
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 50px;
`;
