// Core
import styled from "styled-components";
import { fonts } from "../../../theming";

const BaseButton = styled.button`
  height: 39px;
  background-color: ${({ background, disabled }) =>
    disabled ? "#7C7C89" : background ? background : "#000000"};
  color: ${({ textColor }) => (textColor ? textColor : "#FFFFFF")};
  padding: 12px 39px;
  cursor: pointer;
  outline: none;
  border: none;
  ${fonts.archivoBlack(14, 15)};
`;

export default BaseButton;
