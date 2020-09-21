//Core
import React from "react";
import styled from "styled-components";

//Instruments
import { Formik, Form } from "formik";
import * as Yup from "yup";

//Components
import RegisterHead from "../components/RegisterHead";
import RegisterFormTemplate from "../templates/RegisterFormTemplate";
import BaseButton from "../components/base/BaseButton";
import BaseInputGroup from "../components/base/BaseInputGroup";

const ValidationSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email")
    .required("Please, enter your email"),
  password: Yup.string().required("Please, enter your password"),
});

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
          validationSchema={ValidationSchema}
          initialValues={{ email: "", password: "" }}
          onSubmit={(values, { setSubmitting }) => {
            console.log("submit", values);
          }}
        >
          {({ values, touched, errors }) => {
            const hasErrors = Object.keys(errors).length > 0;
            return (
              <Form>
                <BaseInputGroup
                  name="email"
                  placeholder="Email"
                  values={values}
                  labelText="Email"
                  marginBot={46}
                  valid={touched.email && !errors.email}
                  error={touched.email && errors.email}
                />
                <BaseInputGroup
                  name="password"
                  placeholder="Password"
                  values={values}
                  labelText="Password"
                  type="password"
                  valid={touched.password && !errors.password}
                  error={touched.password && errors.password}
                />
                <ButtonWrapper>
                  <BaseButton
                    type="submit"
                    disabled={!values.password || !values.email || hasErrors}
                  >
                    Log in
                  </BaseButton>
                </ButtonWrapper>
              </Form>
            );
          }}
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
