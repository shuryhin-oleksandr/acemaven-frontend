import React from 'react'
import {
    ActionsWrapper,
    Cancel,
    FormTitle,
    HeaderWrapper,
    OptionsDeliveryWrapper,
    Outer,
    RegisterButton
} from './form-styles';
import OptionsDeliveryButtons
    from "../../../../components/_commonComponents/optionsButtons/delivery/OptionsDeliveryButtons";
import {ShippingModeType, CurrentShippingType} from 'src/_BLL/types/rates&surcharges/newSurchargesTypes';
import SurchargeForm from "./SurchargeForm";
import UsageFees from "./tables/UsageFees";
import Additional from './tables/Additional';
import {
    AdditionalSurchargeType,
    CarrierType,
    ContainerType,
    PortType
} from "../../../../../_BLL/types/rates&surcharges/surchargesTypes";
import moment from "moment";
import {addNewSurcharge} from "../../../../../_BLL/thunks/rates&surcharge/surchargeThunks";
import {useDispatch} from "react-redux";
import {UnderTitle} from "../../rates/register_new_freight_rate/form-styles";

type PropsType = {
    mode: CurrentShippingType
    setMode: (mode: CurrentShippingType) => void
    control: any
    register: any
    errors: any
    getValues: any
    setValue: (name: string, value: string | number) => void
    closeRegisterForm: () => void
    carrierOptions:  CarrierType[] | null
    shippingModeOptions:  ShippingModeType[]
    shippingValue: number
    setShippingValue: (shippingModeId: number) => void
    ports: Array<PortType> | null
    locationChangeHandler: (currentTarget: HTMLInputElement) => void
    getDisabledSurchargesDates: (portName: string, portId: number) => void
    usageFees:  ContainerType[]
    additionalTableName: string
    additionalType: string
    additional: AdditionalSurchargeType[]
    handleSubmit: any
}



const RegisterNewSurcharge: React.FC<PropsType> = (props) => {
    const {
        handleSubmit, mode, setMode, control, register, errors, getValues, setValue, closeRegisterForm, carrierOptions, shippingModeOptions,
        setShippingValue, ports, locationChangeHandler, getDisabledSurchargesDates, usageFees, additionalTableName,
        additionalType, shippingValue, additional
    } = props

    const dispatch = useDispatch()

    const onSubmit = (values: any) => {
        debugger
        let charges_array = Object.keys(values.charges).map(o => (o !== null && values.charges[o]))

        let fees_array = values.usage_fees ? Object.keys(values.usage_fees).map(u => (u !== null && values.usage_fees[u])) : null
        let usageFees_array = fees_array?.map(f => f.charge && {container_type: f.container_type,currency: f.currency, charge: f.charge}
        || !f.charge && {container_type: f.container_type, currency: f.currency}
        )

        let data = {carrier: values.carrier,
            direction: values.direction,
            shipping_mode: values.shipping_mode,
            start_date: moment(values.from).format('DD/MM/YYYY'),
            expiration_date: moment(values.to).format('DD/MM/YYYY'),
            charges: charges_array,
            usage_fees: usageFees_array,
            location: Number(sessionStorage.getItem('port_id'))}

        let data_without_fees = {start_date: moment(values.from).format('DD/MM/YYYY'),
            expiration_date: moment(values.to).format('DD/MM/YYYY'),
            carrier: values.carrier,
            direction: values.direction,
            shipping_mode: values.shipping_mode,
            charges: charges_array,
            location: Number(sessionStorage.getItem('port_id'))}

        usageFees_array !== null ? dispatch(addNewSurcharge(data)) : dispatch(addNewSurcharge(data_without_fees))
        closeRegisterForm()
    }


    return (
        <Outer onSubmit={handleSubmit(onSubmit)}>
            <HeaderWrapper>
                <FormTitle>New Surcharge</FormTitle>
                <ActionsWrapper>
                    <RegisterButton type='submit'>REGISTER</RegisterButton>
                    <Cancel onClick={closeRegisterForm}>CANCEL</Cancel>
                </ActionsWrapper>
            </HeaderWrapper>
            <OptionsDeliveryWrapper>
                <OptionsDeliveryButtons searchColumn=''
                                        searchValue=''
                                        directory='import'
                                        mode={mode}
                                        setMode={setMode}
                />
            </OptionsDeliveryWrapper>
            <SurchargeForm
                setValue={setValue}
                control={control}
                register={register}
                getValues={getValues}
                errors={errors}
                carrierOptions={carrierOptions}
                shippingModeOptions={shippingModeOptions}
                setShippingValue={setShippingValue}
                ports={ports}
                locationChangeHandler={locationChangeHandler}
                getDisabledSurchargesDates={getDisabledSurchargesDates}
            />
            {
                !!shippingValue
                    ? <>
                    {
                        usageFees.length > 0 && <UsageFees
                        control={control}
                        usageFees={usageFees}
                        tableName={additionalTableName}
                        type={additionalType}
                        setValue={setValue}
                    />
                    }
                    {
                        additional.length > 0 &&
                        <Additional
                            control={control}
                            shippingMode={shippingValue}
                            charges={additional}
                            setValue={setValue}
                        />

                    }
                </>
                    : <UnderTitle>
                        Please, complete the parameters of the surcharge for the value fields
                        to appear
                    </UnderTitle>
            }

        </Outer>

    )
};

export default RegisterNewSurcharge