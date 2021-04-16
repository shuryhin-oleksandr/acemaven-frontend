import React from "react";
import FormField from "./FormField";
import eye from "../../../assets/icons/mdi_eye.svg";
import closeIcon from "../../../assets/icons/mdi_eye-off.svg";
import styled from "styled-components";
import {useTranslation} from "react-i18next";

type PropsType = {
    placeholder?: string,
    name: string,
    value?: string,
    onChange?: (value: string) => void,
    inputRef?: React.Ref<HTMLInputElement>,
    errors?: any,
    label?: string,
    getValues: (key: string) => Record<string, unknown>,
    type?: string,
    register?: any,
    setShowPassword: (value: boolean) => void,
    showPassword: boolean
}

const PasswordFormField:React.FC<PropsType> = ({errors, label, name, register, ...props}) => {
  const {t} = useTranslation();
    return (
        <PasswordWrapper>
            <FormField label={label}
                       inputRef={register({
                           required: `${t("Error message/Field is required")}`
                       })}
                       placeholder={props.placeholder}
                       name={name}
                       error={errors?.password}
                       type={props.showPassword ? 'text' : 'password'}
                       onChange={(e) => props.onChange && props.onChange(e.currentTarget)}
                       pattern_message={t('Error message/Password must contain only alphanumeric characters. Min 8, Max 25 symbols')}
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
  position: absolute;
  right: 5px;
  top: 26px;
  img {
    
  }
  
  &:hover {
    cursor: pointer;
  }
`