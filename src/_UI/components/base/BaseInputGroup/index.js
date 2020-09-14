import React from "react";
import styled from "styled-components";
import BaseFormikInput from "../BaseFormikInput";
import fonts from "../../../theming/fonts";

const BaseInputGroup = ({ values, name, placeholder, labelText, marginBot, ...props }) => {
  return (
    <Wrapper marginBot={marginBot}>
      {values[name] && labelText && <Label>{labelText}</Label>}
      <BaseFormikInput {...props} placeholder={placeholder} name={name} />
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
