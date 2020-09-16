import React from 'react'
import styled from "styled-components";

type PropsType = {
    role: string
}

const CustomCheckbox:React.FC<PropsType> = ({role}) => {
    return (
        <Check> {role}
            <InputBox type="checkbox"/>
            <CheckMark className='checkmark'/>
        </Check>
    )
}

export default CustomCheckbox

const Check = styled.label`
  display: flex;
  position: relative;
  padding-left: 25px;
  margin-bottom: 12px;
  cursor: pointer;
  user-select: none;
  font-family: "Helvetica Light", sans-serif;
  font-size: 14px;
  color: #4F4F4F;
`

const InputBox = styled.input`
  position: absolute;
  opacity: 0;
  cursor: pointer;
  height: 0;
  width: 0;
  &:checked ~ .checkmark {
    background-color: white;
    color: blue;
   
    border: 2px solid blue
  }
  &:checked ~ .checkmark:after {
   display: block;
  }
`
const CheckMark = styled.span`
  position: absolute;
  top: 0;
  left: 0;
  height: 19px;
  width: 19px;
  background-color: white;
  border: 2px solid gray;
  &:after {
    left: 9px;
    top: 5px;
    width: 5px;
    height: 10px;
    border: solid blue;
    border-width: 0 3px 3px 0;

    transform: rotate(45deg);
  }
`