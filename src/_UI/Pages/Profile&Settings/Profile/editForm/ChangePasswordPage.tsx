import React, { useState} from "react";
import FormField from "../../../../components/_commonComponents/Input/FormField";
import {useForm} from "react-hook-form";
import styled from "styled-components";
import { ChangePasswordButton } from "./EditProfileForm";
import {VoidFunctionType} from "../../../../../_BLL/types/commonTypes";
import {useDispatch, useSelector} from "react-redux";
import {changeMyPassword} from "../../../../../_BLL/reducers/profileReducer";
import {AppStateType} from "../../../../../_BLL/store";
import { ErrorServerMessage } from "src/_UI/Pages/SignInPage";
import PasswordFormField from "../../../../components/_commonComponents/Input/PasswordFormField";
import closeIcon from '../../../../../_UI/assets/icons/close-icon.svg'

type PropsType = {
    setChangeMode: VoidFunctionType
}

const ChangePasswordPage:React.FC<PropsType> = ({setChangeMode}) => {
    const {register, handleSubmit, errors, getValues} = useForm()
    const error = useSelector((state: AppStateType) => state.profile.passwordError)
    const success = useSelector((state: AppStateType) => state.profile.changesPass)

    const [showPassword, setShowPassword] = useState(false);
    const dispatch = useDispatch()
    const onSubmit = (values: any) => {
        dispatch(changeMyPassword(values))
    }

    return (
        <FormWrap onSubmit={handleSubmit(onSubmit)}>
            <CloseButton onClick={() => setChangeMode(false)}><img src={closeIcon} alt=""/></CloseButton>
            <FormField label='Old Password'
                       inputRef={register({
                           required: 'Old Password is required'
                       })}
                       placeholder='Password'
                       name='old_password'
                       error={errors?.old_password?.message}
                       getValues={getValues}
                       type='password'
            />
            {error?.old_password && <ErrorServerMessage style={{padding: '0', marginBottom: '5px'}}>{error?.old_password[0]}</ErrorServerMessage>}
            <PasswordFormField
                name="new_password1"
                label="New Password"
                getValues={getValues}
                showPassword={showPassword}
                setShowPassword={setShowPassword}
                errors={errors}
                placeholder="New Password"
                register={register}

            />
                <FormField label='Confirm Password'
                    inputRef={register({
                        required: 'Confirm Password is required'
                    })}
                    placeholder='Confirm password'
                    name='new_password2'
                    error={errors?.new_password2?.message}
                    getValues={getValues}
                           type='password'
                />
            {error?.new_password2 && <ErrorServerMessage style={{padding: '0', marginBottom: '5px'}}>{error?.new_password2[0]}</ErrorServerMessage>}
            {success && <SuccessMessage>Password was changed!</SuccessMessage>}
                <ActionsButtons>
                    <ChangePasswordButton type='submit'>CHANGE PASSWORD</ChangePasswordButton>
                </ActionsButtons>
        </FormWrap>
    )
}

export default ChangePasswordPage

const FormWrap = styled.form`
  max-width: 500px;
  max-height: 422px;
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  background-color: white;
  z-index: 30;
  padding: 45px 40px;
  position: relative;
`
const ActionsButtons = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`
const SuccessMessage = styled.div`
color: darkgreen;
font-family: "Helvetica Reg", sans-serif;
font-size: 14px;
width: 100%;
display: flex;
text-align: end;
`
export const CloseButton = styled.button`
outline: none;
background: none;
border: none;
position: absolute;
top: 5%;
right: 4%;
`
