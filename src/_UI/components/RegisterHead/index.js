import React from "react";
import styled from "styled-components";

const RegisterHead = ({ title, buttonText, popupCallback }) => {
  return (
    <Row>
      <Title>{title}</Title>
      <RedirectButton onClick={popupCallback}>
        {buttonText}
      </RedirectButton>
    </Row>
  );
};

const Row = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const Title = styled.div`
  font-family: "Helvetica Bold", sans-serif;
  font-size: 28px;
  color: #1b1b25;
`;

const RedirectButton = styled.div`
   font-family: "Helvetica Bold", sans-serif;
  font-size: 20px;
  cursor: pointer;
  color: #828282;
`;

export default RegisterHead;
