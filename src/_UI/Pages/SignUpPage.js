import React, { useState } from "react";
import RegisterHead from "../components/RegisterHead";
import RegisterFormTemplate from "../templates/RegisterFormTemplate";
import styled from "styled-components";
import {Form, Formik } from "formik";
import BaseFormikInput from "../components/base/BaseFormikInput";
import PartTwo from "../components/SignUpFormParts/PartTwo";
import PartOne from "../components/SignUpFormParts/PartOne";
import * as Yup from "yup";
import {useDispatch} from "react-redux";
import {companySignUp} from "../../_BLL/reducers/authReducer";

const AgentValidationSchema = Yup.object().shape({
  name: Yup.string().required("Please, enter your company name"),
  master_email: Yup.string()
    .email("Invalid email")
    .required("Please, enter your email"),
  phone: Yup.number().required("Please, enter your phone number"),
  employees_number: Yup.number().required(
    "Please, enter your employees_number"
  ),
  website: Yup.string().required("Please, enter your Website"),
  address_line_first: Yup.string().required("Please, enter your address"),
  state: Yup.string().required("Please, enter your state"),
  city: Yup.string().required("Please, enter your city"),
  zip_code: Yup.number().required("Please, enter your Zip Code"),
  tax_id: Yup.string().required("Please, enter your Tax id Number"),
});

const ClientValidationSchema = Yup.object().shape({
  name: Yup.string().required("Please, enter your company name"),
  master_email: Yup.string()
    .email("Invalid email")
    .required("Please, enter your email"),
  phone: Yup.number().required("Please, enter your phone number"),
  address_line_first: Yup.string().required("Please, enter your address"),
  state: Yup.string().required("Please, enter your state"),
  city: Yup.string().required("Please, enter your city"),
  zip_code: Yup.number().required("Please, enter your Zip Code"),
  tax_id: Yup.string().required("Please, enter your Tax id Number"),
});

const SignUpPage = () => {
  const dispatch = useDispatch()

  const [firstPage, changePage] = useState(true);
  return (
    <RegisterFormTemplate>
      <RegisterHead
        title="Register"
        buttonText="Log in"
        redirectRoute="/sign-in"
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
            type: "",
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
          }}
          onSubmit={(values, { setSubmitting }) => {
            dispatch(companySignUp(values))
            console.log("submit", values);
          }}
        >
          {({ values, setFieldValue, resetForm }) => {
            return (
              <Form>
                {firstPage && (
                  <div style={{ marginBottom: "46px" }}>
                    <BaseFormikInput
                      name="type"
                      placeholder="Company Type"
                      component="select"
                      onChange={(e) => {
                        resetForm();
                        setFieldValue("type", e.target.value);
                      }}
                    >
                      <option value="">Company Type</option>
                      <option value="client">Client</option>
                      <option value="agent">Agent</option>
                    </BaseFormikInput>
                  </div>
                )}
                {values.type ? (
                  firstPage ? (
                    <PartOne changePage={changePage} />
                  ) : (
                    <PartTwo changePage={changePage} />
                  )
                ) : null}
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
  padding-top: 50px;
`;
