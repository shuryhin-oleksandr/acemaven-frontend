import React, {useEffect, useState} from "react";
import {ActionsWrapper, FormTitle, HeaderWrapper, Outer, RegisterButton, UnderTitle} from "./form-styles";
import OptionsDeliveryButtons from "src/_UI/components/_commonComponents/optionsButtons/OptionsDeliveryButtons";
import ByPlaneForm from "./ByPlaneForm";
import CancelButton from "src/_UI/components/_commonComponents/buttons/navFormButtons/CancelButton";
import {VoidFunctionType} from "../../../../../_BLL/types/commonTypes";
import ByShipForm from "./ByShipForm";
import {useDispatch, useSelector} from "react-redux";
import {
    addNewSurcharge,
    getCarriers, getCurrencyList,
    getShippingModes,
    getShippingTypes
} from "../../../../../_BLL/reducers/surcharge&rates/surchargeThunks";
import {AppStateType} from "../../../../../_BLL/store";
import {useForm} from "react-hook-form";


type PropsType = {
    setNewSurchargeMode: VoidFunctionType
}

const RegistrationNewForm:React.FC<PropsType> = ({setNewSurchargeMode}) => {
    const [mode, setMode] = useState('ship')
    const [shippingValue, setShippingValue] = useState(0)

    const dispatch = useDispatch()
    const shipping_types = useSelector((state: AppStateType) => state.surcharge.shipping_type)
    const sea_carriers = useSelector((state: AppStateType) => state.surcharge.sea_carriers)
    const air_carriers = useSelector((state: AppStateType) => state.surcharge.air_carriers)
    const ports = useSelector((state: AppStateType) => state.surcharge.ports)
    const currency_list = useSelector((state: AppStateType) => state.surcharge.currency_list)

    const {register, control, errors, handleSubmit, getValues, setValue} = useForm()
    const onSubmit = (values: any) => {
        let charges_array = Object.keys(values.charges).map(o => (o !== null && values.charges[o]))
        let usageFees_array = values.usage_fees ? Object.keys(values.usage_fees).map(u => (u !== null && values.usage_fees[u])) : null
        let data = {...values, charges: charges_array, usage_fees: usageFees_array, location: Number(sessionStorage.getItem('port_id'))}
        let data_without_fees = {...values, charges: charges_array, location: Number(sessionStorage.getItem('port_id'))}
        console.log(data)
        usageFees_array !== null ? dispatch(addNewSurcharge(data)) : dispatch(addNewSurcharge(data_without_fees))
    }


    useEffect(() => {
        dispatch(getShippingTypes())
        dispatch(getCarriers())
        dispatch(getShippingModes())
        dispatch(getCurrencyList())
    }, [dispatch])

    return (
        <Outer onSubmit={handleSubmit(onSubmit)}>
            <HeaderWrapper>
                <FormTitle>New Surcharge</FormTitle>
                <ActionsWrapper>
                    <RegisterButton type='submit'>REGISTER</RegisterButton>
                    <CancelButton text='CANCEL' setIsOpen={setNewSurchargeMode}/>
                </ActionsWrapper>
            </HeaderWrapper>
            <OptionsDeliveryButtons mode={mode} setMode={setMode}/>
            {
                mode === 'ship'
                ? <ByShipForm shipping_modes={shipping_types && shipping_types[1]?.shipping_modes}
                              setShippingValue={setShippingValue}
                              shippingValue={shippingValue}
                              sea_carriers={sea_carriers}
                              currency_list={currency_list}
                              ports={ports}
                              control={control}
                              register={register}
                              errors={errors}
                              getValues={getValues}
                              setValue={setValue}
                    />
                : <ByPlaneForm shipping_modes={shipping_types && shipping_types[0]?.shipping_modes}
                               air_carriers={air_carriers}
                               setShippingValue={setShippingValue}
                               shippingValue={shippingValue}
                               currency_list={currency_list}
                               ports={ports}
                               control={control}
                               register={register}
                               errors={errors}
                               getValues={getValues}
                               setValue={setValue}
                    />
            }
        </Outer>
    )
}

export default RegistrationNewForm