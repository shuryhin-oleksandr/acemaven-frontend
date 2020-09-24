import React, {useEffect, useState} from 'react'
import FormField from 'src/_UI/components/_commonComponents/Input/FormField';
import {VoidFunctionType} from "../../../../../_BLL/types/commonTypes";
import {EditCardContainer, FormContainer, PhotoWrap} from "./edit-card-styles";
import {useForm} from "react-hook-form";
import FinishFormButtons from "../../../../components/_commonComponents/buttons/actionsFormButtons/finishFormButtons";
import user from '../../../../../_UI/assets/icons/profile/Rectangle.png'
import {CheckboxWrap} from "../../../ActivateCompany/CreateNewUser/AddUserForm";
import CustomCheckbox from "../../../../components/_commonComponents/customCheckbox/customCheckbox";
import styled from "styled-components";
import {editWorker} from "../../../../../_BLL/reducers/profileReducer";
import {IAddNewUserData} from "../../../../../_BLL/types/addNewUserTypes";


type PropsType = {
    setEditMode?: (id: number, value: boolean) => void,
    dispatch?: VoidFunctionType,
    worker?: IAddNewUserData
}

const EditUserCardForm:React.FC<PropsType> = ({setEditMode, dispatch, worker}) => {
    const {register, errors, handleSubmit, getValues, setValue} = useForm<IAddNewUserData>()
    const onSubmit = (values:IAddNewUserData) => {
        console.log(values)
        dispatch && dispatch(editWorker(Number(worker?.id), values))
        setEditMode && setEditMode(0, false)
    }

    const [roleValue, setRole] = useState('')
    useEffect(() => {
        worker && Object.keys(worker).forEach((key: string) => {
            setValue(key, worker[key])
        })
    }, [worker, setValue])

    return (
        <EditCardContainer>
            <FormContainer onSubmit={handleSubmit(onSubmit)}>
                <FinishFormButtons closeCallback={setEditMode}/>
                <PhotoWrap><img src={user} alt=""/></PhotoWrap>
                <FormField name='first_name'
                           placeholder='Name'
                           label='Name'
                           inputRef={register({
                               required: 'Field is required'
                           })}
                           error={errors?.first_name?.message}
                           getValues={getValues}
                />
                <FormField name='last_name'
                           placeholder='Last Name'
                           label='Last Name'
                           inputRef={register({
                               required: 'Field is required'
                           })}
                           error={errors?.last_name?.message}
                           getValues={getValues}
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
                           error={errors?.email?.message}
                           getValues={getValues}
                />
            </FormContainer>
        </EditCardContainer>
    )
}

export default EditUserCardForm
const Label = styled.div`
  font-family: "Helvetica Bold", sans-serif;
  font-size: 14px;
  color: black;
  margin-bottom: 10px;
`