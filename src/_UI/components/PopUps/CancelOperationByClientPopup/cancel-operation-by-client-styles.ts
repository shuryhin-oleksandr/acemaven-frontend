import styled, { keyframes } from "styled-components";

const shownPopup = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;

export const CancelOperationByClientWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 600;
  animation: ${shownPopup} ease-in-out 0.3s;
  padding: 100px 0;
`;

export const CancelOperationByClientInner = styled.div`
  max-width: 800px;
  width: 100%;
  background-color: white;
  position: relative;
  padding: 60px 99px;
`;

export const ButtonsWrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
`;
export const YesButton = styled.div`
  background-color: black;
  outline: none;
  border: none;
  color: white;
  height: 40px;
  width: 204px;
  font-family: "Helvetica Reg", sans-serif;
  font-size: 14px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 10px;
  text-transform: capitalize;

  &:hover {
    cursor: pointer;
  }
`;
export const CancelButton = styled.div`
  background-color: white;
  outline: none;
  border: 1px solid #4f4f4f;
  color: #4f4f4f;
  height: 40px;
  width: 190px;
  font-family: "Helvetica Reg", sans-serif;
  font-size: 14px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 10px;
  text-transform: capitalize;
  transition: 0.3s;

  &:hover {
    cursor: pointer;
    transition: 0.3s;
    background-color: rgba(0, 0, 0, 0.07);
  }
`;

export const Question = styled.div`
  max-width: 752px;
  width: 100%;
  font-family: "Helvetica Reg", sans-serif;
  font-size: 17px;
  line-height: 20.63px;
  color: #4f4f4f;
  margin-bottom: 25px;
  text-align: center;
`;
