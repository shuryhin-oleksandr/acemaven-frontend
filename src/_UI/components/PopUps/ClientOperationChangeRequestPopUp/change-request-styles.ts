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
  align-items: flex-start;
  justify-content: center;
  z-index: 600;
  animation: ${shownPopup} ease-in-out 0.3s;
  padding: 100px 0;
`;

export const PopupContent = styled.div`
  background-color: white;
  max-width: 1050px;
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 50px;
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
  font-family: "Helvetica Bold", sans-serif;
  font-size: 16px;
  margin-bottom: 100px;
`;
export const ButtonsWrap = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;
export const CancelButton = styled.button`
  height: 40px;
  width: 100%;
  max-width: 165px;
  border: 1px solid #3b3b41;
  background-color: transparent;
  color: #3b3b41;
  transition: 0.3s;
  font-family: "Helvetica Reg", sans-serif;
  font-size: 14px;
  margin: 0 15px;
  outline: none;

  &:hover {
    cursor: pointer;
    background-color: rgba(0, 0, 0, 0.07);
    transition: 0.3s;
  }
`;

export const Heading = styled.div`
  font-size: 18px;
  font-family: "Helvetica Bold", sans-serif;
  margin-bottom: 20px;
`;

export const HeadingText = styled.div`
  font-size: 14px;
  font-family: "Helvetica Light", sans-serif;
`;

export const HeadingWrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-items: center;
  align-items: center;
`;
