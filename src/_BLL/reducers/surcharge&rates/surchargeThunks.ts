import {commonSurchargeActions, surchargeActions} from "./surchargeReducer";
import {Dispatch} from "redux";
import {surchargeAPI} from "../../../_DAL/API/surchargeApi";
import {CarrierType} from "../../types/rates&surcharges/surchargesTypes";

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

export const getPorts = (q: string) => {
    return async (dispatch: Dispatch<commonSurchargeActions>) => {
        try {
            let res = await surchargeAPI.getPortsList(q)
            console.log('ports', res.data)
            dispatch(surchargeActions.setPortsList(res.data))
        } catch (e) {
            console.log(e.response)
        }
    }
}

export const getShippingModes = () => {
    return async (dispatch: Dispatch<commonSurchargeActions>) => {
        try {
            let res = await surchargeAPI.getShippingModesList()
            dispatch(surchargeActions.setShippingModeList(res.data.result))
        } catch (e) {
            console.log(e.response)
        }
    }
}

export const getShippingTypes = () => {
    return async (dispatch: Dispatch<commonSurchargeActions>) => {
        try {
            let res = await surchargeAPI.getShippingTypesList()
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
            console.log(res.data)
            dispatch(surchargeActions.setCurrencyList(res.data))
        } catch (e) {
            console.log(e.response)
        }
    }
}

export const addNewSurcharge = (surcharge_data: any) => {
    return async (dispatch:Dispatch<commonSurchargeActions>) => {
        try {
            let res = await surchargeAPI.registerNewSurcharge(surcharge_data)
            dispatch(surchargeActions.setNewSurcharge(res.data))
            console.log('surcharge', res.data)
        } catch (e) {
            console.log(e.response)
        }
    }
}

export const getWholeSurchargesList = () => {
    return async (dispatch:Dispatch<commonSurchargeActions>) => {
        try {
            let res = await surchargeAPI.getSurchargesList()
            dispatch(surchargeActions.setSurchargesList(res.data))
            console.log('surcharge', res.data)
        } catch (e) {
            console.log(e.response)
        }
    }
}