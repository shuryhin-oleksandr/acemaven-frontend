import React, { useState } from "react";
import styled from "styled-components";
import { VoidFunctionType } from "../../../../_BLL/types/commonTypes";

type PropsType = {
  name?: string;
  inputref?: React.Ref<HTMLInputElement>;
  setIsCheck: (value: boolean) => void;
  isCheck: boolean;
  labelText?: string;
  color?: string;
};

const SearchCheckbox: React.FC<PropsType> = ({
  isCheck,
  setIsCheck,
  labelText,
  color,
  ...props
}) => {
  let handleChange = () => {
    isCheck ? setIsCheck(false) : setIsCheck(true);
  };
  return (
    <Container color={color}>
      <input
        {...props}
        type="checkbox"
        checked={isCheck}
        onChange={() => handleChange()}
        ref={props.inputref}
      />
      <span className="checkmark" />
      {labelText}
    </Container>
  );
};

export default SearchCheckbox;

const Container = styled.label`
  display: inline-flex;
  align-items: center;
  position: relative;
  cursor: pointer;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;

  font-family: ${({ color }) =>
    color === "#000000"
      ? "Helvetica Reg, sans-serif"
      : "Helvetica Light, sans-serif"};
  font-size: 16px;
  color: ${({ color }) => (color ? color : "#828282")};

  & input {
    position: absolute;
    opacity: 0;
    cursor: pointer;
    height: 0;
    width: 0;
  }
  .checkmark {
    display: inline-block;
    height: 19px;
    width: 19px;
    border: 2px solid #4f4f4f;
    margin-right: 8px;
  }
  .checkmark:after {
    content: "";
    position: absolute;
    display: none;
    left: 7px;
    top: 3px;
    width: 4px;
    height: 8px;
    border: solid #4f4f4f;
    border-width: 0 2px 2px 0;
    -webkit-transform: rotate(45deg);
    -ms-transform: rotate(45deg);
    transform: rotate(45deg);
  }
  & input:checked ~ .checkmark:after {
    display: block;
  }
`;
