import React from "react";
import {Controller, useForm} from "react-hook-form";
import { FormContainer} from "./bank-form-styles";
import FormField from "src/_UI/components/_commonComponents/Input/FormField";
import FormSelect from "../../../../../components/_commonComponents/select/FormSelect";
import FinishFormButtons
    from "../../../../../components/_commonComponents/buttons/actionsFormButtons/finishFormButtons";
import {IAddNewBank} from "../../../../../../_BLL/types/addNewUserTypes";
import {addBankAccount} from "../../../../../../_BLL/reducers/profileReducer";
import {ErrorServerMessage} from "../../../../SignInPage";
import {useSelector} from "react-redux";
import {AppStateType} from "../../../../../../_BLL/store";



type PropsType = {
    setIsAdd?: any,
    dispatch?: any
}

const Form:React.FC<PropsType> = ({setIsAdd, dispatch}) => {
    const {register, errors, handleSubmit, getValues, control} = useForm<IAddNewBank>()
    const onSubmit = (values:IAddNewBank) => {
            dispatch && dispatch(addBankAccount( values))
    }

    const errorBank = useSelector((state: AppStateType) => state.profile.addingBankError)

    let options2 = [
        {name: 'Savings', id: 1, value: 'savings'},
        {name: 'Checking', id: 2, value: 'checking'}
    ]

    return (
        <FormContainer onSubmit={handleSubmit(onSubmit)}>
            <FinishFormButtons closeCallback={setIsAdd}/>
            <FormField label='Bank Name'
                       name='bank_name'
                       placeholder='Bank Name'
                       getValues={getValues}
                       error={errors?.bank_name}
                       inputRef={register({
                           required: 'Field is required',
                           minLength: 1,
                           maxLength: 100,
                       })}
                       maxW='447px'
                       max="100"
            />
            <FormField label='Bank Number'
                       name='bank_number'
                       placeholder='000'
                       getValues={getValues}
                       error={errors?.bank_number}
                       inputRef={register({
                           required: 'Field is required',
                           minLength: 1,
                           maxLength: 3,
                       })}
                       maxW='447px'
                       max="3"
            />
            <FormField name='branch'
                       placeholder='0000-0'
                       label='Branch Number'
                       getValues={getValues}
                       error={errors?.branch}
                       inputRef={register({
                           required: 'Field is required',
                           maxLength: 6,
                           minLength: 1,
                           pattern: /^\d{4}-\d{1}$/,
                       })}
                       max='6'
                       maxW='447px'
                       pattern_message='Wrong format. Ex.: 0000-0'
            />
            <FormField name='number'
                       placeholder='0000000000000'
                       label='Account Number'
                       getValues={getValues}
                       error={errors?.number}
                       type='number'
                       inputRef={register({
                           required: 'Field is required',
                           pattern: /^\d+$/,
                           maxLength: 50,
                           minLength: 1,
                       })}
                       max='50'
                       maxW='447px'
            />
            {errorBank && <ErrorServerMessage>{errorBank}</ErrorServerMessage>}
            <Controller name='account_type'
                        control={control}
                        defaultValue='savings'
                        rules={{
                            required: 'Field is required'
                        }}
                        as={
                            <FormSelect label='Account Type'
                                        options={options2}
                                        placeholder='Savings'
                                        error={errors?.account_type?.message}
                            />
                        }
            />
        </FormContainer>
    )
}

export default Form