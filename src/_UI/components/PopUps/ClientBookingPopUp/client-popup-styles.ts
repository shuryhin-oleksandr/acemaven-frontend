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
  padding-top: 100px;
  padding-bottom: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 600;
  animation: ${shownPopup} ease-in-out 0.3s;
`;

export const PopupContent = styled.div`
  background-color: white;
  max-width: 800px;
  width: 100%;
  padding: 35px 25px;
  position: relative;
`;

export const Heading = styled.div`
  font-family: "Helvetica Bold", sans-serif;
  font-weight: bold;
  font-size: 36px;
  color: #000000;
  margin-bottom: 17px;
`;

export const Wrapper = styled.div`
  border-top: 1px solid #7c7c89;
  padding-top: 20px;
`;

export const HeadingFormWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
`;

export const HeadingFormText = styled.div`
  font-family: "Helvetica Light", sans-serif;
  font-size: 14px;
  color: #000000;
`;

export const InputGroupName = styled.div`
  font-family: "Helvetica Bold", sans-serif;
  font-size: 20px;
  text-transform: uppercase;
  color: #1ab8e6;
  margin-bottom: 24px;
`;

export const ColName = styled.div`
  font-family: "Helvetica Bold", sans-serif;
  font-size: 14px;
  text-transform: uppercase;
  color: #115b86;
`;

export const FlexWrapper = styled.div`
  display: flex;
  margin-bottom: 10px;
`;

export const RowWrapper = styled.div`
  display: flex;
  align-items: baseline;
  margin-bottom: 10px;
  padding: 20px 0;
  border: 1px solid #bdbdbd;
  box-sizing: border-box;
  max-width: 650px;
`;

export const ContainerInfo = styled.div`
  font-family: "Helvetica Bold", sans-serif;
  font-size: 17px;
  color: #333333;
  padding-left: 25px;
`;

export const InputsWrapper = styled.div`
  padding-right: 30px;
`;

export const BackButton = styled.button`
  height: 40px;
  padding: 0 39px;
  background: #7c7c89;
  font-size: 14px;
  text-transform: uppercase;
  font-family: "Helvetica Reg", sans-serif;
  color: #ffffff;
  border: none;
  outline: none;
  margin-right: 15px;
  cursor: pointer;
`;

export const DocumentationSection = styled.div`
  padding-top: 20px;
  border-top: 1px solid #bdbdbd;
  margin-top: 25px;
`;

export const DocumentationRow = styled.div`
  padding-right: 140px;
  display: flex;
  justify-content: space-between;
`;

export const DocumentationCol = styled.div`
  width: 48%;
`;
