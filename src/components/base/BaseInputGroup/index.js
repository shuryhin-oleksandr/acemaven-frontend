import React, { useState } from "react";
import styled from "styled-components";
import BaseFormikInput from "../BaseFormikInput";
import fonts from "../../../theming/fonts";
import { ErrorMessage } from "formik";
import Eye from "../../../assets/icons/password-eye.svg";

const BaseInputGroup = ({
  values,
  name,
  placeholder,
  labelText,
  marginBot,
  withoutErrorMessage,
  withEye,
  type,
  ...props
}) => {
  const [inputType, changeInputType] = useState(type);
  return (
    <Wrapper marginBot={marginBot}>
      {values[name] && labelText && (
        <Label for={values[name]}>{labelText}</Label>
      )}
      {withEye && (
        <EyeImage
          src={Eye}
          alt="eye"
          onClick={() =>
            changeInputType(inputType === "password" ? "text" : "password")
          }
        />
      )}
      <BaseFormikInput
        {...props}
        type={inputType}
        placeholder={placeholder}
        name={name}
        id={values[name]}
      />
      {withoutErrorMessage ? null : (
        <ErrorMessage name={name} component={Error} />
      )}
    </Wrapper>
  );
};

export default BaseInputGroup;
const Wrapper = styled.div`
  position: relative;
  margin-bottom: ${({ marginBot }) => (marginBot ? `${marginBot}px` : 0)};
`;

const Label = styled.label`
  position: absolute;
  top: -25px;
  ${fonts.archivoBlack(14, 15)};
  color: #1b1b25;
`;

const Error = styled.div`
  position: absolute;
  right: 0;
  margin-top: 5px;
  ${fonts.raleway(12, 14)};
  color: #e76767;
`;

const EyeImage = styled.img`
  position: absolute;
  right: 9px;
  top: 15px;
  cursor: pointer;
`;
