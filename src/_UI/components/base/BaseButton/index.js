// Core
import styled from "styled-components";

const BaseButton = styled.button`
  height: 40px;
  background-color: ${({ background, disabled }) =>
    disabled ? "#7C7C89" : background ? background : "#000000"};
  color: ${({ textColor }) => (textColor ? textColor : "#FFFFFF")};
  //padding: 12px 39px;
  min-width: 146px;
  cursor: pointer;
  outline: none;
  border: none;
  text-transform: uppercase;
  font-family: "Helvetica Reg", sans-serif;
  font-size: 14px;
`;

export default BaseButton;
