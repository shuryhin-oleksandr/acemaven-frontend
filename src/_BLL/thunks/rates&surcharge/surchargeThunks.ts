import {commonSurchargeActions, surchargeActions} from "../../reducers/surcharge&rates/surchargeReducer";
import {Dispatch} from "redux";
import {surchargeAPI} from "../../../_DAL/API/rates&surcharges/surchargeApi";
import {
    CarrierType,
} from "../../types/rates&surcharges/surchargesTypes";
import {ThunkAction} from "redux-thunk";
import {AppStateType} from "../../store";

type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, commonSurchargeActions>

export const getCarriers = () => {
    return async (dispatch: Dispatch<commonSurchargeActions>) => {
        try {
            let res = await surchargeAPI.getCarriersList()
            let air = res.data.filter((r: CarrierType) => r.shipping_type === 1)
            dispatch(surchargeActions.setAirCarriersList(air))
            let sea = res.data.filter((r: CarrierType) => r.shipping_type === 2)
            dispatch(surchargeActions.setSeaCarriersList(sea))
        } catch (e) {
            console.log(e.response)
        }
    }
}

export const getPorts = (local: any, q: string) => {
    return async (dispatch: Dispatch<commonSurchargeActions>) => {
        try {
            let res = await surchargeAPI.getPortsList(local, q)
            dispatch(surchargeActions.setPortsList(res.data))
        } catch (e) {
            console.log(e)
        }
    }
}


export const getShippingTypes = (is_freight_rate?: boolean | string) => {
    return async (dispatch: Dispatch<commonSurchargeActions>) => {
        try {
            let res = await surchargeAPI.getShippingTypesList(is_freight_rate)
            dispatch(surchargeActions.setShippingType(res.data))
        } catch (e) {
            console.log(e.response)
        }
    }
}

export const getCurrencyList = () => {
    return async (dispatch: Dispatch<commonSurchargeActions>) => {
        try {
            let res = await surchargeAPI.getCurrencyList()
            dispatch(surchargeActions.setCurrencyList(res.data))
        } catch (e) {
            console.log(e.response)
        }
    }
}

export const addNewSurcharge = (surcharge_data: any) => {
    return async (dispatch: Dispatch<any>) => {
        try {
            let res = await surchargeAPI.registerNewSurcharge(surcharge_data)
            dispatch(filterByThunk('import', 'sea', '', '', ''))
            dispatch(surchargeActions.setSurchargeInfo(res.data))
            dispatch(surchargeActions.setAddingSurchargeSuccess(true))
        } catch (e) {
            console.log(e.response)
            e.response.data.charges && dispatch(surchargeActions.setAddingSurchargeError(e.response.data.charges))
        }
    }
}

export const getWholeSurchargesList = () => {
    return async (dispatch: Dispatch<commonSurchargeActions>) => {
        try {
            let res = await surchargeAPI.getSurchargesList()
            dispatch(surchargeActions.setSurchargesList(res.data))
        } catch (e) {
            console.log(e.response)
        }
    }
}

export const getSurchargeInfo = (id: number) => {
    return async (dispatch: Dispatch<commonSurchargeActions>) => {
        try {
            dispatch(surchargeActions.setIsFetching(true))
            let res = await surchargeAPI.getExactSurcharge(id)
            dispatch(surchargeActions.setSurchargeInfo(res.data))
            dispatch(surchargeActions.setIsFetching(false))
        } catch (e) {
            console.log(e.response)
            dispatch(surchargeActions.setIsFetching(false))
        }
    }
}

export const filterByThunk = (direction: string, type: string, field_name: string, search_column: string, search_value: string) => {
    return async (dispatch: Dispatch<commonSurchargeActions>) => {
        try {
            let res = await surchargeAPI.filterByDirectionDelivery(direction, type, field_name, search_column, search_value)
            dispatch(surchargeActions.setSurchargesList(res.data))
        } catch (e) {
            console.log(e.response)
        }
    }
}

export const GetSurchargeForTooltip = (id: number) => {
    return async (dispatch: Dispatch<commonSurchargeActions>) => {
        try {
            let res = await surchargeAPI.getExactSurcharge(id)
            dispatch(surchargeActions.setSurchargeInfo(res.data))
            console.log(res.data)
        } catch (e) {
            console.log(e.response)
        }
    }
}

export const checkSurchargeDates = (checkSurchargeValues: {
    location: number,
    carrier: number,
    direction: string,
    shipping_mode: number
}): ThunkType => async (dispatch) => {
    try {
        let bookedDates = await surchargeAPI.checkSurchargeDates(checkSurchargeValues);
        dispatch(surchargeActions.setBookedDates(bookedDates))
    } catch (e) {
        console.log(e)
    }
}

//EDIT MODE
export const editUsageAndCharges = (surcharge_id: number, dates: any, edit_fees: any, edit_charges: any, history: any) => {
    return async (dispatch: any) => {
        try {

            if ((dates && dates.length > 0) && (edit_fees && edit_fees.length > 0) && (edit_charges && edit_charges.length > 0)) {
                let req_body = {
                    start_date: dates[0].start_date,
                    expiration_date: dates[0].expiration_date,
                    usage_fees: edit_fees,
                    charges: edit_charges
                }
                let {data} = await surchargeAPI.editSurchargeInfo(surcharge_id, req_body)
                dispatch(surchargeActions.setSurchargeInfo(data))
                history.push(`/services/surcharge/${data.id}`)
            } else if (!dates && (edit_fees && edit_fees.length > 0) && (edit_charges && edit_charges.length > 0)) {
                let req_body = {
                    usage_fees: edit_fees,
                    charges: edit_charges
                }
                let {data} = await surchargeAPI.editSurchargeInfo(surcharge_id, req_body)
                dispatch(surchargeActions.setSurchargeInfo(data))
                history.push(`/services/surcharge/${data.id}`)
            } else if (!dates && (edit_fees && edit_fees.length > 0) && (edit_charges && edit_charges.length === 0)) {
                let req_body = {
                    usage_fees: edit_fees
                }
                let {data} = await surchargeAPI.editSurchargeInfo(surcharge_id, req_body)
                dispatch(surchargeActions.setSurchargeInfo(data))
                history.push(`/services/surcharge/${data.id}`)
            }
            if (!dates && (edit_fees && edit_fees.length === 0) && (edit_charges && edit_charges.length > 0)) {
                let req_body = {
                    charges: edit_charges
                }
                let {data} = await surchargeAPI.editSurchargeInfo(surcharge_id, req_body)
                dispatch(surchargeActions.setSurchargeInfo(data))
                history.push(`/services/surcharge/${data.id}`)
            }
        } catch (e) {
            console.log(e)
        }
    }
}

