import React from 'react'
import {Controller, useForm} from "react-hook-form";
import FormField from "../../../../components/_commonComponents/Input/FormField";
import {FormWrap, GroupWrap, UnderTitle} from "./form-styles";
import {VoidFunctionType} from "../../../../../_BLL/types/commonTypes";
import {CarrierType, ShippingModeType} from "../../../../../_BLL/types/rates&surcharges/surchargesTypes";
import SurchargeRateSelect from "../../../../components/_commonComponents/select/SurchargeRateSelect";
import SeaCargoForm from "./sea_containerized_cargo/SeaCargoForm";

type PropsType = {
    setShippingValue: VoidFunctionType,
    shipping_modes: ShippingModeType[] | null,
    sea_carriers: CarrierType[] | null,
    shippingValue: number
}

const ByShipForm:React.FC<PropsType> = ({setShippingValue, shipping_modes, sea_carriers, ...props}) => {
    const {register, control, errors, handleSubmit, getValues} = useForm()
    const onSubmit = (values: any) => {
        console.log(values)
    }

    let carriers = [
        {title: 'Import', id: 'Import'},
        {title: 'Export', id: 'Export'}
    ]
    let ship_mode = shipping_modes? shipping_modes.find(s => s.id === Number(props.shippingValue)) : null
    console.log('choise', ship_mode)

    return (
        <FormWrap onSubmit={handleSubmit(onSubmit)}>
            <div style={{display: 'flex', width: '100%'}}>
                <GroupWrap>
                    <Controller name='carrier'
                                control={control}
                                defaultValue=''
                                as={
                                    <SurchargeRateSelect label='Carrier'
                                                         options={sea_carriers}
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
                                                         callback={setShippingValue}
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
            </div>
            <>
                {!props.shippingValue
                    ? <UnderTitle>Please, complete the parameters of the surcharge for the value fields to appear</UnderTitle>
                    : <SeaCargoForm ship_mode={ship_mode}/>
                }
            </>
        </FormWrap>
    )
}

export default ByShipForm