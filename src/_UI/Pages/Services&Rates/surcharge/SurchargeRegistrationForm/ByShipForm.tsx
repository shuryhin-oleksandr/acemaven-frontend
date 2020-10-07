import React, {useEffect, useState} from 'react'
import {Controller} from "react-hook-form";
import FormField from "../../../../components/_commonComponents/Input/FormField";
import {FormWrap, GroupWrap, Port, PortsList, UnderTitle} from "./form-styles";
import {VoidFunctionType} from "../../../../../_BLL/types/commonTypes";
import {
    CarrierType,
    CurrencyType,
    PortType,
    ShippingModeType
} from "../../../../../_BLL/types/rates&surcharges/surchargesTypes";
import SurchargeRateSelect from "../../../../components/_commonComponents/select/SurchargeRateSelect";
import SeaCargoForm from "./sea_containerized_cargo/SeaCargoForm";
import {useDispatch} from "react-redux";
import {getPorts} from "../../../../../_BLL/reducers/surcharge&rates/surchargeThunks";
import {surchargeActions} from "../../../../../_BLL/reducers/surcharge&rates/surchargeReducer";

type PropsType = {
    setShippingValue: VoidFunctionType,
    shipping_modes: ShippingModeType[] | null,
    sea_carriers: CarrierType[] | null,
    currency_list: CurrencyType[] | null,
    ports?: any,
    shippingValue: number,
    control?: any,
    register?: any,
    errors?: any,
    getValues?: any,
    setValue?: any
}

const ByShipForm:React.FC<PropsType> = ({setShippingValue, shipping_modes, sea_carriers, ...props}) => {

    let carriers = [
        {title: 'Import', id: 'import'},
        {title: 'Export', id: 'export'}
    ]
    let ship_mode = shipping_modes? shipping_modes.find(s => s.id === Number(props.shippingValue)) : null
    console.log('ship', ship_mode)

    const dispatch = useDispatch()

    let onChangeHandler = (value: any) => {
        dispatch(getPorts(value.value))
    }
    let closePortsHandler = (port: PortType) => {
        setLocationPort(port);
        sessionStorage.setItem('port_id', JSON.stringify(port.id))
        dispatch(surchargeActions.setPortsList([]))
    }

    const [location_port, setLocationPort] = useState(null as PortType | null)
    useEffect(() => {
        if(location_port !== null) {
            props.setValue('location', location_port?.display_name)
        }
    }, [props.setValue, location_port])

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