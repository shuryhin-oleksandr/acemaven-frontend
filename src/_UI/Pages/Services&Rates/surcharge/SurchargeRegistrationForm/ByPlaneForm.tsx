import React, {useEffect, useState} from 'react';
import {Controller} from "react-hook-form";
import {FormWrap, GroupWrap, Port, PortsList, UnderTitle} from "./form-styles";
import FormField from "../../../../components/_commonComponents/Input/FormField";
import {
    CarrierType,
    CurrencyType,
    PortType,
    ShippingModeType
} from "../../../../../_BLL/types/rates&surcharges/surchargesTypes";
import SurchargeRateSelect from "../../../../components/_commonComponents/select/SurchargeRateSelect";
import {VoidFunctionType} from "../../../../../_BLL/types/commonTypes";
import {getPorts} from "../../../../../_BLL/reducers/surcharge&rates/surchargeThunks";
import {surchargeActions} from "../../../../../_BLL/reducers/surcharge&rates/surchargeReducer";
import {useDispatch} from "react-redux";
import {directions} from "../../../../../_BLL/helpers/surcharge_helpers_methods&arrays";
import AirCargoForm from "./air_cargo/air_CargoForm";

type PropsType = {
    setShippingValue: VoidFunctionType,
    shipping_modes: ShippingModeType[] | null,
    air_carriers: CarrierType[] | null,
    currency_list: CurrencyType[] | null,
    ports?: any,
    shippingValue: number,
    control?: any,
    register?: any,
    errors?: any,
    getValues?: any,
    setValue?: any
}

const ByPlaneForm:React.FC<PropsType> = ({shipping_modes, ...props}) => {

    let ship_mode = shipping_modes?
        shipping_modes.find(s => s.id === Number(props.shippingValue))
        : null
    console.log('ship', ship_mode)

    const [location_port, setLocationPort] = useState(null as PortType | null)
    const dispatch = useDispatch()

    let onChangeHandler = (value: any) => {
        dispatch(getPorts(value.value))
    }
    let closePortsHandler = (port: PortType) => {
        setLocationPort(port);
        sessionStorage.setItem('port_id', JSON.stringify(port.id))
        dispatch(surchargeActions.setPortsList([]))
    }

    useEffect(() => {
        if(location_port !== null) {
            props.setValue('location', location_port?.display_name)
        }
    }, [props, props.setValue, location_port])


    return (
        <FormWrap >
            <div style={{display: 'flex', width: '100%'}}>
            <GroupWrap>
                <Controller name='carrier'
                            control={props.control}
                            defaultValue=''
                            as={
                                <SurchargeRateSelect label='Carrier'
                                            options={props.air_carriers}
                                />
                            }
                />
                <Controller name='direction'
                            control={props.control}
                            defaultValue=''
                            as={
                                <SurchargeRateSelect label='Direction'
                                            options={directions}
                                />
                            }
                />
                <Controller name='shipping_mode'
                            control={props.control}
                            defaultValue=''
                            as={
                                <SurchargeRateSelect label='Shipping Mode'
                                                    options={shipping_modes}
                                                     callback={props.setShippingValue}
                                />
                            }
                />
            </GroupWrap>
            <GroupWrap>
                <div style={{width: '100%', display: 'flex', flexDirection: 'column', position: 'relative'}}>
                    <FormField inputRef={props.register({
                        required: 'Field is required'
                    })}
                               name='location'
                               placeholder='Local port'
                               label='Location'
                               error={props.errors?.location?.message}
                               getValues={props.getValues}
                               onChange={onChangeHandler}
                    />
                    {(props.ports && props.ports?.length > 0) && <PortsList>
                        {props.ports?.map((p:PortType) => <Port onClick={() => closePortsHandler(p)} key={p?.id}>
                                {p?.display_name}
                            </Port>
                        )}
                    </PortsList>}
                </div>
                <FormField label='Start Date'
                           placeholder='DD/MM/YYYY'
                           inputRef={props.register({
                               required: 'Field is required'
                           })}
                           name='start_date'
                           error={props.errors?.startDate?.message}
                           getValues={props.getValues}
                />
                <FormField label='Expiration Date'
                           placeholder='DD/MM/YYYY'
                           inputRef={props.register({
                               required: 'Field is required'
                           })}
                           name='expiration_date'
                           error={props.errors?.expirationDate?.message}
                           getValues={props.getValues}
                />
            </GroupWrap>
            </div>
            <>
                {!props.shippingValue
                    ? <UnderTitle>Please, complete the parameters of the surcharge for the value fields to appear</UnderTitle>
                    : <AirCargoForm control={props.control}
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

export default ByPlaneForm