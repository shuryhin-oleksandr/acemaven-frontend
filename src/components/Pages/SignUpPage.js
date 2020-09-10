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

                        <BaseInputGroup
                          name="companyName"
                          placeholder="Company Name"
                          values={values}
                          labelText="Company Name"
                          marginBot={46}
                        />
                        <BaseInputGroup
                          name="address1"
                          placeholder="Address Line 1"
                          values={values}
                          labelText="Address"
                          marginBot={15}
                        />
                        <BaseInputGroup
                          name="address2"
                          placeholder="Address Line 2 (optional)"
                          values={values}
                          marginBot={46}
                        />
                        <BaseInputGroup
                          name="state"
                          placeholder="State"
                          values={values}
                          labelText="State"
                          marginBot={46}
                        />
                        <BaseInputGroup
                          name="city"
                          placeholder="City"
                          values={values}
                          labelText="City"
                          marginBot={46}
                        />
                        <BaseInputGroup
                          name="zipCode"
                          placeholder="Zip Code"
                          values={values}
                          labelText="Zip Code"
                          marginBot={46}
                        />
                        <BaseInputGroup
                          name="phone"
                          placeholder="Phone number"
                          values={values}
                          labelText="Phone number"
                          marginBot={46}
                        />
                        <BaseInputGroup
                          name="email"
                          placeholder="Email"
                          values={values}
                          labelText="Email"
                          marginBot={46}
                        />
                        <BaseInputGroup
                          name="taxId"
                          placeholder="Tax id Number"
                          values={values}
                          labelText="Tax id Number"
                          marginBot={46}
                        />
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

