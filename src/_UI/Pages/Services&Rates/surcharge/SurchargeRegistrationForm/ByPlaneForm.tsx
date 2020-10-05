import React from 'react';
import {Controller, useForm} from "react-hook-form";
import {FormWrap, GroupWrap} from "./form-styles";
import FormField from "../../../../components/_commonComponents/Input/FormField";
import {CarrierType, ShippingModeType} from "../../../../../_BLL/types/rates&surcharges/surchargesTypes";
import SurchargeRateSelect from "../../../../components/_commonComponents/select/SurchargeRateSelect";

type PropsType = {
    shipping_modes: ShippingModeType[] | null,
    air_carriers: CarrierType[] | null
}

const ByPlaneForm:React.FC<PropsType> = ({shipping_modes, ...props}) => {
    const {register, control, errors, handleSubmit, getValues} = useForm()
    const onSubmit = (values: any) => {
        console.log(values)
    }

    let carriers = [
        {title: 'Import', id: 'Import'},
        {title: 'Export', id: 'Export'}
    ]

    return (
        <FormWrap onSubmit={handleSubmit(onSubmit)}>
            <GroupWrap>
                <Controller name='carrier'
                            control={control}
                            defaultValue=''
                            as={
                                <SurchargeRateSelect label='Carrier'
                                            options={props.air_carriers}
                                />
                            }
                />
                <Controller name='direction'
                            control={control}
                            defaultValue=''
                            as={
                                <SurchargeRateSelect label='Direction'
                                            options={carriers}
                                />
                            }
                />
                <Controller name='shipping_mode'
                            control={control}
                            defaultValue=''
                            as={
                                <SurchargeRateSelect label='Shipping Mode'
                                            options={shipping_modes}
                                />
                            }
                />
            </GroupWrap>
            <GroupWrap>
                <Controller name='location'
                            control={control}
                            defaultValue=''
                            as={
                                <SurchargeRateSelect label='Location'
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

export default ByPlaneForm