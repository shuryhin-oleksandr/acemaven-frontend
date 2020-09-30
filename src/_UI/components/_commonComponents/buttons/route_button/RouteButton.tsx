import React from "react";
import styled from "styled-components";
import {NavLink} from "react-router-dom";

type PropsType = {
    text? : string,
    back?: string,
    w?: string,
    textColor?: string,
    path: string,
    border?: string
}

const RouteButton:React.FC<PropsType> = ({border, text, back, w, textColor, path}) => {
    return (
        <NavLink style={{textDecoration: 'none'}} to={path}>
            <ButtonWrap border={border} back={back} w={w} textColor={textColor}>{text}</ButtonWrap>
        </NavLink>
    )
}

export default RouteButton

type PropsStyle = {
    back?: string,
    w?: string,
    textColor?: string,
    border?: string
}

const ButtonWrap = styled.button<PropsStyle>`
  outline: none;
  background-color: ${({back}) => back ? back : '#00C5FF;'};
  color: ${({textColor}) => textColor ? textColor : 'black'};
  font-family: "Helvetica Reg", sans-serif;
  font-size: 18px;
  height: 51px;
  width: ${({w}) => w ? w : '203px'};
  border: ${({border}) => border ? border : 'none'};
  display: flex;
  align-items: center;
  justify-content: center;
  
  &:hover {
    cursor: pointer;
  }
`