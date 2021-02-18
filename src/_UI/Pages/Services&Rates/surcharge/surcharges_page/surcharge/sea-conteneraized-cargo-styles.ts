import styled from 'styled-components'

type PropsStyle = {
    isFocus?: boolean;
    error?: string;
    maxW?: string;
    focusBack?: string;
    height?: string;
    marginBottom?: string;
    minWidth?: string
    max_width?: string
    max_height?: string,
    margin_left?: string
};

export const SeaContainer = styled.div<PropsStyle>`
  max-width: ${({minWidth}) => minWidth ? minWidth : '610px'};
  width: 100%;
  display: flex;
  flex-direction: column;
`
export const LineWrap = styled.div`
  width: 100%;
  max-width: 1289px;
  position: absolute;
  height: 1px;
  background-color: #E5E5E5;
  
`
export const HandlingSurchargeContainer = styled.div<PropsStyle>`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-top: 20px;
  padding-bottom: 40px;
  margin-left: ${({margin_left}) => margin_left ? margin_left : '0px'};
  max-width: ${({max_width}) => max_width ? max_width : '478px'};
  max-height: ${({max_height}) => max_height ? max_height : '420px'};
  min-height: 360px;
`
export const HandlingTitle = styled.div<{margin_bottom?: string}>`
  text-transform: uppercase;
  font-size: 20px;
  font-family: "Helvetica Bold", sans-serif;
  color: #1AB8E5;
  margin-bottom: ${({margin_bottom}) => margin_bottom ? margin_bottom : '24px'};
`

export const Field = styled.input<PropsStyle>`
  padding: 10px;
  color: #828282;
  font-size: 14px;
  font-family: "Helvetica Light", sans-serif;
  line-height: 17px;
  transition: 0.5s;
  max-width: 100px;
  width: 100%;
  height: ${({height}) => height ? height : '40px'};
  border: ${({ error }) => (error ? "1px solid #7C7C89" : "1px solid #BDBDBD")};
  border-radius: 4px;
  outline: none;
  background: ${({ error }) => (error ? "#ECECEC" : "white")};
  
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
export const SpanType = styled.div<{bold_hover?: boolean}>`
  transition: .3s;
  font-family: "Helvetica Light", sans-serif;
  &:hover {
    cursor: pointer;
    transition: .3s;
    font-family: ${({bold_hover}) => bold_hover ? "Helvetica Reg, sans-serif" : "Helvetica Light, sans-serif"};
  }
`