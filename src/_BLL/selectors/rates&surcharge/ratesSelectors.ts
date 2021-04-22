import {AppStateType} from "../../store";


export const getRatesIsFetching = (state: AppStateType) => state.rate.isFetching
export const getFreightRatesList = ((state: AppStateType) => state.rate.freight_rates_list)
export const getOriginPorts = ((state: AppStateType) => state.rate.origin_ports)
export const getDestinationPorts = ((state: AppStateType) => state.rate.destination_ports)
export const getExistingSurcharge = ((state: AppStateType) => state.rate.existing_surcharge)
export const getEmptyExistingSurcharge = ((state: AppStateType) => state.rate.empty_existing_surcharge)
export const getIsLocalPort = ((state: AppStateType) => state.rate.origin_port_value)
export const getDestinationPortValue = ((state: AppStateType) => state.rate.destination_port_value)
export const getRateStartDate = ((state: AppStateType) => state.rate.rate_start_date)
export const getRateDataForSurcharge = ((state: AppStateType) => state.rate.rate_data_for_surcharge)
export const getRegistrationSuccess = ((state: AppStateType) => state.rate.registration_success)
export const getCheckedRateInfo = ((state: AppStateType) => state.rate.rate_info)
export const getRateIsActive = ((state: AppStateType) => state.rate.rate_info?.is_active)
export const getCurrentShippingTypeSelector = (state: AppStateType) => state.rate.current_shipping_type
export const getEditSuccess = ((state: AppStateType) => state.rate.edit_success)
export const getAddingError = (state: AppStateType) => state.rate.adding_popup_error
export const getAddingRateError = (state: AppStateType) => state.rate.adding_rate_error
export const getRateTransitError = (state: AppStateType) => state.rate.rate_transit_error
export const getErrorMessageForNewRate = (state: AppStateType) => state.rate.error_message_for_new_rate

export const getRateBookedDatesSelector = (state: AppStateType)
    :Array<{container_type: number | null, disabledDates: Array<{from: Date, to: Date}>}> | undefined  => {

    if(state.rate.booked_dates && state.rate.booked_dates[0] && state.rate.booked_dates[0][0]?.container_type == null) {
        // @ts-ignore
        const flatRates = state.rate.booked_dates.flat().map(c => (
            {type: null, disabledDates: {from: new Date(c.start_date), to: new Date(c.expiration_date)}}))
        // @ts-ignore
        const reservedDates = [];
        flatRates.forEach((element : any) => {
            reservedDates.push(element.disabledDates)
        })
        // @ts-ignore
        return [{type: null, disabledDates: [...reservedDates]}]
    }

    if(state.rate.booked_dates && state.rate.booked_dates.length > 1 ) {
        return state.rate.booked_dates.map(rate => rate.map(container => (
            {container_type: container?.container_type, disabledDates: [{from: new Date(container.start_date), to: new Date(container.expiration_date)}]}
            // @ts-ignore
        ))).reduce((current, next) => {
            return current.map(container => {
                let sameNextContainer = next.find(n => n.container_type === container.container_type)
                return {container_type: container.container_type, disabledDates: [...container.disabledDates, ...sameNextContainer?.disabledDates]}
            })
        })
    } else {
        return state.rate.booked_dates? state.rate.booked_dates[0] && state.rate.booked_dates[0].map(container => (
            {...container, disabledDates: [{from: new Date(container.start_date), to: new Date(container.expiration_date)}]}
        )) : undefined
    }
}
