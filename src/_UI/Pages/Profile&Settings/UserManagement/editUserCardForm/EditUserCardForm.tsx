import React, {useEffect, useState} from 'react'
//react-hook-form
import { useForm} from "react-hook-form";
//types
import {IAddNewUserData} from "../../../../../_BLL/types/addNewUserTypes";
//helpers
import {getColor} from "../../../../../_BLL/helpers/colorWrapMaker";
//BLL
import {editWorker} from "../../../../../_BLL/reducers/profileReducer";
//components
import FormField from 'src/_UI/components/_commonComponents/Input/FormField';
import EditUserPopup from "../../../../components/PopUps/editUser/EditUserPopup";
import {
    ActionsWrap,
    CloseButton, DoneButton
} from "../../../../components/_commonComponents/buttons/actionsFormButtons/finishFormButtons";
import {CheckboxWrap} from "../../../ActivateCompany/CreateNewUser/AddUserForm";
import CustomCheckbox from "../../../../components/_commonComponents/customCheckbox/customCheckbox";
//styles
import {EditCardContainer, FormContainer, Label, PhotoWrap} from "./edit-card-styles";
//icons
import user from '../../../../../_UI/assets/icons/profile/defaultUserPhoto.svg'
import closeIcon from "../../../../assets/icons/profile/closeForm.svg";
import done from "../../../../assets/icons/profile/add.svg";



type PropsType = {
    setEditMode?: (id: number, value: boolean) => void,
    dispatch?: any,
    worker?: IAddNewUserData
}

const EditUserCardForm:React.FC<PropsType> = ({setEditMode, dispatch, worker}) => {
    const {register, errors, handleSubmit, getValues, setValue} = useForm<IAddNewUserData>({
        mode: 'onBlur',
        reValidateMode: 'onBlur'
    })
    const [isOpenPopup, setIsOpen] = useState(false)

    const onSubmit = (values:IAddNewUserData) => {
        dispatch && dispatch(editWorker(Number(worker?.id), values))
        setEditMode && setEditMode(0, false)
    }


    const [masterRole, setMasterRole] = useState('')
    const [roleValue, setRole] = useState('')
    const [agentRole, setAgentRole] = useState('')

    console.log(roleValue)
    console.log(agentRole)



    useEffect(() => {
        worker && Object.keys(worker).forEach((key: string) => {
            setValue(key, worker[key])
            if(worker.roles.includes('master')) {
                setMasterRole('master')
            } else if (worker.roles.includes('agent')) {
                setAgentRole('agent')
            } else if (worker.roles.includes('billing')) {
                setRole('billing')
            }
        })
    }, [worker, setValue])

    const [colorWrap, setColorWrap] = useState('')
    useEffect(() => {
        setColorWrap(getColor(worker?.roles))
        worker?.roles.includes('billing') && setRole('billing')
    }, [worker])

    return (
        <EditCardContainer>
             <FormContainer onSubmit={handleSubmit(onSubmit)} isOpenPopup={isOpenPopup}>
                 { isOpenPopup && <EditUserPopup callback={setIsOpen}/>}

                        <ActionsWrap>
                            <CloseButton type='button' onClick={() => setEditMode && setEditMode(0, false)}><img src={closeIcon} alt=""/></CloseButton>
                            <DoneButton type='button' onClick={() => setIsOpen(true)}><img src={done} alt=""/></DoneButton>
                        </ActionsWrap>
                        <PhotoWrap colorette={colorWrap}><img src={worker?.photo ? worker?.photo : user} alt=""/></PhotoWrap>
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
                                disabled={agentRole || roleValue }
                                setRole={setMasterRole}
                                roleValue={masterRole}
                                error={errors?.roles}
                                worker={worker}
                            />
                            <CustomCheckbox value='agent'
                                            name='roles'
                                            inputRef={register({
                                                required: 'Field is required'
                                            })}
                                            role='Agent'
                                            getValues={getValues}
                                            disabled={masterRole}
                                            setRole={setAgentRole}
                                            roleValue={agentRole}
                                            error={errors?.roles}
                                            worker={worker}

                            />
                            <CustomCheckbox value='billing'
                                            name='roles'
                                            inputRef={register({
                                                required: 'Field is required'
                                            })}
                                            role='Billing'
                                            getValues={getValues}
                                            disabled={masterRole}
                                            setRole={setRole}
                                            roleValue={roleValue}
                                            error={errors?.roles}
                                            worker={worker}

                            />
                        </CheckboxWrap>
                        <FormField name='email'
                                   placeholder='Email'
                                   label='Email'
                                   inputRef={register({
                                       required: 'Field is required',
                                       pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
                                   })}
                                   error={errors?.email?.message}
                                   getValues={getValues}
                        />
                </FormContainer>


        </EditCardContainer>
    )
}

export default EditUserCardForm
