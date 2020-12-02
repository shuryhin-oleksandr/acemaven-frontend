import styled, { keyframes } from "styled-components";

const openPopup = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  } 
`;

export const PopupOuter = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 50;
  animation: ${openPopup} ease-in-out 0.3s;
  padding: 130px 0;
`;

export const Content = styled.div`
  background-color: white;
  height: 400px;
  width: 100%;
  max-width: 800px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const Question = styled.div`
  font-family: "Helvetica Reg", sans-serif;
  font-size: 18px;
  margin-bottom: 100px;
`;

export const ButtonGroup = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

export const RegisterButton = styled.button`
  height: 40px;
  width: 115px;
  outline: none;
  border: none;
  background-color: black;
  color: white;
  font-family: "Helvetica Reg", sans-serif;
  font-size: 14px;
  margin-right: 15px;
  cursor: pointer;
`;
