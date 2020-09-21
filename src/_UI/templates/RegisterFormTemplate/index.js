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
  min-height: 100vh;
  display: flex;
  justify-content: center;
  padding: 0 30px;
`;

const ContentWrapper = styled.div`
  max-width: 600px;
  width: 100%;
  padding: 90px;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.25);
`;
