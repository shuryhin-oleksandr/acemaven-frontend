//Core
import React, { useState } from "react";
import styled from "styled-components";

//Instruments
import { Formik, Form, ErrorMessage } from "formik";
import { fonts } from "../../theming";
import * as Yup from "yup";

//Components
import RegisterFormTemplate from "../../templates/RegisterFormTemplate";
import BaseButton from "../base/BaseButton";
import BaseInputGroup from "../base/BaseInputGroup";
import DropZone from "../DropZone";
import Close from "../../assets/icons/close-icon.svg";

const ValidationSchema = Yup.object().shape({
  name: Yup.string().required("Please, enter your name"),
  lastName: Yup.string().required("Please, enter your last name"),
  email: Yup.string()
    .email("Invalid email")
    .required("Please, enter your email"),
  password: Yup.string().required("Please, enter your password"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Please, confirm your password"),
  phone: Yup.number().required("Please, enter your phone number"),
  position: Yup.string().required("Please, enter your position"),
});

const CreateAccountPage = () => {
  const [img, setImg] = useState("");
  return (
    <RegisterFormTemplate>
      <Heading>Create a Master Account</Heading>
      <FormWrapper>
        <Formik
          validationSchema={ValidationSchema}
          initialValues={{
            name: "",
            lastName: "",
            email: "",
            password: "",
            confirmPassword: "",
            phone: "",
            position: "",
          }}
          onSubmit={(values, { setSubmitting }) => {
            console.log("values", values);
          }}
        >
          {({ values, touched, errors }) => {
            const hasErrors = Object.keys(errors).length > 0;
            const isButtonDisabled =
              !values.name ||
              !values.lastName ||
              !values.email ||
              !values.password ||
              !values.confirmPassword ||
              !values.phone ||
              !values.position ||
              hasErrors;
            return (
              <Form>
                <Row>
                  <RowItem>
                    <BaseInputGroup
                      name="name"
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
                      name="lastName"
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
                  valid={touched.email && !errors.email}
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
                      name="confirmPassword"
                      placeholder="Confirm password"
                      values={values}
                      type="password"
                      marginBot={57}
                      valid={touched.confirmPassword && !errors.confirmPassword}
                      error={touched.confirmPassword && errors.confirmPassword}
                    />
                  </div>
                )}
                <BaseInputGroup
                  name="phone"
                  placeholder="Phone number"
                  values={values}
                  type="number"
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
                {img ? (
                  <div style={{ display: "flex", alignItems: "flex-start" }}>
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
                  <DropZone setImg={setImg} />
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
    </RegisterFormTemplate>
  );
};

export default CreateAccountPage;

const Heading = styled.h1`
  margin: 0;
  ${fonts.helveticaNeu(28, 33, 0, 900)}
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
