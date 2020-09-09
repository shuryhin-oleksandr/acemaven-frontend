import React from "react";
import RegisterHead from "../RegisterHead";
import RegisterFormTemplate from "../../templates/RegisterFormTemplate";
import styled from "styled-components";
import { ErrorMessage, Form, Formik } from "formik";
import BaseInputGroup from "../base/BaseInputGroup";
import BaseFormikInput from "../base/BaseFormikInput";
import BaseButton from "../base/BaseButton";

const SignUpPage = () => {
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
          }}
          onSubmit={(values, { setSubmitting }) => {
            console.log("values", values);
          }}
        >
          {({ values }) => {
            console.log("values", values);
            return (
              <Form>
                <div style={{ marginBottom: "46px" }}>
                  <BaseFormikInput
                    name="companyType"
                    placeholder="Company Type"
                    component="select"
                  >
                    <option value="">Company Type</option>
                    <option value="client">Client</option>
                    <option value="agent">Agent</option>
                  </BaseFormikInput>
                </div>
                {values.companyType ? (
                  values.companyType === "client" ? (
                    <>
                      <InputWrap>
                        <BaseInputGroup
                          name="companyName"
                          placeholder="Company Name"
                          values={values}
                          labelText="Company Name"
                        />
                      </InputWrap>
                      <div style={{ marginBottom: "15px" }}>
                        <BaseInputGroup
                          name="address1"
                          placeholder="Address Line 1"
                          values={values}
                          labelText="Address"
                        />
                      </div>
                      <InputWrap>
                        <BaseInputGroup
                          name="address2"
                          placeholder="Address Line 2 (optional)"
                          values={values}
                        />
                      </InputWrap>
                      <InputWrap>
                        <BaseInputGroup
                          name="state"
                          placeholder="State"
                          values={values}
                          labelText="State"
                        />
                      </InputWrap>
                      <InputWrap>
                        <BaseInputGroup
                          name="city"
                          placeholder="City"
                          values={values}
                          labelText="City"
                        />
                      </InputWrap>
                      <InputWrap>
                        <BaseInputGroup
                          name="zipCode"
                          placeholder="Zip Code"
                          values={values}
                          labelText="Zip Code"
                        />
                      </InputWrap>
                      <InputWrap>
                        <BaseInputGroup
                          name="phone"
                          placeholder="Phone number"
                          values={values}
                          labelText="Phone number"
                        />
                      </InputWrap>
                      <InputWrap>
                        <BaseInputGroup
                          name="email"
                          placeholder="Email"
                          values={values}
                          labelText="Email"
                        />
                      </InputWrap>
                      <InputWrap>
                        <BaseInputGroup
                          name="taxId"
                          placeholder="Tax id Number"
                          values={values}
                          labelText="Tax id Number"
                        />
                      </InputWrap>
                      <ButtonWrapper>
                        <BaseButton type="submit">
                          Create new account
                        </BaseButton>
                      </ButtonWrapper>
                    </>
                  ) : (
                    <h1>Agent</h1>
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

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 50px;
`;

const InputWrap = styled.div`
  margin-bottom: 46px;
`;
