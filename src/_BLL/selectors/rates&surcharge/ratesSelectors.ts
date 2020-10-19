import {AppStateType} from "../../store";

export const getOriginPorts = ((state: AppStateType) => state.rate.origin_ports)
export const getDestinationPorts = ((state: AppStateType) => state.rate.destination_ports?.filter(p => p.is_local !== state.rate.origin_port_value?.is_local))
export const getExistingSurcharge = ((state: AppStateType) => state.rate.existing_surcharge)
export const getEmptyExistingSurcharge = ((state: AppStateType) => state.rate.empty_existing_surcharge)
export const getIsLocalPort = ((state: AppStateType) => state.rate.origin_port_value)
export const getDestinationPortValue = ((state: AppStateType) => state.rate.destination_port_value)
export const getRateStartDate = ((state: AppStateType) => state.rate.rate_start_date)
export const getRateDataForSurcharge = ((state: AppStateType) => state.rate.rate_data_for_surcharge)
export const getRegistrationSuccess = ((state: AppStateType) => state.rate.registration_success)
export const getCheckedRateInfo = ((state: AppStateType) => state.rate.rate_info)