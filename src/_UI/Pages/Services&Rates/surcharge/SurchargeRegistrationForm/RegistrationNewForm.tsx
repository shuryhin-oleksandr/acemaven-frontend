import React, {useCallback, useEffect, useState} from "react";
import {ActionsWrapper, Cancel, FormTitle, HeaderWrapper, Outer, RegisterButton, UnderTitle} from "./form-styles";
import OptionsDeliveryButtons from "src/_UI/components/_commonComponents/optionsButtons/delivery/OptionsDeliveryButtons";
import ByPlaneForm from "./ByPlaneForm";
import {VoidFunctionType} from "../../../../../_BLL/types/commonTypes";
import ByShipForm from "./ByShipForm";
import {useDispatch, useSelector} from "react-redux";
import {
    addNewSurcharge,
    getCarriers, getCurrencyList,
    getShippingModes,
    getShippingTypes,
} from "../../../../../_BLL/reducers/surcharge&rates/surchargeThunks";
import {AppStateType} from "../../../../../_BLL/store";
import {useForm} from "react-hook-form";
import {surchargeActions} from "../../../../../_BLL/reducers/surcharge&rates/surchargeReducer";
import moment from "moment";
import {getCurrentShippingTypeSelector} from "../../../../../_BLL/selectors/rates&surcharge/surchargeSelectors";


type PropsType = {
    setNewSurchargeMode: VoidFunctionType
}

const RegistrationNewForm:React.FC<PropsType> = ({setNewSurchargeMode}) => {
    const [shippingValue, setShippingValue] = useState(0)

    const dispatch = useDispatch()

    let setMode = useCallback((mode: string) => {
        dispatch(surchargeActions.setCurrentShippingType(mode))
    }, [])
    const mode = useSelector(getCurrentShippingTypeSelector)

    const shipping_types = useSelector((state: AppStateType) => state.surcharge.shipping_type)
    const sea_carriers = useSelector((state: AppStateType) => state.surcharge.sea_carriers)
    const air_carriers = useSelector((state: AppStateType) => state.surcharge.air_carriers)
    const ports = useSelector((state: AppStateType) => state.surcharge.ports)
    const currency_list = useSelector((state: AppStateType) => state.surcharge.currency_list)
    let surcharge = useSelector((state: AppStateType) => state.surcharge.surcharge_info)
    let surcharges_list = useSelector((state: AppStateType) => state.surcharge.surcharges_list)

    const {register, control, errors, handleSubmit, getValues, setValue} = useForm({
        reValidateMode: "onBlur"
    })
    const onSubmit = (values: any) => {
        console.log("values.charges",values.charges);
        let charges_array = Object.keys(values.charges).map(o => (o !== null && values.charges[o]))
        let usageFees_array = values.usage_fees ? Object.keys(values.usage_fees).map(u => (u !== null && values.usage_fees[u])) : null

        let data = {carrier: values.carrier,
            direction: values.direction,
            shipping_mode: values.shipping_mode,
            start_date: moment(values.from).format('DD/MM/YYYY'),
            expiration_date: moment(values.to).format('DD/MM/YYYY'),
            charges: charges_array, usage_fees: usageFees_array,
            location: Number(sessionStorage.getItem('port_id'))}

        let data_without_fees = {start_date: moment(values.from).format('DD/MM/YYYY'),
            expiration_date: moment(values.to).format('DD/MM/YYYY'),
            carrier: values.carrier,
            direction: values.direction,
            shipping_mode: values.shipping_mode,
            charges: charges_array,
            location: Number(sessionStorage.getItem('port_id'))}

            usageFees_array !== null ? dispatch(addNewSurcharge(data)) : dispatch(addNewSurcharge(data_without_fees))
            setNewSurchargeMode(false)
    }


    useEffect(() => {
        sessionStorage.setItem('reg', 'true')
        dispatch(getShippingTypes())
        dispatch(getCarriers())
        dispatch(getShippingModes())
        dispatch(getCurrencyList())
    }, [dispatch])

    useEffect(() => {
        if(surcharge) {
            setShippingValue(surcharge.shipping_mode.id)
            setValue('carrier', surcharge.carrier.id)
            setValue('direction', surcharge.direction)
            setValue('shipping_mode', surcharge.shipping_mode.id)

        }
    }, [surcharge, setValue])

    let cancelHandle = () => {
        dispatch(surchargeActions.setSurchargeInfo(null))
        setNewSurchargeMode(false)
    }

    return (
        <Outer onSubmit={handleSubmit(onSubmit)}>
            <HeaderWrapper>
                <FormTitle>New Surcharge</FormTitle>
                <ActionsWrapper>
                    <RegisterButton type='submit'>REGISTER</RegisterButton>
                    <Cancel onClick={cancelHandle}>CANCEL</Cancel>
                </ActionsWrapper>
            </HeaderWrapper>
            <div style={{marginBottom: '20px', width: '150px'}}>
                <OptionsDeliveryButtons searchColumn=''
                                        searchValue=''
                                        directory='import'
                                        mode={mode}
                                        setMode={setMode}
                />
            </div>
            {
                mode === 'sea'
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