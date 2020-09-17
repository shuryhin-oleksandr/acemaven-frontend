import React from 'react'
import {Controller, useForm} from 'react-hook-form'
import {IAddNewBank} from "../../../_BLL/types/addNewUserTypes";
import { FormWrap, SubmitButton} from "./AddUserForm";
import FormField from "../_commonComponents/Input/FormField";
import FormSelect from '../_commonComponents/select/FormSelect';


const AddBankForm:React.FC = () => {
   const {register, handleSubmit, errors, control} = useForm<IAddNewBank>()
    const onSubmit = (values: IAddNewBank) => {
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
        <FormWrap onSubmit={handleSubmit(onSubmit)}>
               <Controller name='name'
                           control={control}
                           defaultValue=''
                           as={
                               <FormSelect label='Bank Name'
                                           options={options}
                               />
                           }
               />
                <FormField label='Branch No.'
                       placeholder='Branch No.'
                       inputRef={register({
                           required: 'Field is required'
                        })}
                       name='branchNumber'
                       error={errors?.branchNumber?.message}
                />
                <FormField label='Account No.'
                       placeholder='Account No.'
                       inputRef={register({
                           required: 'Field is required'
                       })}
                       name='accountNumber'
                       error={errors?.accountNumber?.message}
                />
                <Controller name='accountType'
                            control={control}
                            defaultValue=''
                            as={
                                <FormSelect label='Account Type'
                                            options={options2}
                                />
                            }
                />

                <SubmitButton type='submit'>Add bank account</SubmitButton>
        </FormWrap>
    )
}

export default AddBankForm