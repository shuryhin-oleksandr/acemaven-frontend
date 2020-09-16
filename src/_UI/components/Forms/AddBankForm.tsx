import React from 'react'
import { useForm } from 'react-hook-form'
import {IAddNewBank} from "../../../_BLL/types/addNewUserTypes";
import { FormWrap, SubmitButton} from "./AddUserForm";
import FormField from "../_commonComponents/Input/FormField";
import FormSelect from '../_commonComponents/select/FormSelect';


const AddBankForm:React.FC = () => {
   const {register, handleSubmit, errors} = useForm<IAddNewBank>()
    const onSubmit = (values: IAddNewBank) => {
        console.log(values)
    }



    return (
        <FormWrap onSubmit={handleSubmit(onSubmit)}>
                <FormSelect label='Bank Name'
                            name='name'
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
                <FormSelect label='Account Type'
                            name='accountType'

                />
                <SubmitButton type='submit'>Add bank account</SubmitButton>
        </FormWrap>
    )
}

export default AddBankForm