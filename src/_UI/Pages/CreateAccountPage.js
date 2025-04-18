//Core
import React, { useEffect, useState } from "react";
import styled from "styled-components";

//Instruments
import { Formik, Form } from "formik";
import * as Yup from "yup";

//Components
import BaseButton from "../components/base/BaseButton";
import BaseInputGroup from "../components/base/BaseInputGroup";
import DropZone from "../components/DropZone";
import Close from "../assets/icons/close-icon.svg";
import { useDispatch, useSelector } from "react-redux";
import { authActions} from "../../_BLL/reducers/authReducer";
import { useLocation, withRouter } from "react-router";
import Spinner from "../components/_commonComponents/spinner/Spinner";
import { authAPI } from "../../_DAL/API/authAPI";
import CheckedTokenPopup from "../components/PopUps/checked_token/checkedTokenPopup";
import { getFilesFormData } from "../../_BLL/helpers/MultipartFormDataHelper";
import { ErrorServerMessage } from "./SignInPage";
import {checkToken} from "../../_BLL/thunks/auth/authThunks";
import {useTranslation} from "react-i18next";
const phoneRegex = /^(\+)([0-9]){10,13}$/;



const CreateAccountPage = ({ history }) => {
  const {t} = useTranslation();
  const ValidationSchema = Yup.object().shape({
    first_name: Yup.string().trim().required(`${t("Error message/Please, enter your name")}`),
    last_name: Yup.string().trim().required(`${t("Error message/Please, enter your last name")}`),
    email: Yup.string()
      .email(`${t("Error message/Invalid email")}`)
      .required(`${t("Error message/Please, enter your email")}`),
    password: Yup.string()
      .min(8, t("Error message/Password must contain at least 8 characters"))
      .max(25, t("Error message/Password must contain maximum 25 characters"))
      .required(`${t("Error message/Please, enter your password")}`),
    confirm_password: Yup.string()
      .oneOf([Yup.ref("password"), null], t("Error message/Passwords must match"))
      .required(`${t("Error message/Please, confirm your password")}`),
    phone: Yup.string()
      .matches(phoneRegex, t("Error message/Phone number is not valid"))
      .required(`${t("Error message/Please, enter your phone number")}`),
    position: Yup.string().trim().required(`${t("Error message/Please, enter your position")}`),
  });
  const [img, setImg] = useState("");
  const [file, setFile] = useState(null);
  const checkedTokenError = useSelector((state) => state.auth.checkTokenError);

  let dispatch = useDispatch();
  let isFetching = useSelector((state) => state.auth.isFetching);
  let server_error = useSelector((state) => state.auth.signUpMasterError);

  const location = useLocation();
  useEffect(() => {
    console.log(location.search.substr(7));
    dispatch(checkToken(location.search.substr(7)));
  }, [dispatch]);

  return (
    <>
      {isFetching && <Spinner />}
      {checkedTokenError ? (
        <CheckedTokenPopup />
      ) : (
        <Container>
          <ContentWrapper>
            <Heading>Create a Master Account</Heading>
            <FormWrapper>
              <Formik
                validationSchema={ValidationSchema}
                initialValues={{
                  first_name: "",
                  last_name: "",
                  email: "",
                  password: "",
                  confirm_password: "",
                  phone: "",
                  position: "",
                }}
                onSubmit={(values, {}) => {
                  let wholeData = getFilesFormData(values, file);
                  dispatch(authActions.setIsLoading(true));
                  authAPI
                    .signUp(location.search.substr(7), wholeData)
                    .then((res) => {
                      localStorage.setItem("access_token", res.data.token);
                      dispatch(authActions.setAuth(true))
                      res.data && history.push("/create/user");
                      dispatch(authActions.setIsLoading(false));
                    })
                    .catch((e) => {
                      dispatch(authActions.setIsLoading(false));
                      dispatch(
                        authActions.setMasterSignUpError(e.response.data)
                      );
                    });
                }}
              >
                {({ values, touched, errors }) => {
                  const hasErrors = Object.keys(errors).length > 0;
                  const isButtonDisabled =
                    !values.first_name ||
                    !values.last_name ||
                    !values.email ||
                    !values.password ||
                    !values.confirm_password ||
                    !values.phone ||
                    !values.position ||
                    hasErrors;
                  return (
                    <Form>
                      <Row>
                        <RowItem>
                          <BaseInputGroup
                            name="first_name"
                            placeholder="Name"
                            values={values}
                            labelText="Name"
                            marginBot={46}
                            valid={touched.name && !errors.name}
                            error={touched.name && errors.name}
                          />
                        </RowItem>
                        <RowItem>
                          <BaseInputGroup
                            name="last_name"
                            placeholder="Last Name"
                            values={values}
                            labelText="Last Name"
                            marginBot={46}
                            valid={touched.lastName && !errors.lastName}
                            error={touched.lastName && errors.lastName}
                          />
                        </RowItem>
                      </Row>
                      <BaseInputGroup
                        name="email"
                        placeholder="Email"
                        values={values}
                        labelText="Email"
                        marginBot={46}
                        valid={touched.email && !!errors.email}
                        error={touched.email && errors.email}
                      />
                      <BaseInputGroup
                        name="password"
                        placeholder="Password"
                        values={values}
                        labelText="Password"
                        type="password"
                        marginBot={46}
                        valid={touched.password && !errors.password}
                        error={touched.password && errors.password}
                        withEye={!!values.password}
                      />
                      {values.password && (
                        <div style={{ marginTop: "-16px" }}>
                          <BaseInputGroup
                            name="confirm_password"
                            placeholder="Confirm password"
                            values={values}
                            type="password"
                            marginBot={57}
                            valid={
                              touched.confirmPassword && !errors.confirmPassword
                            }
                            error={
                              touched.confirmPassword && errors.confirmPassword
                            }
                          />
                        </div>
                      )}

                      <BaseInputGroup
                        name="phone"
                        placeholder="+000000000000"
                        values={values}
                        labelText="Phone number"
                        marginBot={46}
                        valid={touched.phone && !errors.phone}
                        error={touched.phone && errors.phone}
                      />

                      <BaseInputGroup
                        name="position"
                        placeholder="Position in the company"
                        values={values}
                        labelText="Position in the company"
                        marginBot={46}
                        valid={touched.position && !errors.position}
                        error={touched.position && errors.position}
                      />
                      {server_error && (
                        <div style={{ margin: "-20px 0 20px" }}>
                          {server_error?.password?.length > 0 &&
                            server_error.password.map((er, idx) => (
                              <ErrorServerMessage key={idx}>
                                {er}
                              </ErrorServerMessage>
                            ))}
                          {server_error?.phone?.length > 0 &&
                            server_error.phone.map((er, idx) => (
                              <ErrorServerMessage key={idx}>
                                {er}
                              </ErrorServerMessage>
                            ))}
                          {server_error?.email?.length > 0 &&
                          server_error.email.map((er, idx) => (
                              <ErrorServerMessage key={idx}>
                                {er}
                              </ErrorServerMessage>
                          ))}
                        </div>
                      )}

                      {img ? (
                        <div
                          style={{
                            display: "flex",
                            alignItems: "flex-start",
                          }}
                        >
                          <Photo height="auto" src={img} />
                          <CloseIcon
                            src={Close}
                            alt="Close"
                            onClick={() => {
                              setImg("");
                            }}
                          />
                        </div>
                      ) : (
                        <DropZone
                          setFile={setFile}
                          name="photo"
                          setImg={setImg}
                        />
                      )}
                      <ButtonWrapper>
                        <BaseButton type="submit" disabled={isButtonDisabled}>
                          Create a Master account
                        </BaseButton>
                      </ButtonWrapper>
                    </Form>
                  );
                }}
              </Formik>
            </FormWrapper>
          </ContentWrapper>
        </Container>
      )}
    </>
  );
};

export default withRouter(CreateAccountPage);

const Container = styled.div`
  min-height: 100vh;
  display: flex;
  justify-content: center;
  padding: 0 30px;
  position: relative;
`;

const ContentWrapper = styled.div`
  max-width: 700px;
  width: 100%;
  padding: 90px;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.25);
`;

const Heading = styled.h1`
  margin: 0;
  font-family: "Helvetica Bold", sans-serif;
  font-size: 28px;
`;

const FormWrapper = styled.div`
  padding-top: 75px;
`;

const Row = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const RowItem = styled.div`
  width: 48%;
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 50px;
`;

const Photo = styled.img`
  max-width: 185px;
  height: auto;
  border-radius: 4px;
  border: 1px solid #b7bcd6;
`;

const CloseIcon = styled.img`
  margin-left: 7px;
  cursor: pointer;
`;
