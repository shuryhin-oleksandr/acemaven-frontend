import React, {useEffect} from 'react'
import {
    ActionsWrapper,
    FormTitle,
    HeaderWrapper,
    RegisterButton,
    UnderTitle
} from "./form-styles";
import CancelButton from "../../../../components/_commonComponents/buttons/navFormButtons/CancelButton";
import OptionsDeliveryButtons
    from "../../../../components/_commonComponents/optionsButtons/delivery/OptionsDeliveryButtons";
import {CurrentShippingType, ShippingModeType} from "../../../../../_BLL/types/rates&surcharges/newSurchargesTypes";
import FreightRateForm from "./FreightRateForm";
import Rates from "./tables/Rates";
import SurchargesToRate from "./tables/SurchargesToRate";
import {CarrierType, ContainerType, PortType} from "../../../../../_BLL/types/rates&surcharges/surchargesTypes";
import {registerNewFreightRateThunk} from "../../../../../_BLL/thunks/rates&surcharge/rateThunks";
import {useDispatch} from "react-redux";
import {Outer} from "../../surcharge/register_new_surcharge/form-styles";

type PropsType = {
    handleSubmit: any
    control: any
    register: any
    errors: any
    getValues: any
    setValue: (name: string, value: string | number) => void
    closeRateRegistration: () => void
    setMode: (mode: CurrentShippingType) => void
    mode: CurrentShippingType
    carrierOptions:  CarrierType[] | null
    shippingModeOptions:  ShippingModeType[]
    shippingValue: number
    setShippingValue: (shippingModeId: number) => void
    origin_ports: Array<PortType> | null
    destination_ports: Array<PortType> | null
    onOriginChangeHandler: (value: any) => void
    onDestinationChangeHandler: (value: any) => void
    closePortsHandler: any
    getBookedRatesDates: (portName: string, portId: number) => void
    usageFees:  ContainerType[]
}

const RegisterNewFreightRate:React.FC<PropsType> = ({handleSubmit, control, register, errors, getValues, setValue,
                                                    closeRateRegistration, setMode, mode, carrierOptions, shippingModeOptions,
                                                    shippingValue, setShippingValue, origin_ports, destination_ports,
                                                    onOriginChangeHandler, onDestinationChangeHandler, closePortsHandler,
                                                    getBookedRatesDates, usageFees}) => {

    const dispatch = useDispatch()
    const onSubmit = (values: any) => {
        let rates_array;
        if(values.rates.length > 1) {
            let full_rates = values.rates.filter((r: any) => r !== null)
            rates_array = full_rates.map((r: any) => r !== null && r.start_date && {container_type: r.container_type, currency: r.currency, rate: r.rate,
                    start_date: r.from, expiration_date: r.to}
                || (r !== null && !r.start_date && {container_type: r.container_type, currency: r.currency, rate: r.rate})
            )
            let data = {
                carrier: values.carrier,
                shipping_mode: values.shipping_mode,
                transit_time: Number(values.transit_time),
                origin: Number(sessionStorage.getItem('origin_id')),
                destination: Number(sessionStorage.getItem('destination_id')),
                rates: rates_array
            }
            dispatch(registerNewFreightRateThunk(data))
        } else {
            let data_without_containers = {
                carrier: values.carrier,
                shipping_mode: values.shipping_mode,
                transit_time: Number(values.transit_time),
                origin: Number(sessionStorage.getItem('origin_id')),
                destination: Number(sessionStorage.getItem('destination_id')),
                rates: [{
                    currency: values.rates.currency,
                    rate: values.rates.rate,
                    start_date: values.rates[0].from,
                    expiration_date: values.rates[0].to
                }]
            }
            dispatch(registerNewFreightRateThunk(data_without_containers))
        }
    }

    useEffect(() => {

    }, [])

    return (
        <Outer onSubmit={handleSubmit(onSubmit)}>
            <HeaderWrapper>
                <FormTitle>Freight rates</FormTitle>
                <ActionsWrapper>
                    <RegisterButton type="submit">SAVE</RegisterButton>
                    <CancelButton text="CANCEL" setIsOpen={closeRateRegistration} />
                </ActionsWrapper>
            </HeaderWrapper>
            <div style={{ marginBottom: "20px", width: "150px" }}>
                <OptionsDeliveryButtons
                    directory="import"
                    mode={mode}
                    setMode={setMode}
                    searchColumn=""
                    searchValue=""
                />
            </div>
            <FreightRateForm control={control}
                             errors={errors}
                             register={register}
                             getValues={getValues}
                             carrierOptions={carrierOptions}
                             shippingModeOptions={shippingModeOptions}
                             shippingValue={shippingValue}
                             setShippingValue={setShippingValue}
                             origin_ports={origin_ports}
                             destination_ports={destination_ports}
                             onOriginChangeHandler={onOriginChangeHandler}
                             onDestinationChangeHandler={onDestinationChangeHandler}
                             closePortsHandler={closePortsHandler}
                             getBookedRatesDates={getBookedRatesDates}
            />
            {!!shippingValue
                ? <>
                    <Rates control={control}
                           errors={errors}
                           setValue={setValue}
                           usageFees={usageFees}
                           register={register}
                           getValues={getValues}
                    />
                    <SurchargesToRate />
                    </>
                : <UnderTitle>
                    Please, complete the parameters of the freight rate for the value fields
                    to appear
                </UnderTitle>
            }
        </Outer>
    )
}

export default RegisterNewFreightRate