import styled, { keyframes } from "styled-components";

const skelet_appear = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;

type PropsStyle = {
  mode?: string;
  w?: string;
  flex_direction?: string;
  top?: string;
  belong_to?: string;
  max_width?: string;
  small_size?: boolean;
};

export const Outer = styled.form`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 50px 80px 30px 30px;
  animation: ${skelet_appear} ease-in-out 0.4s;
`;

export const OptionsDeliveryWrapper = styled.div`
  margin-bottom: 20px;
  width: 150px;
`;

export const HeaderWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

export const ActionsWrapper = styled.div`
  display: flex;
`;

export const Cancel = styled.button<PropsStyle>`
  font-family: "Helvetica Reg", sans-serif;
  font-size: 14px;
  background: white;
  outline: none;
  border: 1px solid #3b3b41;
  height: 40px;
  max-width: ${({ w }) => (w ? w : "115px")};
  width: 100%;
  color: #3b3b41;
  transition: 0.3s;

  &:hover {
    transition: 0.3s;
    background-color: #e0e0e0;
    cursor: pointer;
  }
`;
export const RegisterButton = styled.button`
  outline: none;
  border: none;
  background-color: black;
  color: white;
  font-family: "Helvetica Reg", sans-serif;
  font-size: 14px;
  height: 40px;
  width: 170px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 15px;
  padding: 0;

  &:hover {
    cursor: pointer;
  }
`;
export const FormTitle = styled.div`
  font-family: "Helvetica Bold", sans-serif;
  color: black;
  font-size: 48px;
  margin-bottom: 35px;
`;
export const OptionsButtonsWrap = styled.div<PropsStyle>`
  min-width: 150px;
  max-width: ${({ max_width }) => (max_width ? max_width : "unset")};
  height: ${({ small_size }) => (small_size ? "31px" : "40px")};
  background-color: #ececec;
  border-radius: 2px;
  border: 1px solid #ececec;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 5px;
`;
export const OptionButton = styled.div<PropsStyle>`
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 68px;
  max-width: 68px;
  height: ${({ small_size }) => (small_size ? "23px" : "32px")};
  background-color: ${({ mode }) =>
    mode === "sea" ? "#1AB8E5" : "transparent"};
  border-radius: 2px;
  box-shadow: ${({ mode }) =>
    mode === "sea" && "1px 1px 4px rgba(0, 0, 0, 0.25)"};
  transition: 0.3s;
  font-family: "Helvetica Reg", sans-serif;

  &:hover {
    cursor: pointer;
  }
`;
export const OptionButtonPlane = styled.div<PropsStyle>`
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 68px;
  max-width: 68px;
  height: ${({ small_size }) => (small_size ? "23px" : "32px")};
  background-color: ${({ mode }) =>
    mode === "air" ? "#1AB8E5" : "transparent"};
  border-radius: 2px;
  box-shadow: ${({ mode }) =>
    mode === "air" && "1px 1px 4px rgba(0, 0, 0, 0.25)"};
  transition: 0.3s;
  font-family: "Helvetica Reg", sans-serif;
  color: ${({ mode }) => (mode === "air" ? "#1AB8E5" : "transparent")};

  &:hover {
    cursor: pointer;
  }
`;

export const FormWrap = styled.div`
  display: flex;
  flex-direction: column;
  border-bottom: 1px solid #115b86;
  padding-bottom: 20px;
`;

export const FormContent = styled.div`
  display: flex;
  width: 100%;
`;
export const GroupWrap = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 420px;
  width: 100%;
  margin-right: 70px;
`;

export const LineWrap = styled.div`
  height: 1px;
  background-color: #115b86;
`;
export const UnderTitle = styled.div`
  font-family: "Helvetica Light", sans-serif;
  color: #1b1b25;
  font-size: 24px;
  width: 100%;
  text-align: center;
  padding-top: 35px;
`;

export const PortsList = styled.div<PropsStyle>`
  display: flex;
  flex-direction: column;
  width: 100%;
  background-color: white;
  padding: 5px 2px;
  word-break: break-word;
  z-index: 10;
`;

export const Port = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  font-family: "Helvetica Reg", sans-serif;
  color: #7c7c89;
  font-size: 14px;
  transition: 0.3s;
  padding: 0 5px;
  border-radius: 5px;

  &:hover {
    cursor: pointer;
    color: white;
    background-color: #115b86;
    transition: 0.3s;
  }
`;

export const SurchargesDatesFilter = styled.div<PropsStyle>`
  display: flex;
  flex-direction: ${({ flex_direction }) =>
    flex_direction ? flex_direction : "column"};
`;
export const ErrorChargesServerMessage = styled.div<{ text_align?: string }>`
  width: 100%;
  padding-top: 5px;
  padding-bottom: 5px;
  text-align: ${({ text_align }) => (text_align ? text_align : "end")};
  color: #e76767;
  font-family: "Helvetica Reg", sans-serif;
  font-size: 14px;
`;
