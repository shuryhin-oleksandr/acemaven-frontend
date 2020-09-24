import React from 'react'
import {Controller, useForm} from 'react-hook-form'
import {IAddNewBank} from "../../../../_BLL/types/addNewUserTypes";
import { FormWrap, SubmitButton} from "../CreateNewUser/AddUserForm";
import FormField from "../../../components/_commonComponents/Input/FormField";
import FormSelect from '../../../components/_commonComponents/select/FormSelect';
import { useDispatch } from 'react-redux';
import {addBank} from "../../../../_BLL/reducers/employeesAndBanksReducer";


const AddBankForm:React.FC = () => {
   const {register, handleSubmit, errors, control, getValues} = useForm<IAddNewBank>()
    const dispatch = useDispatch()


    const onSubmit = (values: IAddNewBank) => {
        console.log(values)
        dispatch(addBank(values))
    }


    let options2 = [
        {name: 'Savings', id: 1, value: 'savings'},
        {name: 'Checking', id: 2, value: 'checking'}
    ]

    return (
        <FormWrap onSubmit={handleSubmit(onSubmit)}>


            <FormField label='Bank Name'
                        name='bank_name'
                        placeholder='Bank Name'
                        error={errors?.bank_name?.message}
                       inputRef={register({
                           required: 'Field is required'
                       })}
                       getValues={getValues}
            />
                <FormField label='Branch No.'
                       placeholder='Branch No.'
                       inputRef={register({
                           required: 'Field is required'
                        })}
                       name='branch'
                       error={errors?.branch?.message}
                           getValues={getValues}
                />
                <FormField label='Account No.'
                       placeholder='Account No.'
                       inputRef={register({
                           required: 'Field is required'
                       })}
                       name='number'
                       error={errors?.number?.message}
                           getValues={getValues}
                />
                <Controller name='account_type'
                            control={control}
                            defaultValue=''
                            as={
                                <FormSelect label='Account Type'
                                            options={options2}
                                            error={errors?.account_type?.message}
                                />
                            }
                            rules={{ required: 'Field is required' }}
                />

                <SubmitButton type='submit'>ADD BANK ACCOUNT</SubmitButton>
        </FormWrap>
    )
}

export default AddBankForm