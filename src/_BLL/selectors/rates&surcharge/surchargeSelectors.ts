import {AppStateType} from "../../store";


export const getBookedDates = (state: AppStateType) => {
    let bookedDates = state.surcharge.bookedDates?.map((d: {start_date: string, expiration_date: string})=> (
        {from: new Date(d.start_date),
            to: new Date(d.expiration_date)
        })
    )

    return bookedDates ? [...bookedDates, {before: new Date()}] : [{before: new Date()}]
}

export const getIsFetchingSelector = (state: AppStateType) => state.surcharge.isFetching
export const getSurcharge = (state: AppStateType) => state.surcharge.surcharge_info
export const getCurrentShippingTypeSelector = (state: AppStateType) => state.surcharge.current_shipping_type
export const getShippingTypesSelector = (state: AppStateType) => state.surcharge.shipping_type || []
export const getSeaCarriersSelector = (state: AppStateType) => state.surcharge.sea_carriers
export const getAirCarriersSelector = (state: AppStateType) => state.surcharge.air_carriers
export const getPortsSelector = (state: AppStateType) => state.surcharge.ports
export const getCurrencyListSelector = (state: AppStateType) => state.surcharge.currency_list
export const getShippingModesSelector = (state: AppStateType) => state.surcharge.shipping_modes
export const getEditSurchargeSelector = (state: AppStateType) => state.surcharge.edit_surcharge_success