import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import RegisterNewFreightRate from "./RegisterNewFreightRate";
import { VoidFunctionType } from "../../../../../_BLL/types/commonTypes";
import {
  CurrentShippingType,
  ShippingTypesEnum,
} from "../../../../../_BLL/types/rates&surcharges/newSurchargesTypes";
import { surchargeActions } from "../../../../../_BLL/reducers/surcharge&rates/surchargeReducer";
import {
  getCurrentShippingTypeSelector,
  getShippingTypesSelector, getSurcharge,
} from "../../../../../_BLL/selectors/rates&surcharge/surchargeSelectors";
import {
  addNewSurcharge,
  getCarriers,
  getCurrencyList,
  getShippingTypes,
} from "../../../../../_BLL/thunks/rates&surcharge/surchargeThunks";
import {
  getAirCarriersSelector,
  getSeaCarriersSelector,
} from "../../../../../_BLL/selectors/rates&surcharge/surchargeSelectors";
import {
  getDestinationPorts, getDestinationPortValue, getEmptyExistingSurcharge, getExistingSurcharge, getIsLocalPort,
  getOriginPorts, getRateDataForSurcharge, getRateStartDate,
} from "../../../../../_BLL/selectors/rates&surcharge/ratesSelectors";
import {
  checkRatesDatesThunk,
  getPorts,
} from "../../../../../_BLL/thunks/rates&surcharge/rateThunks";
import { PortType } from "../../../../../_BLL/types/rates&surcharges/ratesTypes";
import { rateActions } from "../../../../../_BLL/reducers/surcharge&rates/rateReducer";
import RegisterSurchargePopUp from "../../../../components/PopUps/RegisterSurchargePopUp/RegisterSurchargePopUp";
import styled from "styled-components";
import NoSurchargeCard from "./NoSurchargeCard";

type PropsType = {
  setNewRateMode: VoidFunctionType;
};

