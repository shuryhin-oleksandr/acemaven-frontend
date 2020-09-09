import React from "react";
import styled from "styled-components";
import BaseFormikInput from "../BaseFormikInput";
import fonts from "../../../theming/fonts";

const BaseInputGroup = ({ values, name, placeholder, labelText, ...props }) => {
  return (
    <Wrapper>
      {values[name] && labelText && <Label>{labelText}</Label>}
      <BaseFormikInput {...props} placeholder={placeholder} name={name} />
    </Wrapper>
  );
};

export default BaseInputGroup;
const Wrapper = styled.div`
  position: relative;
`;

const Label = styled.span`
  position: absolute;
  top: -25px;
  ${fonts.archivoBlack(14, 15)};
  color: #1b1b25;
`;
