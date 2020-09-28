import React from "react";
import FormField from "./FormField";
import eye from "../../../assets/icons/mdi_eye.svg";
import closeIcon from "../../../assets/icons/mdi_eye-off.svg";
import styled from "styled-components";
import {VoidFunctionType} from "../../../../_BLL/types/commonTypes";

type PropsType = {
    placeholder?: string,
    name: string,
    value?: string,
    onChange?: VoidFunctionType,
    inputRef?: React.Ref<HTMLInputElement>,
    errors?: any,
    label?: string,
    getValues: (key: string) => Record<string, unknown>,
    type?: string,
    register?: any,
    setShowPassword: VoidFunctionType,
    showPassword: boolean
}

const PasswordFormField:React.FC<PropsType> = ({errors, label, ...props}) => {
    return (
        <PasswordWrapper>
            <FormField label='Password'
                       inputRef={props.register({
                           required: 'Field is required'
                       })}
                       placeholder='Password'
                       name='password'
                       error={errors?.password?.message}
                       getValues={props.getValues}
                       type={props.showPassword ? 'text' : 'password'}
            />
            <EyeButton type='button' onClick={() =>!props.showPassword ? props.setShowPassword(true) : props.setShowPassword(false)}>
                <img src={props.showPassword ? eye : closeIcon} alt=""/>
            </EyeButton>
        </PasswordWrapper>
    )
}


export default PasswordFormField

export const PasswordWrapper = styled.div`
display: flex;
align-items: center;
width: 100%;
position: relative;

`
export const EyeButton = styled.button`
  background: none;
  outline: none;
  border: none;
  height: 40px;
  display: flex;
  align-items: center;
  z-index: 30;
  padding-top: 13px;
  position: absolute;
  right: 5px;
  img {
    
  }
  
  &:hover {
    cursor: pointer;
  }
`