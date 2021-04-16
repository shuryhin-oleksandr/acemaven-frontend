//Core
import React from "react";
import styled from "styled-components";
import {withRouter} from "react-router";

//Instruments
import { Formik, Form } from "formik";
import * as Yup from "yup";

//Components
import RegisterHead from "../components/RegisterHead";
import RegisterFormTemplate from "../templates/RegisterFormTemplate";
import BaseButton from "../components/base/BaseButton";
import BaseInputGroup from "../components/base/BaseInputGroup";
import {useDispatch, useSelector} from "react-redux";
import {authActions} from "../../_BLL/reducers/authReducer";
import Spinner from "../components/_commonComponents/spinner/Spinner";
import ModalWindow from "../components/_commonComponents/ModalWindow/ModalWindow";
import {signIn} from "../../_BLL/thunks/auth/authThunks";
import {useTranslation} from "react-i18next";



const SignInPage = ({history}) => {
  const {t} = useTranslation();
  const ValidationSchema = Yup.object().shape({
    email: Yup.string()
      .email(`${t("Error message/Invalid email")}`)
      .required(`${t("Error message/Please, enter your email")}`),
    password: Yup.string().required(`${t("Error message/Please, enter your password")}`),
  });
    const dispatch = useDispatch()
    const loginFail = useSelector(state => state.auth.loginError)
    const isFetching = useSelector(state => state.auth.isFetching)

    let popupCallback = () => {
        dispatch(authActions.setOpenSignUp(true))
        dispatch(authActions.setOpenSignIn(false))
    }

    let isSignIn = useSelector(state => state.auth.isSignIn)

  return (
    <ModalWindow isOpen={isSignIn}>
      <RegisterFormTemplate openFlow={() => dispatch(authActions.setOpenSignIn(false))}>
          {isFetching && <Spinner />}
        <RegisterHead
          title="Log in"
          buttonText="Register"
          popupCallback={() => popupCallback()}

        />
        <FormWrapper>
          <Formik
            validationSchema={ValidationSchema}
            initialValues={{ email: "", password: "" }}
            onSubmit={(values, { }) => {
              dispatch(authActions.setLoginError(''))
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
                    {loginFail && <ErrorServerMessage style={{paddingTop: errors.password && '20px'}}>{loginFail}</ErrorServerMessage>}
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
    </ModalWindow>
  );
};

export default withRouter(SignInPage);

const FormWrapper = styled.div`
  padding-top: 73px;
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 50px;
`;

export const ErrorServerMessage = styled.div`
    width: 100%;
    padding-top: 5px;
    padding-bottom: 5px;
    text-align:end;
    color: #E76767;
    font-family: "Helvetica Reg", sans-serif;
    font-size: 14px;
`
