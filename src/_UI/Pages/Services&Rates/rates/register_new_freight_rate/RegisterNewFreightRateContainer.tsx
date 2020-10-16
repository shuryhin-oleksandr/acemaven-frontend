import React, {useCallback, useEffect, useState} from 'react'
import {useDispatch, useSelector} from "react-redux";
import {useForm} from "react-hook-form";
import RegisterNewFreightRate from "./RegisterNewFreightRate";
import {VoidFunctionType} from "../../../../../_BLL/types/commonTypes";
import {CurrentShippingType, ShippingTypesEnum} from "../../../../../_BLL/types/rates&surcharges/newSurchargesTypes";
import {surchargeActions} from "../../../../../_BLL/reducers/surcharge&rates/surchargeReducer";
import {
    getCurrentShippingTypeSelector,
    getShippingTypesSelector
} from "../../../../../_BLL/selectors/rates&surcharge/surchargeSelectors";
import {
    getCarriers,
    getCurrencyList,
    getShippingTypes
} from '../../../../../_BLL/thunks/rates&surcharge/surchargeThunks'
import {
    getAirCarriersSelector,
    getSeaCarriersSelector
} from "../../../../../_BLL/selectors/rates&surcharge/surchargeSelectors";
import {getDestinationPorts, getOriginPorts} from "../../../../../_BLL/selectors/rates&surcharge/ratesSelectors";
import {checkRatesDatesThunk, getPorts} from "../../../../../_BLL/thunks/rates&surcharge/rateThunks";
import {PortType} from "../../../../../_BLL/types/rates&surcharges/ratesTypes";
import {rateActions} from "../../../../../_BLL/reducers/surcharge&rates/rateReducer";

type PropsType = {
    setNewRateMode: VoidFunctionType
}

const RegisterNewFreightRateContainer:React.FC<PropsType> = ({setNewRateMode}) => {
    const dispatch = useDispatch()

    const {handleSubmit, register, control, errors, getValues, setValue} = useForm()

    //запрос за опшионсами для селектов
    useEffect(() => {
        dispatch(getShippingTypes());
        dispatch(getCarriers());
        dispatch(getCurrencyList());
    }, [dispatch]);

    //данные из стора
    const currentShippingType = useSelector(getCurrentShippingTypeSelector)
    const air_carriers = useSelector(getAirCarriersSelector)
    const sea_carriers = useSelector(getSeaCarriersSelector)
    const shippingTypes = useSelector(getShippingTypesSelector)
    const origin_ports = useSelector(getOriginPorts)
    const destination_ports = useSelector(getDestinationPorts)

    //Локальный стейт для условной отрисовки таблиц в зависимости от выбранного шиппинг мода
    const [shippingValue, setShippingValue] = useState(0)

    const carrierOptions = (currentShippingType === ShippingTypesEnum.AIR) ? air_carriers : sea_carriers
    const shippingModeOptions = (currentShippingType === ShippingTypesEnum.AIR) ? shippingTypes[0]?.shipping_modes : shippingTypes[1]?.shipping_modes
    const usageFees = shippingModeOptions?.find(m => m.id === shippingValue)?.container_types || []

    //закрывает форму регистрации рейта
    const closeRateRegistration = () => {
        //!!фрэйт рейт на нулл, если используем его как шаблон
        setNewRateMode(false)
        sessionStorage.removeItem('origin_id')
        sessionStorage.removeItem('destination_id')
    }

    //закрывает выборку портов
    let closePortsHandler = (port: PortType, field: string) => {
        setValue(field, port.display_name);
        field === 'origin' && sessionStorage.setItem('origin_id', JSON.stringify(port.id))
        field === 'destination' && sessionStorage.setItem('port_id_rate', JSON.stringify(port.id))
        dispatch(rateActions.setDestinationPortsList([]));
        dispatch(rateActions.setOriginPortsList([]));
    };

    //достаем занятые даты
    let getRatesBookedDates = useCallback((portName: string, portId: number) => {
        sessionStorage.setItem('destination_id', JSON.stringify(portId))
        let carrier = getValues('carrier')
        let shipping_mode = getValues('shipping_mode')
        let origin = Number(sessionStorage.getItem('origin_id'))
        dispatch(checkRatesDatesThunk({carrier: carrier, shipping_mode: shipping_mode, origin: origin, destination: portId}))
        setValue('destination', portName);
        dispatch(rateActions.setDestinationPortsList([]));
    }, [])

    //меняет шиппинг тайп с air на sea
    const setMode = useCallback((mode: CurrentShippingType) => {
        setValue('carrier', '')
        setValue('direction', '')
        setValue('shipping_mode', '')
        dispatch(surchargeActions.setCurrentShippingType(mode))
    }, [])

    //посимвольный поиск портов
    let onOriginChangeHandler = (value: any) => {
        dispatch(getPorts(value.value, "origin"));
    };
    let onDestinationChangeHandler = (value: any) => {
        dispatch(getPorts(value.value, "destination"));
    };

    return (
        <RegisterNewFreightRate handleSubmit={handleSubmit}
                                register={register}
                                control={control}
                                errors={errors}
                                getValues={getValues}
                                setValue={setValue}
                                closeRateRegistration={closeRateRegistration}
                                setMode={setMode}
                                mode={currentShippingType}
                                carrierOptions={carrierOptions}
                                shippingModeOptions={shippingModeOptions}
                                shippingValue={shippingValue}
                                setShippingValue={setShippingValue}
                                origin_ports={origin_ports}
                                destination_ports={destination_ports}
                                onOriginChangeHandler={onOriginChangeHandler}
                                onDestinationChangeHandler={onDestinationChangeHandler}
                                closePortsHandler={closePortsHandler}
                                getBookedRatesDates={getRatesBookedDates}
                                usageFees={usageFees}
        />
    )
}

export default RegisterNewFreightRateContainer

