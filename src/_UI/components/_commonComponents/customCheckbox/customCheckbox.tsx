import React, {useState} from 'react'
import styled from "styled-components";
import {VoidFunctionType} from "../../../../_BLL/types/commonTypes";


type PropsType = {
    role?: string,
    name?: string,
    value?: string,
    onChange?: VoidFunctionType,
    inputRef?: React.Ref<HTMLInputElement>,
    error?: any,
    disabled?: any,
    setRole?: (value: string) => void,
    roleValue?: string,
    success_user?: boolean,
    checked?: boolean,
    clearErrors?: VoidFunctionType
}

const CustomCheckbox:React.FC<PropsType> = ({role, ...props}) => {
    const [isCheck, setIsCheck] = useState(false)


    return (
        <Check className='label'> <SpanRole isCheck={isCheck} className='role'>{role}</SpanRole>
            <InputBox value={props.value}
                      name={props.name}
                      ref={props.inputRef}
                      onChange={() => props.clearErrors && props.clearErrors()}
                      type="checkbox"
                      disabled={props.disabled}
                      checked={props.checked}
            />
            <CheckMark error={props.error} className='checkmark'/>
        </Check>
    )
}

export default CustomCheckbox

type PropsStyle= {
    isCheck?: boolean,
    error?: string
}

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
  
  .checkmark:after {
  left: 3.5px;
  top: 1px;
  width: 6px;
  height: 10px;
  border: solid #115B86;
  border-width: 0 3px 3px 0;
  -webkit-transform: rotate(45deg);
  -ms-transform: rotate(45deg);
  transform: rotate(45deg);
  }
  
`

const InputBox = styled.input`
  position: absolute;
  opacity: 0;
  cursor: pointer;
  height: 0;
  width: 0;
  &:checked ~ .checkmark {
    background-color: white;
    border: 2px solid #115B86
  }
  
  &:checked ~ .checkmark:after {
   display: block;
  }
  
   &:checked ~ .role {
    color: #115B86;
  }
  &:disabled ~ .checkmark {
    background-color: #ECECEC;
  }
`
const CheckMark = styled.span<PropsStyle>`
  position: absolute;
  top: 0;
  left: 0;
  height: 19px;
  width: 19px;
  background-color: ${({error}) => error ? '#ECECEC' : 'white'} ;
  border:${({error}) => error ? '1px solid red' : '2px solid gray'};
  &:after {
     content: "";
    position: absolute;
    display: none;
  }
`

const SpanRole = styled.span<PropsStyle>`
 color: ${({isCheck}) => !isCheck ? ' #4F4F4F' : '#115B86'};
 text-transform: capitalize;
`