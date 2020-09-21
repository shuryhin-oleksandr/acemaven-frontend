import React from 'react'
import {FormWrap, GroupWrap} from "./form-styles";
import {Controller, useForm} from "react-hook-form";
import FormSelect from "../../../../components/_commonComponents/select/FormSelect";
import FormField from "../../../../components/_commonComponents/Input/FormField";

const ByShipForm:React.FC = () => {
    const {register, control, errors, handleSubmit, getValues} = useForm()
    const onSubmit = (values: any) => {
        console.log(values)
    }

    let carriers = [
        {name: '1'},
        {nam: '2'}
    ]

    return (
        <FormWrap onSubmit={handleSubmit(onSubmit)}>
            <GroupWrap>
                <Controller name='carrier'
                            control={control}
                            defaultValue=''
                            as={
                                <FormSelect label='Carrier'
                                            options={carriers}
                                />
                            }
                />
                <Controller name='direction'
                            control={control}
                            defaultValue=''
                            as={
                                <FormSelect label='Direction'
                                            options={carriers}
                                />
                            }
                />
                <Controller name='shipping_mode'
                            control={control}
                            defaultValue=''
                            as={
                                <FormSelect label='Shipping Mode'
                                            options={carriers}
                                />
                            }
                />
            </GroupWrap>
            <GroupWrap>
                <Controller name='location'
                            control={control}
                            defaultValue=''
                            as={
                                <FormSelect label='Location'
                                            options={carriers}
                                />
                            }
                />
                <FormField label='Start Date'
                           placeholder='DD/MM/YYYY'
                           inputRef={register({
                               required: 'Field is required'
                           })}
                           name='startDate'
                           error={errors?.startDate?.message}
                           getValues={getValues}
                />
                <FormField label='Expiration Date'
                           placeholder='DD/MM/YYYY'
                           inputRef={register({
                               required: 'Field is required'
                           })}
                           name='expirationDate'
                           error={errors?.expirationDate?.message}
                           getValues={getValues}
                />
            </GroupWrap>
        </FormWrap>
    )
}

export default ByShipForm