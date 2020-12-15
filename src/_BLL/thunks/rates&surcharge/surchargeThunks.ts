import {commonSurchargeActions, surchargeActions} from "../../reducers/surcharge&rates/surchargeReducer";
import {Dispatch} from "redux";
import {surchargeAPI} from "../../../_DAL/API/rates&surcharges/surchargeApi";
import {
    CarrierType,
    editHandlingType
} from "../../types/rates&surcharges/surchargesTypes";
import {ThunkAction} from "redux-thunk";
import {AppStateType} from "../../store";

type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, commonSurchargeActions>

export const getCarriers = () => {
    return async (dispatch: Dispatch<commonSurchargeActions>) => {
        try {
            let res = await surchargeAPI.getCarriersList()
            let air = res.data.filter((r:CarrierType) => r.shipping_type === 1)
            dispatch(surchargeActions.setAirCarriersList(air))
            let sea = res.data.filter((r:CarrierType) => r.shipping_type === 2)
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
    return async (dispatch:Dispatch<any>) => {
        try {
            let res = await surchargeAPI.registerNewSurcharge(surcharge_data)
            dispatch(filterByThunk('import', 'sea','', '', ''))
            dispatch(surchargeActions.setSurchargeInfo(res.data))
            dispatch(surchargeActions.setAddingSurchargeSuccess(true))
        } catch (e) {
            console.log(e.response)
            e.response.data.charges && dispatch(surchargeActions.setAddingSurchargeError(e.response.data.charges))
        }
    }
}

export const getWholeSurchargesList = () => {
    return async (dispatch:Dispatch<commonSurchargeActions>) => {
        try {
            let res = await surchargeAPI.getSurchargesList()
            dispatch(surchargeActions.setSurchargesList(res.data))
        } catch (e) {
            console.log(e.response)
        }
    }
}

export const getSurchargeInfo = (id: number) => {
    return async (dispatch:Dispatch<commonSurchargeActions>) => {
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
    return async (dispatch:Dispatch<commonSurchargeActions>) => {
        try {
            let res = await surchargeAPI.getExactSurcharge(id)
            dispatch(surchargeActions.setSurchargeInfo(res.data))
            console.log(res.data)
        } catch (e) {
            console.log(e.response)
        }
    }
}

export const checkSurchargeDates = (checkSurchargeValues: {location: number,
    carrier: number,
    direction: string,
    shipping_mode: number}): ThunkType => async(dispatch) => {
    try {
        let bookedDates = await surchargeAPI.checkSurchargeDates(checkSurchargeValues);
        dispatch(surchargeActions.setBookedDates(bookedDates))
    } catch (e) {
        console.log(e)
    }
}

//EDIT MODE
const editDates = (id: number | undefined, edit_data : {start_date: string, expiration_date: string}, history: any) => {
    return async (dispatch: Dispatch<commonSurchargeActions>) => {
        try {
            debugger
            let {data} = await surchargeAPI.editSurchargeDates(id, edit_data)
            dispatch(surchargeActions.setEditSurchargeSuccess('success'))
            let res = await surchargeAPI.getExactSurcharge(data.id)
            dispatch(surchargeActions.setSurchargeInfo(res.data))
            history.push(`/services/surcharge/${res.data.id}`)
        } catch (e) {
            console.log(e.response)
        }
    }
}
const editUsageFees = (surcharge_id: number, edit_fees : editHandlingType[], history: any) => {
    return async (dispatch: any) => {
        try {
            let {data} = await surchargeAPI.editSurchargeHandling({surcharge: surcharge_id, usage_fees: edit_fees})
            dispatch(surchargeActions.setEditSurchargeSuccess('success'))
            await dispatch(getSurchargeInfo(data.surcharge))
            let id = data.surcharge
            history.push(`/services/surcharge/${id}`)
        } catch (e) {
            console.log(e)
        }
    }
}
 const editCharges = (surcharge_id: number, edit_charges : any, history: any) => {
    return async (dispatch: any) => {
        try {
            let {data} = await surchargeAPI.editSurchargeAdditional({surcharge: surcharge_id, charges: edit_charges})
            dispatch(surchargeActions.setEditSurchargeSuccess('success'))
            await dispatch(getSurchargeInfo(data.surcharge))
            let id = data.surcharge
            history.push(`/services/surcharge/${id}`)
        } catch (e) {
            console.log(e)
        }
    }
}

export const editUsageAndCharges = (surcharge_id: number, dates: any, edit_fees: any, edit_charges : any, history: any) => {
    return async (dispatch: any) => {
        try {
            if(dates && dates.length > 0) {
                await dispatch(editDates(surcharge_id, dates[0], history))
            }
            if(edit_fees && edit_fees.length > 0) {
                await dispatch(editUsageFees(surcharge_id, edit_fees, history))
            }
            if(edit_charges && edit_charges.length > 0) {
                await dispatch(editCharges(surcharge_id, edit_charges, history))
            }
        } catch (e) {
            console.log(e)
        }
    }
}

