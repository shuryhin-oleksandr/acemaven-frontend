//Core
import React, { useState } from "react";
import styled from "styled-components";

//Instruments
import { Formik, Form, ErrorMessage } from "formik";
import { fonts } from "../../theming";

//Components
import RegisterFormTemplate from "../../templates/RegisterFormTemplate";
import BaseButton from "../base/BaseButton";
import BaseInputGroup from "../base/BaseInputGroup";
import DropZone from "../DropZone";
import Close from "../../assets/icons/close-icon.svg";

const CreateAccountPage = () => {
  const [img, setImg] = useState("");
  return (
    <RegisterFormTemplate>
      <Heading>Create a Master Account</Heading>
      <FormWrapper>
        <Formik
          initialValues={{
            name: "",
            lastName: "",
            email: "",
            password: "",
            confirmPassword: "",
            phone: "",
            position: ""
          }}
          onSubmit={(values, { setSubmitting }) => {
            console.log("values", values);
          }}
        >
          {({ values }) => {
            console.log("values", values);
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
                    />
                    <ErrorMessage name="email" component="div" />
                  </RowItem>
                  <RowItem>
                    <BaseInputGroup
                      name="lastName"
                      placeholder="Last Name"
                      values={values}
                      labelText="Last Name"
                      marginBot={46}
                    />
                    <ErrorMessage name="password" component="div" />
                  </RowItem>
                </Row>
                <BaseInputGroup
                  name="email"
                  placeholder="Email"
                  values={values}
                  labelText="Email"
                  marginBot={46}
                />
                <BaseInputGroup
                  name="password"
                  placeholder="Password"
                  values={values}
                  labelText="Password"
                  type="password"
                  marginBot={46}
                />
                {values.password && (
                  <div style={{ marginTop: "-16px" }}>
                    <BaseInputGroup
                      name="confirmPassword"
                      placeholder="Confirm password"
                      values={values}
                      type="password"
                      marginBot={57}
                    />
                  </div>
                )}
                <BaseInputGroup
                  name="phone"
                  placeholder="Phone number"
                  values={values}
                  labelText="Phone number"
                  marginBot={46}
                />
                <BaseInputGroup
                  name="position"
                  placeholder="Position in the company"
                  values={values}
                  labelText="Position in the company"
                  marginBot={46}
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
                  <BaseButton type="submit">Create a Master account</BaseButton>
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
  ${fonts.raleway(28, 33)}
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
`;

const CloseIcon = styled.img`
  margin-left: 7px;
  cursor: pointer;
`;
