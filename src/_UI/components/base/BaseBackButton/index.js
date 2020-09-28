// Core
import React from "react";
import styled from "styled-components";


const BaseBackButton = ({ onClick }) => {
  return <StyledButton onClick={onClick}>BACK</StyledButton>;
};

export default BaseBackButton;

const StyledButton = styled.button`
  outline: none;
  background: none;
  border: 1px solid #3B3B41;
  width: 130px;
  height: 40px;
  transition: .3s;
  font-family: "Helvetica Reg", sans-serif;
  font-size: 14px;
  color: #3B3B41;
  
  &:hover {
    cursor: pointer;
    transition: .3s;
    background-color: #1B1B25;
    color: black;
  };
`;
