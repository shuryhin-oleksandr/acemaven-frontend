import React from "react";
import {Controller, useForm} from "react-hook-form";
import { FormContainer} from "./bank-form-styles";
import {AddNewBankAccount} from "../../../../../../_BLL/types/profile&settingsTypes";
import FormField from "src/_UI/components/_commonComponents/Input/FormField";
import FormSelect from "../../../../../components/_commonComponents/select/FormSelect";
import FinishFormButtons
    from "../../../../../components/_commonComponents/buttons/actionsFormButtons/finishFormButtons";
import {VoidFunctionType} from "../../../../../../_BLL/types/commonTypes";


type PropsType = {
    setIsAdd?: VoidFunctionType
}

const Form:React.FC<PropsType> = ({setIsAdd}) => {
    const {register, errors, handleSubmit, getValues, control} = useForm<AddNewBankAccount>()
    const onSubmit = (values:AddNewBankAccount) => {
        console.log(values)
    }

    let options = [
        {name: 'Bank1', id: 1},
        {name: 'Bank2', id: 2}
    ]

    let options2 = [
        {name: 'savings', id: 1},
        {name: 'credit', id: 2}
    ]

    return (
        <FormContainer onSubmit={handleSubmit(onSubmit)}>
            <FinishFormButtons closeCallback={setIsAdd}/>
            <FormField name='tax'
                       placeholder='00.000.000/0000-00'
                       label='Tax id Number'
                       getValues={getValues}
                       error={errors?.tax?.message}
                       inputRef={register({
                           required: 'Field is required'
                       })}
            />
            <Controller name='bankName'
                        control={control}
                        defaultValue=''
                        as={
                            <FormSelect label='Bank Name'
                                        options={options}
                                        placeholder='Bank Name'
                            />
                        }
            />
            <FormField name='branchNumber'
                       placeholder='0000-0'
                       label='Branch Number'
                       getValues={getValues}
                       error={errors?.branchNumber?.message}
                       inputRef={register({
                           required: 'Field is required'
                       })}
            />
            <FormField name='accountNumber'
                       placeholder='123990011794763'
                       label='Account Number'
                       getValues={getValues}
                       error={errors?.accountNumber?.message}
                       inputRef={register({
                           required: 'Field is required'
                       })}
            />
            <Controller name='accountType'
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