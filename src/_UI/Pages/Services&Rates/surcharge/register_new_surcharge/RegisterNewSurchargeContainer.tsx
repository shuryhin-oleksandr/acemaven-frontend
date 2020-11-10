import React, { useCallback, useEffect, useState} from 'react'
import { useForm } from 'react-hook-form';
import RegisterNewSurcharge from './RegisterNewSurcharge';
import {
    CurrentShippingType,
    ShippingTypesEnum
} from "../../../../../_BLL/types/rates&surcharges/newSurchargesTypes";
import {useDispatch, useSelector} from "react-redux";
import {surchargeActions} from "../../../../../_BLL/reducers/surcharge&rates/surchargeReducer";
import {
    getAddingSurchargeErrorSelector,
    getAirCarriersSelector, getCurrentShippingTypeSelector, getLocationId, getPortsSelector,
    getSeaCarriersSelector, getShippingTypesSelector, getSurcharge
} from "../../../../../_BLL/selectors/rates&surcharge/surchargeSelectors";
import {
    checkSurchargeDates,
    getCarriers, getCurrencyList,
    getPorts, getShippingTypes
} from "../../../../../_BLL/thunks/rates&surcharge/surchargeThunks";
import {AppStateType} from "../../../../../_BLL/store";


type PropsType = {
    setNewSurchargeMode: (value: boolean) => void
}

const RegisterNewSurchargeContainer: React.FC<PropsType> = ({setNewSurchargeMode}) => {

    const dispatch = useDispatch()

    const {handleSubmit, register, control, errors, getValues, setValue, watch,} = useForm({
        reValidateMode: 'onBlur', mode: 'onSubmit'
    })

    //check if some fields are not empty for 'location'
    const watchFields = watch(["carrier", "direction", "shipping_mode"]);
    const watchResultArr = Object.values(watchFields).filter((val) => !!val);


    //check if some fields are not empty for 'dates'
    const watchResultArrForDates = Object.values(watchFields).filter((val) => !!val);

    //Данные из стейта
    const shippingMode = useSelector(getCurrentShippingTypeSelector)
    const seaCarriers = useSelector(getSeaCarriersSelector)
    const airCarriers = useSelector(getAirCarriersSelector)
    const shippingTypes = useSelector(getShippingTypesSelector)
    const ports = useSelector(getPortsSelector)
    const surcharge = useSelector(getSurcharge)
    const adding_success = useSelector((state:AppStateType) => state.surcharge.adding_success)
    const adding_error = useSelector(getAddingSurchargeErrorSelector)
    const location_id = useSelector(getLocationId)

    //Локальный стейт для условной отрисовки таблиц в зависимости от выбранного шиппинг мода
    const [shippingValue, setShippingValue] = useState(0)

    const carrierOptions = (shippingMode === ShippingTypesEnum.AIR) ? airCarriers : seaCarriers
    const shippingModeOptions = (shippingMode === ShippingTypesEnum.AIR) ? shippingTypes[0]?.shipping_modes : shippingTypes[1]?.shipping_modes
    const usageFees = shippingModeOptions?.find(m => m.id === shippingValue)?.container_types || []
    const additional = shippingModeOptions?.find(m => m.id === shippingValue)?.additional_surcharges || []
    const additionalTableName = (shippingMode === ShippingTypesEnum.AIR) ? 'USAGE FEES' : 'HANDLING'
    const additionalType = (shippingMode === ShippingTypesEnum.AIR) ? 'ULD TYPES' : 'CONTAINER TYPE'



    //Закрывает форму регистрации серчарджа
    const closeRegisterForm = useCallback(() => {
        dispatch(surchargeActions.setSurchargeInfo(null))
        setNewSurchargeMode(false)
        dispatch(surchargeActions.setLocationId(0))
        dispatch(surchargeActions.setAddingSurchargeSuccess(false))
        dispatch(surchargeActions.setAddingSurchargeError([]))
    }, [dispatch])

    //Посимвольно поиск по портам
    const locationChangeHandler = useCallback(({ value }) => {
        dispatch(getPorts(value))
    }, [dispatch])

    //Запрос на наличие забронированных дат по первым 4 полям
    const getDisabledSurchargesDates = useCallback((portName: string, portId: number) => {
        setValue('location', portName)
        //sessionStorage.setItem('port_id', JSON.stringify(portId))
        dispatch(surchargeActions.setLocationId(portId))
        dispatch(surchargeActions.setPortsList([]))
        dispatch(checkSurchargeDates({
            location: portId,
            carrier: getValues("carrier"),
            direction: getValues("direction"),
            shipping_mode: getValues("shipping_mode")
        }))
    }, [dispatch])

    const setMode = useCallback((mode: CurrentShippingType) => {
        setValue('carrier', '')
        setValue('direction', '')
        setValue('shipping_mode', '')
        dispatch(surchargeActions.setCurrentShippingType(mode))
        sessionStorage.removeItem('port_id')
    }, [dispatch])

    let unmountComponent = () => {
        dispatch(surchargeActions.setSurchargeInfo(null))
        dispatch(surchargeActions.setLocationId(0))
    }

    useEffect(() => {
        dispatch(getShippingTypes(''))
        dispatch(getCarriers())
        dispatch(getCurrencyList())

        return () => {
            unmountComponent()
        }
    }, [dispatch])

    useEffect(() => {
        if(surcharge) {
            setShippingValue(surcharge.shipping_mode.id)
            setValue('carrier', surcharge.carrier.id)
            setValue('direction', surcharge.direction)
            setValue('shipping_mode', surcharge.shipping_mode.id)
        }
    }, [surcharge, setValue])


    return (
        <RegisterNewSurcharge
            register={register}
            control={control}
            errors={errors}
            getValues={getValues}
            setValue={setValue}
            mode={shippingMode}
            setMode={setMode}
            closeRegisterForm={closeRegisterForm}
            carrierOptions={carrierOptions}
            shippingModeOptions={shippingModeOptions}
            shippingValue={shippingValue}
            setShippingValue={setShippingValue}
            ports={ports}
            locationChangeHandler={locationChangeHandler}
            getDisabledSurchargesDates={getDisabledSurchargesDates}
            usageFees={usageFees}
            additionalTableName={additionalTableName}
            additionalType={additionalType}
            additional={additional}
            handleSubmit={handleSubmit}
            adding_success={adding_success}
            watchResultArr={watchResultArr}
            watchResultArrForDates={watchResultArrForDates}
            location_id={location_id}
            adding_error={adding_error}
        />
    )
};

export default RegisterNewSurchargeContainer