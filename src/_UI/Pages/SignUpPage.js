import React, { useState } from "react";
import RegisterHead from "../components/RegisterHead";
import RegisterFormTemplate from "../templates/RegisterFormTemplate";
import styled from "styled-components";
import { Form, Formik } from "formik";
import BaseFormikRadioButton from "../components/base/BaseFormikRadioButton";
import PartTwo from "../components/SignUpFormParts/PartTwo";
import PartOne from "../components/SignUpFormParts/PartOne";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { companySignUp } from "../../_BLL/reducers/authReducer";

const phoneRegex = /^(\+)([0-9]){10,13}$/;
const taxIdRegex = /^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/;
const zipCodeRegex = /^[a-zA-Z0-9](.){3,10}[a-zA-Z0-9]$/

const AgentValidationSchema = Yup.object().shape({
  name: Yup.string().required("Please, enter your company name"),
  master_email: Yup.string()
    .email("Invalid email")
    .required("Please, enter your email"),
  phone: Yup.string()
    .matches(phoneRegex, "Phone number is not valid")
    .required("Please, enter your phone number"),
  employees_number: Yup.number().required(
    "Please, enter your employees number"
  ),
  website: Yup.string().required("Please, enter your website"),
  address_line_first: Yup.string().required("Please, enter your address"),
  state: Yup.string().required("Please, enter your state"),
  city: Yup.string().required("Please, enter your city"),
  zip_code: Yup.string()
      .matches(zipCodeRegex, "Zip code has invalid format.")
      .required("Please, enter your zip code"),
  tax_id: Yup.string()
    .matches(taxIdRegex, "Tax id number must be in format 00.000.000/0000-00")
    .required("Please, enter your tax id number"),
  first_name: Yup.string().required("Please, enter your name"),
  last_name: Yup.string().required("Please, enter your last name"),
  master_phone: Yup.string()
    .matches(phoneRegex, "Phone number is not valid")
    .required("Please, enter your phone number"),
  email: Yup.string()
    .email("Invalid email")
    .required("Please, enter your email"),
  position: Yup.string().required("Please, enter your position"),
});

const ClientValidationSchema = Yup.object().shape({
  name: Yup.string().required("Please, enter your company name"),
  master_email: Yup.string()
    .email("Invalid email")
    .required("Please, enter your email"),
  phone: Yup.string()
    .matches(phoneRegex, "Phone number is not valid")
    .required("Please, enter your phone number"),
  address_line_first: Yup.string().required("Please, enter your address"),
  state: Yup.string().required("Please, enter your state"),
  city: Yup.string().required("Please, enter your city"),
  zip_code: Yup.string()
      .matches(zipCodeRegex, "Zip code has invalid format.")
      .required("Please, enter your zip code"),
  tax_id: Yup.string()
    .matches(taxIdRegex, "Tax id number must be in format 00.000.000/0000-00")
    .required("Please, enter your tax id number"),
  first_name: Yup.string().required("Please, enter your name"),
  last_name: Yup.string().required("Please, enter your last name"),
  master_phone: Yup.string()
    .matches(phoneRegex, "Phone number is not valid")
    .required("Please, enter your phone number"),
  email: Yup.string()
    .email("Invalid email")
    .required("Please, enter your email"),
  position: Yup.string().required("Please, enter your position"),
});

const SignUpPage = ({ openSignUp, openSignIn }) => {
  const dispatch = useDispatch();
  let error = useSelector((state) => state.auth.companySignUpError);

  let popupCallback = () => {
    openSignUp(false);
    openSignIn(true);
  };
  const [firstPage, changePage] = useState(true);

  return (
    <RegisterFormTemplate height_inner='920px' openFlow={() => openSignUp(false)}>
      <RegisterHead
        title="Register"
        buttonText="Log in"
        popupCallback={() => popupCallback()}
      />
      <FormWrapper>
        <Formik
          validationSchema={() =>
            Yup.lazy((values) =>
              values.type === "agent"
                ? AgentValidationSchema
                : ClientValidationSchema
            )
          }
          initialValues={{
            type: "client",
            name: "",
            address_line_first: "",
            address_line_second: "",
            state: "",
            city: "",
            zip_code: "",
            phone: "",
            tax_id: "",
            employees_number: 1,
            website: "",
            master_email: "",
            first_name: "",
            last_name: "",
            email: "",
            master_phone: "",
            position: "",
          }}
          onSubmit={(values) => {
            dispatch(companySignUp(values));
            console.log("submit", values);
          }}
        >
          {({ values }) => {
            return (
              <Form>
                {firstPage && (
                  <div style={{ marginBottom: "46px" }}>
                    <div style={{ marginBottom: 10 }}>
                      <BaseFormikRadioButton
                        label="Client"
                        value="client"
                        name="type"
                        formikValues={values}
                      />
                    </div>
                    <div>
                      <BaseFormikRadioButton
                        label="Agent"
                        value="agent"
                        name="type"
                        formikValues={values}
                      />
                    </div>
                  </div>
                )}
                {firstPage ? (
                  <PartOne error={error} changePage={changePage} />
                ) : (
                  <PartTwo error={error} changePage={changePage} />
                )}
              </Form>
            );
          }}
        </Formik>
      </FormWrapper>
    </RegisterFormTemplate>
  );
};

export default SignUpPage;

const FormWrapper = styled.div`
  padding-top: 25px;
`;