const RegisterNewFreightRateContainer: React.FC<PropsType> = ({
  setNewRateMode,
}) => {
  const dispatch = useDispatch();
  //попап для нового сюрчарджа
  const [newSurchargePopUpVisible, setNewSurchargePopUpVisible] = useState(false);
//useForm
  const {handleSubmit, register, control, errors, getValues, setValue,} = useForm();

  //запрос за опшионсами для селектов
  useEffect(() => {
    dispatch(getShippingTypes());
    dispatch(getCarriers());
    dispatch(getCurrencyList());
  }, [dispatch]);

  //данные из стора
  const currentShippingType = useSelector(getCurrentShippingTypeSelector);
  const air_carriers = useSelector(getAirCarriersSelector);
  const sea_carriers = useSelector(getSeaCarriersSelector);
  const shippingTypes = useSelector(getShippingTypesSelector);
  const origin_ports = useSelector(getOriginPorts);
  const destination_ports = useSelector(getDestinationPorts);
  const existing_surcharge = useSelector(getExistingSurcharge);
  const empty_surcharge = useSelector(getEmptyExistingSurcharge)
  const is_local_port = useSelector(getIsLocalPort);
  const destination_port_value = useSelector(getDestinationPortValue);
  const rate_start_date = useSelector(getRateStartDate)
  let surcharge = useSelector(getSurcharge)
  let rate_data_for_surcharge = useSelector(getRateDataForSurcharge)

  //Локальный стейт для условной отрисовки таблиц в зависимости от выбранного шиппинг мода
  const [shippingValue, setShippingValue] = useState(0);

  const carrierOptions = currentShippingType === ShippingTypesEnum.AIR ? air_carriers : sea_carriers;
  const shippingModeOptions = currentShippingType === ShippingTypesEnum.AIR ? shippingTypes[0]?.shipping_modes : shippingTypes[1]?.shipping_modes;
  const usageFees = shippingModeOptions?.find((m) => m.id === shippingValue)?.container_types || [];
  const additional = shippingModeOptions?.find(m => m.id === shippingValue)?.additional_surcharges || []

  //закрывает форму регистрации рейта
  const closeRateRegistration = () => {
    //!!фрэйт рейт на нулл, если используем его как шаблон
    setNewRateMode(false);
    sessionStorage.removeItem("origin_id");
    sessionStorage.removeItem("destination_id");
  };

  //закрывает выборку портов
  let closePortsHandler = (port: PortType, field: string) => {
    setValue(field, port.display_name);
   dispatch(rateActions.setOriginPortValue(port))
    field === "origin" &&
      sessionStorage.setItem("origin_id", JSON.stringify(port.id));
    field === "destination" &&
      sessionStorage.setItem("port_id_rate", JSON.stringify(port.id));
    dispatch(rateActions.setDestinationPortsList([]));
    dispatch(rateActions.setOriginPortsList([]));
  };

  //достаем занятые даты
  let getRatesBookedDates = useCallback((p: PortType) => {
    sessionStorage.setItem("destination_id", JSON.stringify(p.id));
    dispatch(rateActions.setDestinationPortValue(p))
    let carrier = getValues("carrier");
    let shipping_mode = getValues("shipping_mode");
    let origin = Number(sessionStorage.getItem("origin_id"));
    dispatch(
      checkRatesDatesThunk({
        carrier: carrier,
        shipping_mode: shipping_mode,
        origin: origin,
        destination: p.id,
      })
    );
    setValue("destination", p.display_name);
    dispatch(rateActions.setDestinationPortsList([]));
  }, []);

  //меняет шиппинг тайп с air на sea
  const setMode = useCallback((mode: CurrentShippingType) => {
    setValue("carrier", "");
    setValue("direction", "");
    setValue("shipping_mode", "");
    dispatch(surchargeActions.setCurrentShippingType(mode));
  }, []);

  //посимвольный поиск портов
  let onOriginChangeHandler = (value: any) => {
    dispatch(getPorts(value.value, "origin", currentShippingType));
  };
  let onDestinationChangeHandler = (value: any) => {
    dispatch(getPorts(value.value, "destination", currentShippingType));
  };


  const popUpCarrier = carrierOptions?.find(
    (carrier) => carrier.id === getValues("carrier")
  );
  const popUpShippingMode = shippingModeOptions?.find(
    (mode) => mode.id === getValues("shipping_mode")
  );

  //dispatch rate start_date to state for surcharge popup + register surcharge from popup
  let setRateStartDate = (start_date: string) => {
    dispatch(setRateStartDate(start_date))
  }
  const createNewSurcharge = (surcharge_data: any) => {
    dispatch(addNewSurcharge(surcharge_data))
  }



  return (
    <RatesWrapper>
      {newSurchargePopUpVisible && (
        <RegisterSurchargePopUp
          mode={currentShippingType}
          setIsOpen={setNewSurchargePopUpVisible}
          popUpCarrier={popUpCarrier}
          popUpShippingMode={popUpShippingMode}
          usageFees={usageFees}
          additional={additional}
          shippingValue={shippingValue}
          is_local_port={is_local_port}
          destination_port_value={destination_port_value}
          rate_start_date={rate_start_date}
          createNewSurcharge={createNewSurcharge}
          existing_surcharge={existing_surcharge}
        />
      )}
      <RegisterNewFreightRate
        handleSubmit={handleSubmit}
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
        setNewSurchargePopUpVisible={setNewSurchargePopUpVisible}
        existing_surcharge={existing_surcharge}
        surcharge={surcharge}
        rate_data_for_surcharge={rate_data_for_surcharge}
      />
      {empty_surcharge === 'empty' && <NoSurchargeCard setNewSurchargePopUpVisible={setNewSurchargePopUpVisible} />}
    </RatesWrapper>
  );
};

export default RegisterNewFreightRateContainer;

export const RatesWrapper = styled.div`
  width: 100%;
  min-height: 100vh;
  height: 100%;
`
