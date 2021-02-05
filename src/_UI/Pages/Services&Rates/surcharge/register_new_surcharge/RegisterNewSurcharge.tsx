import React, {useEffect, useState} from 'react'
//moment js
import moment from "moment";
//react-redux
import {useDispatch} from "react-redux";
//BLL
import {surchargeActions} from "../../../../../_BLL/reducers/surcharge&rates/surchargeReducer";
import {addNewSurcharge} from "../../../../../_BLL/thunks/rates&surcharge/surchargeThunks";
//types
import {ShippingModeType, CurrentShippingType} from 'src/_BLL/types/rates&surcharges/newSurchargesTypes';
import {
    AdditionalSurchargeType,
    CarrierType,
    ContainerType,
    PortType
} from "../../../../../_BLL/types/rates&surcharges/surchargesTypes";
//components
import OptionsDeliveryButtons
    from "../../../../components/_commonComponents/optionsButtons/delivery/OptionsDeliveryButtons";
import SurchargeForm from "./SurchargeForm";
import UsageFees from "./tables/UsageFees";
import Additional from './tables/Additional';
//styles
import {
    ActionsWrapper,
    Cancel, ErrorChargesServerMessage,
    FormTitle,
    HeaderWrapper,
    OptionsDeliveryWrapper,
    Outer,
    RegisterButton
} from './form-styles';
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
    carrierOptions: CarrierType[] | null
    shippingModeOptions: ShippingModeType[]
    shippingValue: number
    setShippingValue: (shippingModeId: number) => void
    ports: Array<PortType> | null
    locationChangeHandler: (currentTarget: HTMLInputElement) => void
    getDisabledSurchargesDates: (portName: string, portId: number) => void
    usageFees: ContainerType[]
    additionalTableName: string
    additionalType: string
    additional: AdditionalSurchargeType[]
    handleSubmit: any,
    adding_success: boolean,
    watchResultArr: number[],
    watchResultArrForDates: number[],
    location_id: number,
    adding_error: string[]
}


const RegisterNewSurcharge: React.FC<PropsType> = (props) => {
    const {
        handleSubmit, mode, setMode, control, register, errors, setValue, closeRegisterForm, carrierOptions, shippingModeOptions,
        setShippingValue, ports, locationChangeHandler, getDisabledSurchargesDates, usageFees, additionalTableName, adding_error,
        additionalType, shippingValue, additional, adding_success, watchResultArr, watchResultArrForDates, location_id
    } = props

    let [invalidDate, setInvalidDate] = useState('')

    const dispatch = useDispatch()

    const onSubmit = (values: any) => {
        console.log(values)
        if (values.from <= values.to) {
            dispatch(surchargeActions.setAddingSurchargeError([]))

            //additional charges
            let charges_array = Object.keys(values.charges).map(o => (o !== null && values.charges[o]))
            let additional_charges_array = charges_array.map(a => {
                if (a.charge && a.conditions) {
                    return {
                        additional_surcharge: a.additional_surcharge,
                        charge: a.charge,
                        conditions: a.conditions,
                        currency: a.currency
                    }
                } else if (!a.charge && a.conditions) {
                    return {
                        additional_surcharge: a.additional_surcharge,
                        conditions: a.conditions,
                        currency: a.currency
                    }
                } else if (!a.charge && !a.conditions) {
                    return {
                        additional_surcharge: a.additional_surcharge,
                        currency: a.currency
                    }
                } else {
                    return a
                }
            })

            //handling containers & packaging charges
            let fees_array = values.usage_fees ? Object.keys(values.usage_fees).map(u => (u !== null && values.usage_fees[u])) : null
            let usageFees_array = fees_array?.map(f => f.charge && {
                    container_type: f.container_type,
                    currency: f.currency,
                    charge: f.charge
                }
                || !f.charge && {container_type: f.container_type, currency: f.currency}
            )

            let data = {
                carrier: values.carrier,
                direction: values.direction,
                shipping_mode: values.shipping_mode,
                start_date: moment(values.from).format('DD/MM/YYYY'),
                expiration_date: moment(values.to).format('DD/MM/YYYY'),
                charges: additional_charges_array,
                usage_fees: usageFees_array,
                location: location_id
            }

            let data_without_fees = {
                start_date: moment(values.from).format('DD/MM/YYYY'),
                expiration_date: moment(values.to).format('DD/MM/YYYY'),
                carrier: values.carrier,
                direction: values.direction,
                shipping_mode: values.shipping_mode,
                charges: additional_charges_array,
                location: location_id
            }

            usageFees_array !== null ? dispatch(addNewSurcharge(data)) : dispatch(addNewSurcharge(data_without_fees))
        } else {
            setInvalidDate('Invalid dates')
        }
    }
    useEffect(() => {
        if (adding_success) {
            closeRegisterForm()
        }
    }, [adding_success])


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
                                        setShippingValue={setShippingValue}
                />
            </OptionsDeliveryWrapper>
            <SurchargeForm
                setValue={setValue}
                control={control}
                register={register}
                errors={errors}
                carrierOptions={carrierOptions}
                shippingModeOptions={shippingModeOptions}
                setShippingValue={setShippingValue}
                ports={ports}
                locationChangeHandler={locationChangeHandler}
                getDisabledSurchargesDates={getDisabledSurchargesDates}
                required_dates={true}
                adding_success={adding_success}
                watchResultArr={watchResultArr}
                watchResultArrForDates={watchResultArrForDates}
                location_id={location_id}
                invalidDate={invalidDate}
            />
            {adding_error && adding_error?.length > 0
            && <ErrorChargesServerMessage text_align='start'>
                Charge has to be equal or grater than 0 and includes max 15 numbers.
            </ErrorChargesServerMessage>
            }
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
                                errors={errors}
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