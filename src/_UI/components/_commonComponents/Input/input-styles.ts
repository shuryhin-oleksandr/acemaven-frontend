import styled, { keyframes } from "styled-components";

const showLabel = keyframes`
 0% {
  opacity: 0;
 }
 100% {
  opacity: 1;
 }
`;

type PropsStyle = {
  isFocus?: boolean;
  error?: string;
  maxW?: string;
  focusBack?: string;
  height?: string;
  marginBottom?: string
};

export const InputOuter = styled.div<PropsStyle>`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: ${({ maxW }) => (maxW ? maxW : "100%")};
  margin-bottom: ${({marginBottom}) => marginBottom ? marginBottom : '15px'};
`;
export const Field = styled.input<PropsStyle>`
  padding: 10px;
  color: #828282;
  font-size: 14px;
  font-family: "Helvetica Light", sans-serif;
  line-height: 17px;
  transition: 0.5s;
  max-width: ${({maxW}) => maxW ? maxW : '420px'};
  width: 100%;
  height: ${({height}) => height ? height : '40px'};
  border: ${({ error }) => (error ? "1px solid #7C7C89" : "1px solid #BDBDBD")};
  border-radius: 4px;
  outline: none;
  background: ${({ error }) => (error ? "#ECECEC" : "white")};

  &:focus {
    transition: 0.5s;
    border: 1px solid #7c7c89;
    background-color: ${({ focusBack }) => (focusBack ? focusBack : "white")};
  }

  &::placeholder {
    transition: 0.5s;
    color: #828282;
    font-size: 14px;
    font-family: "Helvetica Light", sans-serif;
    line-height: 17px;
  }
  &:focus::placeholder {
    opacity: 0;
    transition: 0.5s;
  }
`;

export const Label = styled.div<PropsStyle>`
  font-family: "Helvetica Reg", sans-serif;
  font-size: 14px;
  color: black;
  margin-bottom: 9px;
  opacity: 1;
  animation: ${showLabel} ease-in-out 0.3s;
`;
export const HelperText = styled.div`
  padding-top: 9px;
  color: red;
  font-family: "Helvetica Reg", sans-serif;
  width: 100%;
  text-align: end;
  font-size: 12px;
`;
