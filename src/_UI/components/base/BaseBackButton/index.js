// Core
import React from "react";
import styled from "styled-components";
import Back from "../../../assets/icons/back-button.svg";

const BaseBackButton = ({ onClick }) => {
  return <StyledImg src={Back} alt="back" onClick={onClick} />;
};

export default BaseBackButton;

const StyledImg = styled.img`
  cursor: pointer;
`;
