import React from "react";
import styled from "styled-components";

const RegisterFormTemplate = ({ children }) => {
  return (
    <Container>
      <ContentWrapper>{children}</ContentWrapper>
    </Container>
  );
};

export default RegisterFormTemplate;

const Container = styled.div`
  width: 100%;
  min-height: 100vh;
  position: absolute;
  background-color: rgba(0, 0, 0, 0.3);
  display: flex;
  padding: 35px 0;
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
`;
