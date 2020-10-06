import React from 'react'
import {Controller} from "react-hook-form";
import FormField from "../../../../components/_commonComponents/Input/FormField";
import {FormWrap, GroupWrap, UnderTitle} from "./form-styles";
import {VoidFunctionType} from "../../../../../_BLL/types/commonTypes";
import {CarrierType, CurrencyType, ShippingModeType} from "../../../../../_BLL/types/rates&surcharges/surchargesTypes";
import SurchargeRateSelect from "../../../../components/_commonComponents/select/SurchargeRateSelect";
import SeaCargoForm from "./sea_containerized_cargo/SeaCargoForm";

type PropsType = {
    setShippingValue: VoidFunctionType,
    shipping_modes: ShippingModeType[] | null,
    sea_carriers: CarrierType[] | null,
    currency_list: CurrencyType[] | null,
    shippingValue: number,
    control?: any,
    register?: any,
    errors?: any,
    getValues?: any,
}

const ByShipForm:React.FC<PropsType> = ({setShippingValue, shipping_modes, sea_carriers, ...props}) => {


    let carriers = [
        {title: 'Import', id: 'Import'},
        {title: 'Export', id: 'Export'}
    ]
    let ship_mode = shipping_modes? shipping_modes.find(s => s.id === Number(props.shippingValue)) : null
    console.log('ship_mode', ship_mode)

    return (
        <FormWrap >
            <div style={{display: 'flex', width: '100%'}}>
                <GroupWrap>
                    <Controller name='carrier'
                                control={props.control}
                                defaultValue=''
                                as={
                                    <SurchargeRateSelect label='Carrier'
                                                         options={sea_carriers}
                                    />
                                }
                    />
                    <Controller name='direction'
                                control={props.control}
                                defaultValue=''
                                as={
                                    <SurchargeRateSelect label='Direction'
                                                         options={carriers}

                                    />
                                }
                    />
                    <Controller name='shipping_mode'
                                control={props.control}
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
                                control={props.control}
                                defaultValue=''
                                as={
                                    <SurchargeRateSelect label='Location'
                                                         options={carriers}
                                    />
                                }
                    />
                    <FormField label='Start Date'
                               placeholder='DD/MM/YYYY'
                               inputRef={props.register({
                                   required: 'Field is required'
                               })}
                               name='startDate'
                               error={props.errors?.startDate?.message}
                               getValues={props.getValues}
                    />
                    <FormField label='Expiration Date'
                               placeholder='DD/MM/YYYY'
                               inputRef={props.register({
                                   required: 'Field is required'
                               })}
                               name='expirationDate'
                               error={props.errors?.expirationDate?.message}
                               getValues={props.getValues}
                    />
                </GroupWrap>
            </div>
            <>
                {!props.shippingValue
                    ? <UnderTitle>Please, complete the parameters of the surcharge for the value fields to appear</UnderTitle>
                    : <SeaCargoForm control={props.control}
                                    register={props.register}
                                    ship_mode={ship_mode}
                                    currency_list={props.currency_list}
                                    shipping_value={props.shippingValue}
                    />
                }
            </>
        </FormWrap>
    )
}

export default ByShipForm