// Core
import styled from "styled-components";


const BaseNextButton = styled.button`
display: flex;
align-items: center;
justify-content: center;
  height: 40px;
  background-color: ${({ background, disabled }) =>
    disabled ? "#7C7C89" : background ? background : "#000000"};
  color: ${({ textColor }) => (textColor ? textColor : "#FFFFFF")};
  font-family: "Helvetica Reg", sans-serif;
  font-size: 14px;
  max-width: 140px;
  min-width: 115px;
  width: 100%;
  cursor: pointer;
  outline: none;
  border: none;
  position: relative;
  
`;

export default BaseNextButton;
