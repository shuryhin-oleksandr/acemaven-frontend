import styled, { keyframes } from "styled-components";

const shown_anim = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;

export const Container = styled.div`
  background: #ffffff;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.25);
  border-radius: 7px;
  padding: 15px;
  margin-bottom: 15px;
  animation: ${shown_anim} ease-in-out 0.3s;
`;

export const Heading = styled.h1`
  margin: 0;
  padding-bottom: 7px;
  font-size: 18px;
  line-height: 21px;
  font-family: "Helvetica Bold", sans-serif;
  letter-spacing: 2px;
  text-transform: uppercase;
`;
