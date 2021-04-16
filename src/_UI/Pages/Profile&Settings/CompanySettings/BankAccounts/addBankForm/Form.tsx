import React from "react";
//react-hook-form
import {Controller, useForm} from "react-hook-form";
//react-redux
import {useSelector} from "react-redux";
//BLL
import {AppStateType} from "../../../../../../_BLL/store";
import { addBankAccount } from "../../../../../../_BLL/thunks/profile/profileThunks";
//types
import {IAddNewBank} from "../../../../../../_BLL/types/addNewUserTypes";
import {ErrorServerMessage} from "../../../../SignInPage";
//components
import FormField from "src/_UI/components/_commonComponents/Input/FormField";
import FormSelect from "../../../../../components/_commonComponents/select/FormSelect";
import FinishFormButtons
    from "../../../../../components/_commonComponents/buttons/actionsFormButtons/finishFormButtons";
//styles
import { FormContainer} from "./bank-form-styles";
import {useTranslation} from "react-i18next";



type PropsType = {
    setIsAdd?: any,
    dispatch?: any
}

const Form:React.FC<PropsType> = ({setIsAdd, dispatch}) => {
    const {register, errors, handleSubmit, control} = useForm<IAddNewBank>()
    const onSubmit = (values:IAddNewBank) => {
            dispatch && dispatch(addBankAccount( values))
    }

    const errorBank = useSelector((state: AppStateType) => state.profile.addingBankError)

    let options2 = [
        {name: 'Savings', id: 1, value: 'savings'},
        {name: 'Checking', id: 2, value: 'checking'}
    ]
  const {t} = useTranslation();
    return (
        <FormContainer onSubmit={handleSubmit(onSubmit)}>
            <FinishFormButtons closeCallback={setIsAdd}/>
            <FormField label={t('Add bank account/Bank Name')}
                       name='bank_name'
                       placeholder={t('Add bank account/Bank Name')}
                       error={errors?.bank_name}
                       inputRef={register({
                           required: `${t("Error message/Field is required")}`,
                           minLength: 1,
                           maxLength: 100,
                       })}
                       max_width='447px'
                       max="100"
                       min_height='70px'
            />
            <FormField label={t('Add bank account/Bank No.')}
                       name='bank_number'
                       placeholder='000'
                       error={errors?.bank_number}
                       inputRef={register({
                           required: `${t("Error message/Field is required")}`,
                           minLength: 1,
                           maxLength: 3,
                       })}
                       max_width='447px'
                       max="3"
                       min_height='70px'
                       type="number"
            />
            <FormField name='branch'
                       placeholder='0000-0'
                       label={t('Add bank account/Branch No.')}
                       error={errors?.branch}
                       inputRef={register({
                           required: `${t("Error message/Field is required")}`,
                           maxLength: 6,
                           minLength: 1,
                           pattern: /^\d{4}-\d{1}$/,
                       })}
                       max='6'
                       max_width='447px'
                       pattern_message={t("Error message/Wrong format. Ex.")}
                      min_height='70px'
            />
            <FormField name='number'
                       placeholder='0000000000000'
                       label={t('Add bank account/Account No.')}
                       error={errors?.number}
                       type='number'
                       inputRef={register({
                           required: `${t("Error message/Field is required")}`,
                           pattern: /^\d+$/,
                           maxLength: 50,
                           minLength: 1,
                       })}
                       max='50'
                       max_width='447px'
                       min_height='70px'
            />
            {errorBank && <ErrorServerMessage>{errorBank}</ErrorServerMessage>}
            <Controller name='account_type'
                        control={control}
                        defaultValue='savings'
                        rules={{
                            required: `${t("Error message/Field is required")}`
                        }}
                        as={
                            <FormSelect label={t('Add bank account/Account Type')}
                                        options={options2}
                                        placeholder={t('Add bank account/Savings')}
                                        error={errors?.account_type?.message}
                            />
                        }
            />
        </FormContainer>
    )
}

export default Form