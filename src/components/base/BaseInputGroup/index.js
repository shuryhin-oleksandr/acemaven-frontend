import React from "react";
import styled from "styled-components";
import BaseFormikInput from "../BaseFormikInput";
import fonts from "../../../theming/fonts";
import { ErrorMessage } from "formik";

const BaseInputGroup = ({
  values,
  name,
  placeholder,
  labelText,
  marginBot,
  withoutErrorMessage,
  ...props
}) => {
  return (
    <Wrapper marginBot={marginBot}>
      {values[name] && labelText && <Label>{labelText}</Label>}
      <BaseFormikInput {...props} placeholder={placeholder} name={name} />
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

const Label = styled.span`
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
