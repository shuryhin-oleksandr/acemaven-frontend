// Core
import React from "react";
import styled, { css } from "styled-components";
import { Field } from "formik";

const BaseFormikRadioButton = ({ label, name, value, formikValues }) => {
  return (
    <StyledLabel formikValues={formikValues} value={value} name={name}>
      <HiddenRadio type="radio" name={name} value={value} />
      <StyledRadio>
        {formikValues[name] === value && <InnerCircle />}
      </StyledRadio>
      {label}
    </StyledLabel>
  );
};

export default BaseFormikRadioButton;

const StyledLabel = styled.label`
  color: ${({ formikValues, value, name }) =>
    formikValues[name] === value ? "#115B86" : "#7C7C89"};
  font-weight: ${({ formikValues, value, name }) =>
    formikValues[name] === value ? "400" : "300"};
  display: flex;
  align-items: center;
`;

const HiddenRadio = styled(Field)`
  display: none;
`;

const StyledRadio = styled.div`
  height: 16px;
  width: 16px;
  border: 1px solid;
  border-radius: 8px;
  margin-right: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const InnerCircle = styled.div`
  height: 10px;
  width: 10px;
  border-radius: 5px;
  background-color: #115b86;
`;
