import React, { useEffect } from "react";
import FormField from "../../../../components/_commonComponents/Input/FormField";
import {useForm} from "react-hook-form";
import styled from "styled-components";
import { ChangePasswordButton } from "./EditProfileForm";
import {VoidFunctionType} from "../../../../../_BLL/types/commonTypes";
import {useDispatch, useSelector} from "react-redux";
import {changeMyPassword} from "../../../../../_BLL/reducers/profileReducer";
import {AppStateType} from "../../../../../_BLL/store";
import { ErrorServerMessage } from "src/_UI/Pages/SignInPage";

type PropsType = {
    setChangeMode: VoidFunctionType
}

const ChangePasswordPage:React.FC<PropsType> = ({setChangeMode}) => {
    const {register, handleSubmit, errors, getValues} = useForm()
    const error = useSelector((state: AppStateType) => state.profile.passwordError)
    const success = useSelector((state: AppStateType) => state.profile.changesPass)


    const dispatch = useDispatch()
    const onSubmit = (values: any) => {
        dispatch(changeMyPassword(values))
    }

    useEffect(() => {
        success && setChangeMode(false)
    }, [success])
    return (
        <FormWrap onSubmit={handleSubmit(onSubmit)}>
            <FormField label='Old Password'
                       inputRef={register({
                           required: 'Old Password is required'
                       })}
                       placeholder='Password'
                       name='old_password'
                       error={errors?.old_password?.message}
                       getValues={getValues}
            />
            {error?.old_password && <ErrorServerMessage style={{padding: '0', marginBottom: '5px'}}>{error?.old_password[0]}</ErrorServerMessage>}
            <FormField label='New Password'
                           inputRef={register({
                               required: 'New Password is required'
                           })}
                           placeholder='Password'
                           name='new_password1'
                           error={errors?.new_password1?.message}
                           getValues={getValues}
                />
                <FormField label='Confirm Password'
                    inputRef={register({
                        required: 'Confirm Password is required'
                    })}
                    placeholder='Confirm password'
                    name='new_password2'
                    error={errors?.new_password2?.message}
                    getValues={getValues}
                />
            {error?.new_password2 && <ErrorServerMessage style={{padding: '0', marginBottom: '5px'}}>{error?.new_password2[0]}</ErrorServerMessage>}
                <ActionsButtons>
                    <BackButton type='button' onClick={() => setChangeMode(false)}>BACK</BackButton>
                    <ChangePasswordButton type='submit'>CHANGE PASSWORD</ChangePasswordButton>
                </ActionsButtons>
        </FormWrap>
    )
}

export default ChangePasswordPage

const FormWrap = styled.form`
  max-width: 420px;
  width: 100%;
  display: flex;
  flex-direction: column;
`
const ActionsButtons = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`
const BackButton = styled.button`
background-color: black;
outline: none;
border: none;
color: white;
font-family: "Helvetica Reg", sans-serif;
font-size: 14px;

&:hover {
  cursor: pointer;
}
`