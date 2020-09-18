import * as React from 'react'
import styled from "styled-components";
import {useForm} from "react-hook-form";
import { IAddNewUserData } from '../../../../_BLL/types/addNewUserTypes';
import FormField from "../../../components/_commonComponents/Input/FormField";
import CustomCheckbox from "../../../components/_commonComponents/customCheckbox/customCheckbox";
import { useState } from 'react';


interface IProps {

}

const AddUserForm:React.FC<IProps> = () => {

    const {register, handleSubmit, errors, getValues} = useForm<IAddNewUserData>()
    const onSubmit = (values: IAddNewUserData) => {
        console.log(values)
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
                                   name='name'
                                   getValues={getValues}
                        />
                    </InputWrap>
                    <InputWrap w='47%'>
                        <FormField label='Last Name'
                                   inputRef={register}
                                   placeholder='Last Name'
                                   name='lastName'
                                   getValues={getValues}
                        />
                    </InputWrap>
                </Wrapper>
                    <FormField label='Email'
                               inputRef={register({
                                   required: 'Field is required'
                               })}
                               placeholder='Email'
                               name='email'
                               error={errors?.email?.message}
                               getValues={getValues}
                    />

                    <FormField label='Position in the Company'
                               inputRef={register}
                               placeholder='Position in Company(optional)*'
                               name='companyPosition'
                               error={errors?.companyPosition?.message}
                               getValues={getValues}
                    />
                <CheckboxWrap>
                    <CustomCheckbox
                        value='master'
                        name='userRole'
                        inputRef={register({
                            required: 'Field is required'
                                })}
                        role='Master'
                        getValues={getValues}
                        error={errors?.userRole?.message}
                        disabled={roleValue === 'agent' || roleValue === 'billing'}
                        setRole={setRole}
                        roleValue={roleValue}
                    />
                    <CustomCheckbox value='agent'
                                    name='userRole'
                                    inputRef={register({
                                        required: 'Field is required'
                                    })}
                                    role='Agent'
                                    getValues={getValues}
                                    error={errors?.userRole?.message}
                                    disabled={roleValue === 'master'}
                                    setRole={setRole}
                                    roleValue={roleValue}
                    />
                    <CustomCheckbox value='billing'
                                    name='userRole'
                                    inputRef={register({
                                        required: 'Field is required'
                                    })}
                                    role='Billing'
                                    getValues={getValues}
                                    error={errors?.userRole?.message}
                                    disabled={roleValue === 'master'}
                                    setRole={setRole}
                                    roleValue={roleValue}
                    />
                </CheckboxWrap>
                     <SubmitButton type='submit'>Add user</SubmitButton>
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
margin-bottom: 58px;
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
font-family: "Helvetica Bold", sans-serif;
background-color: #7C7C89;
min-height: 40px;
max-width: 140px;
width: 100%;
outline: none;
border: none;
color: white;
margin-top: 50px;
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
`

