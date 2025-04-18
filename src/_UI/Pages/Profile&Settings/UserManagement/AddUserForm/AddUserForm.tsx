import React from "react";
//react-hook-form
import {useForm} from "react-hook-form";
//BLL
import { addNewWorker } from "../../../../../_BLL/thunks/profile/profileThunks";
//components
import FinishFormButtons from "../../../../components/_commonComponents/buttons/actionsFormButtons/finishFormButtons";
import FormField from "../../../../components/_commonComponents/Input/FormField";
import CustomCheckbox from "../../../../components/_commonComponents/customCheckbox/customCheckbox";
import {CheckboxWrap} from "../../../ActivateCompany/CreateNewUser/AddUserForm";
//styles
import {FormContainer, FormWrap, Label} from "./add-user-form-styles";
import {useTranslation} from "react-i18next";



type PropsType = {
    setIsAdd?: any,
    dispatch?: any,
    server_error?: any
}

const AddUserForm:React.FC<PropsType> = ({setIsAdd, dispatch, server_error}) => {
    const {register, errors, handleSubmit, watch, clearErrors} = useForm({
        mode: 'onSubmit',
        reValidateMode: 'onBlur'
    })

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

        dispatch && dispatch(addNewWorker(whole_data))
    }

    //roles
    const agent = watch('roles.agent')
    const billing = watch('roles.billing')
    const master = watch('roles.master')
    const isRoleRequired = !agent && !billing && !master

  const {t} = useTranslation();
    return (
        <FormContainer>
            <FormWrap onSubmit={handleSubmit(onSubmit)}>
                <FinishFormButtons closeCallback={setIsAdd}/>
                <FormField name='first_name'
                           placeholder={t("Register/Name")}
                           label={t("Register/Name")}
                           inputRef={register({
                               required: `${t("Error message/Field is required")}`
                           })}
                           error={errors?.first_name}
                           server_error={server_error?.first_name ? server_error.first_name[0] : ''}
                />
                <FormField name='last_name'
                           placeholder={t("Register/Last Name")}
                           label={t("Register/Last Name")}
                           inputRef={register({
                               required: `${t("Error message/Field is required")}`
                           })}
                           error={errors?.last_name}
                           server_error={server_error?.last_name ? server_error.last_name[0] : ''}
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
                               pattern: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
                           })}
                           error={errors?.email}
                           server_error={server_error?.email ? server_error.email[0] : ''}
                           pattern_message={t("Error message/Email is not valid")}
                />
            </FormWrap>
        </FormContainer>
    )
}

export default AddUserForm

