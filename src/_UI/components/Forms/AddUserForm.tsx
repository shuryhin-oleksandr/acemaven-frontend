import * as React from 'react'
import styled from "styled-components";
import fonts from "../../theming/fonts";
import {useForm} from "react-hook-form";
import { IAddNewUserData } from '../../../_BLL/types/addNewUserTypes';
import Input from "../_commonComponents/Input/Input";


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
                        <BaseInput
                                   placeholder='Name'
                                   name='name'
                                   ref={register({
                                       required:true
                                   })}
                        />
                        {errors?.name?.type === 'required' && <ErrorMessage>Field is required</ErrorMessage>}
                    </InputWrap>
                    <InputWrap w='47%'>
                        <BaseInput
                                   placeholder='Last Name'
                                   name='lastName'
                                   ref={register({
                                       required:true
                                   })}
                        />
                        {errors?.lastName?.type === 'required' && <ErrorMessage>Field is required</ErrorMessage>}
                    </InputWrap>
                </Wrapper>
                <InputWrap>
                    <BaseInput placeholder='Email'
                               name='email'
                               ref={register({
                                   required:true
                               })}
                    />
                    {errors?.email?.type === 'required' && <ErrorMessage>Field is required</ErrorMessage>}
                </InputWrap>
                <InputWrap>
                    <BaseInput placeholder='Position in Company(optional)*'
                               name='companyPosition'
                               ref={register}/>
                </InputWrap>

                <Input label='Phone Number'/>

                <CheckboxWrap>
                    <Check>
                        <input type="checkbox"/>
                        <CheckTitle>Master</CheckTitle>
                    </Check>
                    <Check>
                        <input type="checkbox"/>
                        <CheckTitle>
                            Agent
                        </CheckTitle>
                    </Check>
                    <Check>
                        <input type="checkbox"/>
                        <CheckTitle>Billing </CheckTitle>
                    </Check>
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
margin-bottom: 80px;
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
 margin-bottom: 60px;
`
const BaseInput = styled.input`
  background: #ffffff;
  border: 1px solid #bdbdbd;
  box-sizing: border-box;
  border-radius: 4px;
  width: 100%;
  height: 40px;
  padding: 0 10px;
  outline: none;
  ${fonts.asap(14, 16)};
  color: #bdbdbd;
  ::-webkit-input-placeholder {
    /* Edge */
    ${fonts.asap(14, 16)};
    color: #bdbdbd;
  }

  :-ms-input-placeholder {
    /* Internet Explorer 10-11 */
    ${fonts.asap(14, 16)};
    color: #bdbdbd;
  }

  ::placeholder {
    ${fonts.asap(14, 16)};
    color: #bdbdbd;
  }
`;
const SubmitButton = styled.button`
background-color: #7C7C89;
min-height: 40px;
max-width: 140px;
width: 100%;
outline: none;
border: none;
color: white;
`
const ErrorMessage = styled.div`
color: red;
width: 100%;
display: flex;
text-align: end;
font-size: 12px;
padding-top: 5px;
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
export const Check = styled.div`
display: flex;
`
export const CheckTitle = styled.div`
display: flex;
justify-content: center;
align-items: center;
font-size: 12px;
`
