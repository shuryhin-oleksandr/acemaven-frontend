import React from 'react'
import styled from "styled-components";
import {VoidFunctionType} from "../../../../_BLL/types/commonTypes";

type PropsType = {
    setValue?: any,
    name?: string,
    value?: string | boolean,
    onChange?: VoidFunctionType,
    inputRef?: React.Ref<HTMLInputElement>,
    error?: any,
    setIsDangerous?: (value: boolean) => void,
    isCheck? : boolean,
    setIsCheck?: (value: boolean) => void,
    span_text: string
}

const GeneralCustomCheckbox:React.FC<PropsType> = ({...props}) => {
    let changeHandler = () => {
        !props.isCheck ? props.setIsCheck && props.setIsCheck(true) : props.setIsCheck && props.setIsCheck(false)
    }

    return (
        <Check className='label'>
            <SpanLabel isCheck={props.isCheck} className='role'>{props.span_text}</SpanLabel>
            <InputBox onChange={changeHandler}
                      type="checkbox"
                      ref={props.inputRef}
                      name={props.name}
                // @ts-ignore
                      defaultValue={props.value}
                      checked={props.isCheck}
            />
            <CheckMark error={props.error} className='checkmark'/>
        </Check>
    )
}

export default GeneralCustomCheckbox

type PropsStyle= {
    isCheck?: boolean,
    error?: string
}

const Check = styled.label`
  display: flex;
  position: relative;
  padding-left: 25px;
  cursor: pointer;
  user-select: none;
  font-family: "Helvetica Light", sans-serif;
  font-size: 14px;
  line-height: 16.4px;
  color: #4F4F4F;
  
  .checkmark:after {
    left: 5.5px;
    top: 0;
    width: 3px;
    height: 9px;
    border: solid #115B86;
    border-width: 0 2px 2px 0;
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
    width: 5px;
    height: 11px;
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
  height: 18.7px;
  width: 20px;
  background-color: ${({error}) => error ? '#ECECEC' : 'white'} ;
  border:${({error}) => error ? '1px solid red' : '2px solid gray'};
  &:after {
     content: "";
    position: absolute;
    display: none;
  }
`

const SpanLabel = styled.span<PropsStyle>`
 color: ${({isCheck}) => !isCheck ? ' #4F4F4F' : '#115B86'};
 font-family: "Helvetica Reg", sans-serif;
 font-size: 14px;
`