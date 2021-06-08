import styled from "styled-components";

type PropsStyle = {
  isFocus?: boolean;
  error?: string;
  max_width?: string;
  focusBack?: string;
  height?: string;
  marginBottom?: string;
  background?: string;
  messagePaddingTop?: string;
  color_label?: string;
  font_weight?: string;
  label_uppercase?: boolean;
  min_height?: string;
  min_width?: string;
  without_border?: number;
  width?: string;
};

export const InputOuter = styled.div<PropsStyle>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width:  ${({width }) => (width ? width : "100%")};
  min-width: ${({ min_width }) => (min_width ? min_width : "unset")};
  max-width: ${({ max_width }) => (max_width ? max_width : "100%")};
  margin-bottom: ${({ marginBottom }) =>
    marginBottom ? marginBottom : "15px"};
  min-height: ${({ min_height }) => min_height && min_height};
`;
export const Field = styled.input<PropsStyle>`
  padding: 10px;
  color: rgba(0, 0, 0, 0.8);
  font-size: 14px;
  font-family: "Helvetica Reg", sans-serif;
  line-height: 17px;
  transition: 0.5s;
  max-width: ${({ max_width }) => (max_width ? max_width : "420px")};
  width: 100%;
  height: ${({ height }) => (height ? height : "40px")};
  border: ${({ error, without_border }) =>
    without_border ? "0" : error ? "1px solid #7C7C89" : "1px solid #BDBDBD"};
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
  &:disabled {
    background-color: #ececec;
    color: #7c7c89;
  }
`;

export const Label = styled.div<PropsStyle>`
  font-family: ${({ font_weight }) =>
    font_weight ? "Helvetica Bold, sans-serif" : "Helvetica ExtraReg, sans-serif"};
  font-size: 14px;
  color: ${({ color_label }) => (color_label ? color_label : "black")};
  margin-bottom: 9px;
  opacity: 1;
  text-transform: ${({ label_uppercase }) =>
    label_uppercase ? "uppercase" : "capitalize"};
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
