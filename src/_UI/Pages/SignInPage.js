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
import {useDispatch, useSelector} from "react-redux";
import {signIn} from "../../_BLL/reducers/authReducer";
import Spinner from "../components/_commonComponents/spinner/Spinner";
import {withRouter} from "react-router";

const ValidationSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email")
    .required("Please, enter your email"),
  password: Yup.string().required("Please, enter your password"),
});

const SignInPage = ({history}) => {
    const dispatch = useDispatch()
    const loginFail = useSelector(state => state.auth.loginError)
    const isFetching = useSelector(state => state.auth.isFetching)

  return (
    <RegisterFormTemplate>
        {isFetching && <Spinner />}
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
            dispatch(signIn(values, history))
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
                  {loginFail && <ErrorServerMessage>{loginFail}</ErrorServerMessage>}
                <ButtonWrapper>
                  <BaseButton
                    type="submit"
                    disabled={!values.password || !values.email || hasErrors}
                  >
                    LOG IN
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

export default withRouter(SignInPage);

const FormWrapper = styled.div`
  padding-top: 75px;
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 50px;
`;

export const ErrorServerMessage = styled.div`
  width: 100%;
    padding-top: 10px;
    text-align: end;
    color: #E76767;
    font-family: "Helvetica Reg", sans-serif;
    font-size: 14px;
`
