import * as React from 'react'
import styled from "styled-components";
import {useForm} from "react-hook-form";
import { IAddNewUserData } from '../../../_BLL/types/addNewUserTypes';
import FormField from "../_commonComponents/Input/FormField";
import CustomCheckbox from "../_commonComponents/customCheckbox/customCheckbox";


interface IProps {

}

const AddUserForm:React.FC<IProps> = () => {

    const {register, handleSubmit, errors} = useForm<IAddNewUserData>()
    const onSubmit = (values: IAddNewUserData) => {
        console.log(values)
    }



    return (
        <FormContainer>
            <Title>Create New User</Title>
            <FormWrap onSubmit={handleSubmit(onSubmit)}>
                <Wrapper>
                    <InputWrap w='47%'>
                        <FormField label='Name'
                                   inputRef={register({
                                       required: 'Field is required'
                                   })}
                                   placeholder='Name'
                                   name='name'
                                   error={errors?.name?.message}
                        />
                    </InputWrap>
                    <InputWrap w='47%'>
                        <FormField label='Last Name'
                                   inputRef={register({
                                       required: 'Field is required'
                                   })}
                                   placeholder='Last Name'
                                   name='lastName'
                                   error={errors?.lastName?.message}
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
                    />

                    <FormField label='Position in the Company'
                               inputRef={register({
                                   required: 'Field is required'
                               })}
                               placeholder='Position in Company(optional)*'
                               name='companyPosition'
                               error={errors?.companyPosition?.message}
                    />
                <CheckboxWrap>
                    <CustomCheckbox role='Master'/>
                    <CustomCheckbox role='Agent'/>
                    <CustomCheckbox role='Billing'/>
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


  &:hover {
    cursor: pointer;
  }
`

export const CheckboxWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  max-height: 160px;
  height: 100%;
  width: 100%;
  margin-bottom: 50px;
`

