import * as React from 'react'
import styled from "styled-components";
import {useForm} from "react-hook-form";
import FormField from "../../../components/_commonComponents/Input/FormField";
import CustomCheckbox from "../../../components/_commonComponents/customCheckbox/customCheckbox";
import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {addEmployee, companyActions} from "../../../../_BLL/reducers/employeesAndBanksReducer";
import {AppStateType} from "../../../../_BLL/store";
import {AddUserError} from "../../../../_BLL/reducers/profileReducer";


interface IProps {
    errorEmployee?: AddUserError | null
}

const AddUserForm:React.FC<IProps> = ({errorEmployee}) => {

    const dispatch = useDispatch()
    const {register, handleSubmit, errors, setValue, reset, clearErrors, watch} = useForm(
        {
            mode: 'onSubmit',
            reValidateMode: 'onBlur'
        }
    )
    let success_user = useSelector((state: AppStateType) => state.company.successUser)
    const onSubmit = (values: any) => {
        let submitted_roles = [];
        if (values.roles.master) {
            submitted_roles.push('master')
        }
        if (values.roles.billing) {
            submitted_roles.push('billing')
        }
        if (values.roles.agent) {
            submitted_roles.push('agent')
        }
        let whole_data = {...values, roles: submitted_roles}
        dispatch(companyActions.setAddingEmployeeError(null))
        dispatch(addEmployee(whole_data))
    }

    //roles
    const agent = watch('roles.agent')
    const billing = watch('roles.billing')
    const master = watch('roles.master')
    const isRoleRequired = !agent && !billing && !master

    useEffect(() => {
        if(success_user) {
            reset()
        }
    }, [setValue, success_user])



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
                                   error={errors?.first_name}
                                   placeholder='Name'
                                   name='first_name'
                                   server_error={errorEmployee?.first_name ? errorEmployee.first_name[0] : ''}
                        />
                    </InputWrap>
                    <InputWrap w='47%'>
                        <FormField label='Last Name'
                                   placeholder='Last Name'
                                   name='last_name'
                                   inputRef={register({
                                       required: 'Field is required'
                                   })}
                                   error={errors?.last_name}
                                   server_error={errorEmployee?.last_name ? errorEmployee.last_name[0] : ''}
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
                               server_error={errorEmployee?.email ? errorEmployee?.email[0] : ''}
                    />
                    <FormField label='Position in the Company'
                               placeholder='Position in the Company'
                               name='position'
                               error={errors?.position}
                               inputRef={register({
                                   required: 'Field is required'
                               })}
                               server_error={errorEmployee?.position ? errorEmployee.position[0] : ''}
                    />
                <CheckboxWrap>
                    <CustomCheckbox
                        name='roles.master'
                        inputRef={register({
                            required: isRoleRequired
                        })}
                        role='Master'
                        disabled={agent || billing}
                        error={errors?.roles?.master}
                        clearErrors={clearErrors}
                    />
                    <CustomCheckbox
                        name='roles.agent'
                        inputRef={register({
                            required: isRoleRequired
                        })}
                        role='Agent'
                        disabled={master}
                        error={errors?.roles?.agent}
                        clearErrors={clearErrors}
                    />
                    <CustomCheckbox
                        name='roles.billing'
                        inputRef={register({
                            required: isRoleRequired
                        })}
                        role='Billing'
                        disabled={master}
                        error={errors?.roles?.billing}
                        clearErrors={clearErrors}
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
background-color: black;
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


