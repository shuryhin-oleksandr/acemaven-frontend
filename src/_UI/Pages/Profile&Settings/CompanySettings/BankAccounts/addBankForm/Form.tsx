import React from "react";
import {Controller, useForm} from "react-hook-form";
import { FormContainer} from "./bank-form-styles";
import FormField from "src/_UI/components/_commonComponents/Input/FormField";
import FormSelect from "../../../../../components/_commonComponents/select/FormSelect";
import FinishFormButtons
    from "../../../../../components/_commonComponents/buttons/actionsFormButtons/finishFormButtons";
import {VoidFunctionType} from "../../../../../../_BLL/types/commonTypes";
import {IAddNewBank} from "../../../../../../_BLL/types/addNewUserTypes";
import {addBankAccount} from "../../../../../../_BLL/reducers/profileReducer";



type PropsType = {
    setIsAdd?: VoidFunctionType,
    dispatch?: VoidFunctionType
}

const Form:React.FC<PropsType> = ({setIsAdd, dispatch}) => {
    const {register, errors, handleSubmit, getValues, control} = useForm<IAddNewBank>()
    const onSubmit = (values:IAddNewBank) => {
        console.log(values)
        dispatch && dispatch(addBankAccount( values))
        setIsAdd && setIsAdd(false)
    }

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
                       error={errors?.bank_name?.message}
                       inputRef={register({
                           required: 'Field is required'
                       })}
            />
            <FormField name='branch'
                       placeholder='0000-0'
                       label='Branch Number'
                       getValues={getValues}
                       error={errors?.branch?.message}
                       inputRef={register({
                           required: 'Field is required'
                       })}
            />
            <FormField name='number'
                       placeholder='123990011794763'
                       label='Account Number'
                       getValues={getValues}
                       error={errors?.number?.message}
                       inputRef={register({
                           required: 'Field is required'
                       })}
            />
            <Controller name='account_type'
                        control={control}
                        defaultValue=''
                        as={
                            <FormSelect label='Account Type'
                                        options={options2}
                                        placeholder='Savings'
                            />
                        }
            />
        </FormContainer>
    )
}

export default Form