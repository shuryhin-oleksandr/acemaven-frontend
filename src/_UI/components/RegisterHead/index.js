import React from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { fonts } from "../../theming";

const RegisterHead = ({ title, buttonText, redirectRoute }) => {
  let history = useHistory();
  return (
    <Row>
      <Title>{title}</Title>
      <RedirectButton onClick={() => history.push(redirectRoute)}>
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
  ${fonts.helveticaNeu(28, 33, 0, 900)};
  color: #1b1b25;
`;

const RedirectButton = styled.div`
  ${fonts.helveticaNeu(20, 24, 0, 700)};
  cursor: pointer;
  color: #828282;
`;

export default RegisterHead;
