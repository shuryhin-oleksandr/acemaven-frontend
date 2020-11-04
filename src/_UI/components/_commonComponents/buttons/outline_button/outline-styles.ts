import styled from 'styled-components'

type PropsStyle = {
    borderColor?: string,
    w?: string,
    button_background?: string,
    text_color?: string,
    margin_right?: string
}

export const Button = styled.button<PropsStyle>`
  outline: none;
  border: ${({borderColor}) => borderColor ? borderColor : '1px solid white'};
  text-transform: uppercase;
  color: ${({text_color}) => text_color ? text_color : 'white'};
  font-family: "Helvetica Reg", sans-serif;
  font-size: 16px;
  background: ${({button_background}) => button_background ? button_background : 'none'};
  height: 40px;
  width: ${({w}) => w ? w : '180px'};
  margin-right: ${({margin_right}) => margin_right ? margin_right : '0px'};
  
  &:hover {
    cursor: pointer;
  }
`