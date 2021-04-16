import React, {useEffect, useState} from 'react'
//react-hook-form
import {useForm} from "react-hook-form";
//types
import {IAddNewUserData, UserFromDataType} from "../../../../../_BLL/types/addNewUserTypes";
//helpers
import {getColor} from "../../../../../_BLL/helpers/colorWrapMaker";
//BLL
import {editWorker} from "../../../../../_BLL/thunks/profile/profileThunks";
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
import {useTranslation} from "react-i18next";


type PropsType = {
    setEditMode?: (id: number, value: boolean) => void,
    dispatch?: any,
    worker?: IAddNewUserData
}

const EditUserCardForm: React.FC<PropsType> = ({setEditMode, dispatch, worker}) => {
    const {register, errors, handleSubmit, setValue, watch, clearErrors} = useForm<UserFromDataType>({
        mode: 'onSubmit',
        reValidateMode: 'onBlur'
    })

    //roles
    const agent = watch('roles.agent')
    const billing = watch('roles.billing')
    const master = watch('roles.master')
    const isRoleRequired = !agent && !billing && !master

    const [isOpenPopup, setIsOpen] = useState(false)

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

        dispatch && dispatch(editWorker(Number(worker?.id), whole_data))
        setEditMode && setEditMode(0, false)
    }

    useEffect(() => {
        if (worker) {
            Object.keys(worker).forEach((key: string) => {
                setValue(key, worker[key])
                if (worker.roles.includes('master')) {
                    setValue('roles.master', true)
                }
                if (worker.roles.includes('agent')) {
                    setValue('roles.agent', true)
                }
                if (worker.roles.includes('billing')) {
                    setValue('roles.billing', true)
                }
            })
        }
    }, [worker])

    const [colorWrap, setColorWrap] = useState('')
    useEffect(() => {
        setColorWrap(getColor(worker?.roles))
    }, [worker])

    const {t} = useTranslation();
    return (
        <EditCardContainer>
            <FormContainer onSubmit={handleSubmit(onSubmit)} isOpenPopup={isOpenPopup}>
                {isOpenPopup && <EditUserPopup callback={setIsOpen} errors={errors}/>}
                <ActionsWrap>
                    <CloseButton type='button' onClick={() => setEditMode && setEditMode(0, false)}>
                        <img src={closeIcon} alt=""/>
                    </CloseButton>
                    <DoneButton type='button' onClick={() => setIsOpen(true)}>
                        <img src={done} alt=""/>
                    </DoneButton>
                </ActionsWrap>
                <PhotoWrap colorette={colorWrap}><img src={worker?.photo ? worker?.photo : user} alt=""/></PhotoWrap>
                <FormField name='first_name'
                           placeholder={t("Register/Name")}
                           label={t("Register/Name")}
                           inputRef={register({
                               required: `${t("Error message/Field is required")}`
                           })}
                           error={errors?.first_name}
                />
                <FormField name='last_name'
                           placeholder={t("Register/Last Name")}
                           label={t("Register/Last Name")}
                           inputRef={register({
                               required: `${t("Error message/Field is required")}`
                           })}
                           error={errors?.last_name}
                />
                <CheckboxWrap>
                    <Label>{t("Register/Roles")}</Label>
                    <CustomCheckbox
                        name='roles.master'
                        inputRef={register({
                            required: isRoleRequired
                        })}
                        role={t("Role/master")}
                        disabled={agent || billing}
                        error={errors?.roles?.master}
                        clearErrors={clearErrors}
                    />
                    <CustomCheckbox
                        name='roles.agent'
                        inputRef={register({
                            required: isRoleRequired
                        })}
                        role={t("Role/agent")}
                        disabled={master}
                        error={errors?.roles?.agent}
                        clearErrors={clearErrors}
                    />
                    <CustomCheckbox
                        name='roles.billing'
                        inputRef={register({
                            required: isRoleRequired
                        })}
                        role={t("Role/billing")}
                        disabled={master}
                        error={errors?.roles?.billing}
                        clearErrors={clearErrors}
                    />
                </CheckboxWrap>
                <FormField name='email'
                           placeholder={t("Register/Email")}
                           label={t("Register/Email")}
                           inputRef={register({
                               required: `${t("Error message/Field is required")}`,
                               pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
                           })}
                           error={errors?.email}
                           pattern_message={t("Error message/Email is not valid")}
                />
            </FormContainer>
        </EditCardContainer>
    )
}

export default EditUserCardForm
