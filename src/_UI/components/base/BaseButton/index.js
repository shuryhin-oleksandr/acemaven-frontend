// Core
import styled from "styled-components";

const BaseButton = styled.button`
  height: 39px;
  background-color: ${({ background, disabled }) =>
    disabled ? "#7C7C89" : background ? background : "#000000"};
  color: ${({ textColor }) => (textColor ? textColor : "#FFFFFF")};
  padding: 12px 39px;
  cursor: pointer;
  outline: none;
  border: none;
 font-family: "Helvetica Bold", sans-serif;
 font-size: 14px;
`;

export default BaseButton;
