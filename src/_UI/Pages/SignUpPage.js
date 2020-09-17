import React, { useState } from "react";
import RegisterHead from "../components/RegisterHead";
import RegisterFormTemplate from "../templates/RegisterFormTemplate";
import styled from "styled-components";
import {Form, Formik } from "formik";
import BaseFormikInput from "../components/base/BaseFormikInput";
import PartTwo from "../components/SignUpFormParts/PartTwo";
import PartOne from "../components/SignUpFormParts/PartOne";

const SignUpPage = () => {
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
          initialValues={{
            companyType: "",
            companyName: "",
            address1: "",
            address2: "",
            state: "",
            city: "",
            zipCode: "",
            phone: "",
            email: "",
            taxId: "",
            employees: "",
            website: "",
          }}
          onSubmit={(values, { setSubmitting }) => {
            console.log("values", values);
          }}
        >
          {({ values, setFieldValue, resetForm }) => {
            console.log("values", values);
            return (
              <Form>
                {firstPage && (
                  <div style={{ marginBottom: "46px" }}>
                    <BaseFormikInput
                      name="companyType"
                      placeholder="Company Type"
                      component="select"
                      onChange={(e) => {
                        resetForm();
                        setFieldValue("companyType", e.target.value);
                      }}
                    >
                      <option value="">Company Type</option>
                      <option value="client">Client</option>
                      <option value="agent">Agent</option>
                    </BaseFormikInput>
                  </div>
                )}
                {values.companyType ? (
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

