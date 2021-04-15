import styled, { keyframes } from "styled-components";

const shownPopup = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;

export const PopupContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 600;
  padding-top: 100px;
  padding-bottom: 100px;
  animation: ${shownPopup} ease-in-out 0.3s;
`;

export const PopupContent = styled.div`
  background-color: white;
  max-width: 800px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 70px 50px 50px;
  position: relative;
`;

export const CloseBtn = styled.div`
  outline: none;
  background: none;
  border: none;
  position: absolute;
  top: 5%;
  right: 3%;

  &:hover {
    cursor: pointer;
  }
`;

export const CancelTitle = styled.div`
  color: black;
  font-family: "Helvetica Reg", sans-serif;
  font-size: 16px;
  margin-bottom: 80px;
`;
export const ButtonsWrap = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;
export const CancelButton = styled.button`
  height: 40px;
  border: 1px solid #3b3b41;
  background-color: transparent;
  color: #3b3b41;
  transition: 0.3s;
  font-family: "Helvetica Reg", sans-serif;
  font-size: 14px;
  margin: 0 15px;
  outline: none;
  padding: 0 30px;

  &:hover {
    cursor: pointer;
    background-color: rgba(0, 0, 0, 0.07);
    transition: 0.3s;
  }
`;

export const ContinueButton = styled.button`
  height: 40px;
  border: 1px solid #3b3b41;
  background-color: black;
  color: white;
  transition: 0.3s;
  font-family: "Helvetica Reg", sans-serif;
  font-size: 14px;
  margin: 0 15px;
  outline: none;
  padding: 0 30px;
`;
