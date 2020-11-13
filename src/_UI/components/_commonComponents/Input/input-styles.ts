import styled from "styled-components";

type PropsStyle = {
  isFocus?: boolean;
  error?: string;
  maxW?: string;
  focusBack?: string;
  height?: string;
  marginBottom?: string;
  background?: string;
  messagePaddingTop?: string;
  color_label? : string
};

export const InputOuter = styled.div<PropsStyle>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  max-width: ${({ maxW }) => (maxW ? maxW : "100%")};
  margin-bottom: ${({ marginBottom }) =>
    marginBottom ? marginBottom : "15px"};
`;
export const Field = styled.input<PropsStyle>`
  padding: 10px;
  color: rgba(0, 0, 0, 0.8);
  font-size: 14px;
  font-family: "Helvetica Light", sans-serif;
  line-height: 17px;
  transition: 0.5s;
  max-width: ${({ maxW }) => (maxW ? maxW : "420px")};
  width: 100%;
  height: ${({ height }) => (height ? height : "40px")};
  border: ${({ error }) => (error ? "1px solid #7C7C89" : "1px solid #BDBDBD")};
  border-radius: 4px;
  outline: none;
  background: ${({ error, background }) =>
    background ? background : error ? "#ECECEC" : "white"};

  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
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
  color: ${({color_label}) => color_label ? color_label : 'black'};
  margin-bottom: 9px;
  opacity: 1;
`;
export const HelperText = styled.div<PropsStyle>`
  padding-top: ${({ messagePaddingTop }) =>
    messagePaddingTop ? messagePaddingTop : "9px"};
  color: #e76767;
  font-family: "Helvetica Reg", sans-serif;
  width: 100%;
  text-align: end;
  font-size: 12px;
`;
