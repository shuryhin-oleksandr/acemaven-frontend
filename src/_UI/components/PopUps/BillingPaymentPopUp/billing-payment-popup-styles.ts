import styled, { keyframes } from "styled-components";

const shownPopup = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;

export const PopUpWrapper = styled.div`
  padding-top: 100px;
  padding-bottom: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 600;
  animation: ${shownPopup} ease-in-out 0.3s;
`;

export const PopUpInner = styled.div`
  max-width: 900px;
  width: 100%;
  background-color: white;
  position: relative;
  padding: 35px 25px;
`;

export const ButtonsWrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
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
`;

export const Heading = styled.div`
  font-family: "Helvetica Bold", sans-serif;
  font-weight: bold;
  font-size: 36px;
  color: #000000;
  margin-bottom: 17px;
`;

export const Title = styled.div`
  color: #1ab8e5;
  font-family: "Helvetica Bold", sans-serif;
  font-size: 20px;
  line-height: 23px;
  width: 100%;
`;
