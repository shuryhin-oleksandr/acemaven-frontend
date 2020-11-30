import React from "react";
import styled from "styled-components";
import close_icon from "../../../_UI/assets/icons/close-icon.svg";

const RegisterFormTemplate = ({ children, openFlow }) => {
  return (
    <Container>
      <ContentWrapper>
        {children}
        <CloseIcon onClick={openFlow}>
          <img src={close_icon} alt="" />
        </CloseIcon>
      </ContentWrapper>
    </Container>
  );
};

export default RegisterFormTemplate;

const Container = styled.div`
  display: flex;
  padding: 100px 0;
  justify-content: center;
  align-items: flex-start;
  z-index: 600;
`;

const ContentWrapper = styled.div`
  max-width: 700px;
  width: 100%;
  padding: 40px 140px;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.25);
  background-color: #ffffff;
  position: relative;
`;
const CloseIcon = styled.button`
  outline: none;
  border: none;
  background: none;
  right: 20px;
  position: absolute;
  top: 25px;

  &:hover {
    cursor: pointer;
  }
`;
