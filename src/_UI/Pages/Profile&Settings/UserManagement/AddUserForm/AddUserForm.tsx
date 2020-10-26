import React, {useState} from "react";
import {VoidFunctionType} from "../../../../../_BLL/types/commonTypes";
import {FormContainer, FormWrap} from "./add-user-form-styles";
import FinishFormButtons from "../../../../components/_commonComponents/buttons/actionsFormButtons/finishFormButtons";
import FormField from "../../../../components/_commonComponents/Input/FormField";
import {useForm} from "react-hook-form";
import CustomCheckbox from "../../../../components/_commonComponents/customCheckbox/customCheckbox";
import {CheckboxWrap} from "../../../ActivateCompany/CreateNewUser/AddUserForm";
import styled from "styled-components";
import {addNewWorker, AddUserError} from "../../../../../_BLL/reducers/profileReducer";
import {IAddNewUserData} from "../../../../../_BLL/types/addNewUserTypes";


type PropsType = {
    setIsAdd?: VoidFunctionType,
    dispatch?: VoidFunctionType,
    server_error?: any
}

const AddUserForm:React.FC<PropsType> = ({setIsAdd, dispatch, server_error}) => {
    const {register, errors, handleSubmit, getValues} = useForm<IAddNewUserData>()

    const onSubmit = (values:IAddNewUserData) => {
        dispatch && dispatch(addNewWorker(values))
    }

    const [roleValue, setRole] = useState('')


    return (
        <FormContainer>
            <FormWrap onSubmit={handleSubmit(onSubmit)}>
                <FinishFormButtons closeCallback={setIsAdd}/>
                <FormField name='first_name'
                           placeholder='Name'
                           label='Name'
                           inputRef={register({
                               required: 'Field is required'
                           })}
                           error={errors?.first_name}
                           getValues={getValues}
                           server_error={server_error?.first_name ? server_error.first_name[0] : ''}
                />
                <FormField name='last_name'
                           placeholder='Last Name'
                           label='Last Name'
                           inputRef={register({
                               required: 'Field is required'
                           })}
                           error={errors?.last_name}
                           getValues={getValues}
                           server_error={server_error?.last_name ? server_error.last_name[0] : ''}
                />
                <CheckboxWrap>
                   <Label>Roles</Label>
                    <CustomCheckbox
                        value='master'
                        name='roles'
                        inputRef={register({
                            required: 'Field is required'
                        })}
                        role='Master'
                        getValues={getValues}
                        disabled={roleValue === 'agent' || roleValue === 'billing'}
                        setRole={setRole}
                        roleValue={roleValue}
                        error={errors?.roles}
                    />
                    <CustomCheckbox value='agent'
                                    name='roles'
                                    inputRef={register({
                                        required: 'Field is required'
                                    })}
                                    role='Agent'
                                    getValues={getValues}
                                    disabled={roleValue === 'master'}
                                    setRole={setRole}
                                    roleValue={roleValue}
                                    error={errors?.roles}
                    />
                    <CustomCheckbox value='billing'
                                    name='roles'
                                    inputRef={register({
                                        required: 'Field is required'
                                    })}
                                    role='Billing'
                                    getValues={getValues}
                                    disabled={roleValue === 'master'}
                                    setRole={setRole}
                                    roleValue={roleValue}
                                    error={errors?.roles}
                    />
                </CheckboxWrap>
                <FormField name='email'
                           placeholder='Email'
                           label='Email'
                           inputRef={register({
                               required: 'Field is required'
                           })}
                           error={errors?.email}
                           getValues={getValues}
                           server_error={server_error?.email ? server_error.email[0] : ''}
                />
            </FormWrap>
        </FormContainer>
    )
}

export default AddUserForm

const Label = styled.div`
  font-family: "Helvetica Bold", sans-serif;
  font-size: 14px;
  color: black;
  margin-bottom: 10px;
`