import React from "react";
import styled from "styled-components";
import close_icon from "../../../_UI/assets/icons/close-icon.svg";

const RegisterFormTemplate = ({ children, openFlow, height_inner }) => {
  return (
    <Container >
      <ContentWrapper height_inner={height_inner}>
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
  width: 100%;
  height: 100%;
  position: absolute;
  background-color: rgba(0, 0, 0, 0.3);
  display: flex;
  padding-top: 35px;
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
  overflow: scroll;
  height: ${({height_inner}) => height_inner ? height_inner : '430px'};
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
