import React from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";

type PropsType = {
  text?: string;
  back?: string;
  w?: string;
  textColor?: string;
  path: string;
  border?: string;
  h?: string;
  fontSize?: string;
  hover_color?: string;
  callback?: any;
};

const RouteButton: React.FC<PropsType> = ({
  hover_color,
  fontSize,
  h,
  border,
  text,
  back,
  w,
  textColor,
  path,
  callback,
}) => {
  return (
    <div style={{ textDecoration: "none" }}
             // to={path}
    >
      <ButtonWrap
        fontSize={fontSize}
        h={h}
        border={border}
        back={back}
        w={w}
        textColor={textColor}
        hover_color={hover_color}
        onClick={() => {
          callback && callback();
        }}
      >
        {text}
      </ButtonWrap>
    </div>
  );
};

export default RouteButton;

type PropsStyle = {
  back?: string;
  w?: string;
  textColor?: string;
  border?: string;
  h?: string;
  fontSize?: string;
  hover_color?: string;
};

const ButtonWrap = styled.button<PropsStyle>`
  outline: none;
  background-color: ${({ back }) => (back ? back : "#00C5FF;")};
  color: ${({ textColor }) => (textColor ? textColor : "black")};
  font-family: "Helvetica Reg", sans-serif;
  font-size: ${({ fontSize }) => (fontSize ? fontSize : "18px")};
  height: ${({ h }) => (h ? h : "51px")};
  width: ${({ w }) => (w ? w : "203px")};
  border: ${({ border }) => (border ? border : "none")};
  display: flex;
  align-items: center;
  justify-content: center;
  transition: 0.3s;

  &:hover {
    cursor: pointer;
    transition: 0.3s;
    background-color: ${({ hover_color }) => hover_color && hover_color};
  }
`;
