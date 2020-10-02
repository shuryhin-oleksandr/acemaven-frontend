import * as React from 'react'
import styled from "styled-components";
import {useForm} from "react-hook-form";
import { IAddNewUserData } from '../../../../_BLL/types/addNewUserTypes';
import FormField from "../../../components/_commonComponents/Input/FormField";
import CustomCheckbox from "../../../components/_commonComponents/customCheckbox/customCheckbox";
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import {addEmployee} from "../../../../_BLL/reducers/employeesAndBanksReducer";
import {ErrorServerMessage} from "../../SignInPage";


interface IProps {
    errorEmployee?: string
}

const AddUserForm:React.FC<IProps> = ({errorEmployee}) => {

    const dispatch = useDispatch()
    const {register, handleSubmit, errors, getValues} = useForm<IAddNewUserData>()
    const onSubmit = (values: IAddNewUserData) => {
        console.log(values)
        dispatch(addEmployee(values))
    }
    const [roleValue, setRole] = useState('')

    return (
        <FormContainer>
            <Title>Create New User</Title>
            <FormWrap onSubmit={handleSubmit(onSubmit)}>
                <Wrapper>
                    <InputWrap w='47%'>
                        <FormField label='Name'
                                   inputRef={register}
                                   placeholder='Name'
                                   name='first_name'
                                   getValues={getValues}
                        />
                    </InputWrap>
                    <InputWrap w='47%'>
                        <FormField label='Last Name'
                                   inputRef={register}
                                   placeholder='Last Name'
                                   name='last_name'
                                   getValues={getValues}
                        />
                    </InputWrap>
                </Wrapper>
                    <FormField label='Email'
                               inputRef={register({
                                   required: 'Field is required',
                                   pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
                               })}
                               placeholder='Email'
                               name='email'
                               error={errors?.email}
                               getValues={getValues}
                    />
                {errorEmployee && <ErrorServerMessage style={{padding: '0'}}>{errorEmployee}</ErrorServerMessage>}
                    <FormField label='Position in the Company'
                               inputRef={register}
                               placeholder='Position in Company(optional)*'
                               name='position'
                               error={errors?.position}
                               getValues={getValues}
                    />
                <CheckboxWrap>
                    <CustomCheckbox
                        value='master'
                        name='roles'
                        inputRef={register({
                            required: 'Field is required'
                                })}
                        role='Master'
                        getValues={getValues}
                        error={errors?.roles}
                        disabled={roleValue === 'agent' || roleValue === 'billing'}
                        setRole={setRole}
                        roleValue={roleValue}
                    />
                    <CustomCheckbox value='agent'
                                    name='roles'
                                    inputRef={register({
                                        required: 'Field is required'
                                    })}
                                    role='Agent'
                                    getValues={getValues}
                                    error={errors?.roles}
                                    disabled={roleValue === 'master'}
                                    setRole={setRole}
                                    roleValue={roleValue}
                    />
                    <CustomCheckbox value='billing'
                                    name='roles'
                                    inputRef={register({
                                        required: 'Field is required'
                                    })}
                                    role='Billing'
                                    getValues={getValues}
                                    error={errors?.roles}
                                    disabled={roleValue === 'master'}
                                    setRole={setRole}
                                    roleValue={roleValue}
                    />
                </CheckboxWrap>
                     <SubmitButton type='submit'>ADD USER</SubmitButton>
            </FormWrap>
        </FormContainer>
    )
}

export default AddUserForm

interface StyledProps {
    w?: string
}

export const FormContainer = styled.div`
max-width: 420px;
width: 100%;
display: flex;
flex-direction: column;
margin-right: 40px;
`
export const Title = styled.div`
color: black;
font-family: 'Helvetica Bolder', sans-serif;
font-size: 28px;
margin-bottom: 40px;
`
export const FormWrap = styled.form`
display: flex;
flex-direction: column;
align-items: center;
width: 100%;
`

export const Wrapper = styled.div`
display: flex;
width: 100%;
justify-content: space-between;
`
export const InputWrap = styled.div<StyledProps>`
display: flex;
flex-direction: column;
width: ${({w}) => w ? w : '100%'};
`

export const SubmitButton = styled.button`
font-family: "Helvetica Reg", sans-serif;
font-size: 14px;
text-transform: uppercase;
background-color: #7C7C89;
min-height: 40px;
max-width: 180px;
width: 100%;
outline: none;
border: none;
color: white;
margin-top: 30px;
transition: .3s;

  &:hover {
    cursor: pointer;
    background-color: black;
    transition: .3s;
  }
`

export const CheckboxWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  max-height: 160px;
  height: 100%;
  width: 100%;
  margin-top: 20px;
`

