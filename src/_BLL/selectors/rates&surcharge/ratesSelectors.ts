import {AppStateType} from "../../store";
import moment from "moment";
import {strict} from "assert";

export const getFreightRatesList = ((state: AppStateType) => state.rate.freight_rates_list)
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
export const getRateIsActive = ((state: AppStateType) => state.rate.rate_info?.is_active)
export const getCurrentShippingTypeSelector = (state: AppStateType) => state.rate.current_shipping_type
export const getEditSuccess = ((state: AppStateType) => state.rate.edit_success)

export const getRateBookedDatesSelector = (state: AppStateType)
    :Array<{container_type: number | null, disabledDates: Array<{from: Date, to: Date}>}> | undefined  => {

   /* // @ts-ignore
    let bookedDates = state.rate.booked_dates && state.rate.booked_dates[0] && state.rate.booked_dates[0].map(b =>
        ({container_type: b.container_type, disabledDates: [{from: new Date(b.start_date), to: new Date(b.expiration_date)}]})
    )
    console.log(bookedDates)
    return bookedDates ? [...bookedDates] : null
*/
    if(state.rate.booked_dates && state.rate.booked_dates[0] && state.rate.booked_dates[0][0].container_type == null) {
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
            {container_type: container.container_type, disabledDates: [{from: new Date(container.start_date), to: new Date(container.expiration_date)}]}
            // @ts-ignore
        ))).reduce((current, next) => {
            return current.map(container => {
                let sameNextContainer = next.find(n => n.container_type === container.container_type)
                return {container_type: container.container_type, disabledDates: [...container.disabledDates, ...sameNextContainer?.disabledDates]}
            })
        })
    } else {
        return state.rate.booked_dates? state.rate.booked_dates[0].map(container => (
            {...container, disabledDates: [{from: new Date(container.start_date), to: new Date(container.expiration_date)}]}
        )) : undefined
    }
}
