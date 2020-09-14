// Core
import styled from "styled-components";
import { fonts } from "../../../theming";

const BaseNextButton = styled.button`
  height: 40px;
  background-color: ${({ background, disabled }) =>
    disabled ? "#7C7C89" : background ? background : "#000000"};
  color: ${({ textColor }) => (textColor ? textColor : "#FFFFFF")};
  padding: 12px 25px 12px 34px;
  cursor: ${({ disabled }) => (disabled ? "auto" : "pointer")};
  outline: none;
  border: none;
  ${fonts.helveticaNeu(14, 17, 0, 900)};
  position: relative;
  :after {
    position: absolute;
    right: -20px;
    top: 0;
    content: "";
    width: 0;
    height: 0;
    border-style: solid;
    border-width: 20px 0 20px 20px;
    border-color: ${({ background, disabled }) =>
      disabled
        ? "transparent transparent transparent #7C7C89"
        : background
        ? background
        : "transparent transparent transparent #000000"};
  }
`;

export default BaseNextButton;
