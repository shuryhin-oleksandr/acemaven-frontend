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

export const getPorts = () => {
    return async (dispatch: Dispatch<commonSurchargeActions>) => {
        try {
            let res = await surchargeAPI.getPortsList()
            console.log(res.data)
            dispatch(surchargeActions.setPortsList(res.data.result))
        } catch (e) {
            console.log(e.response)
        }
    }
}

export const getShippingModes = () => {
    return async (dispatch: Dispatch<commonSurchargeActions>) => {
        try {
            let res = await surchargeAPI.getShippingModesList()
            console.log(res.data)
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
            console.log(res.data)
            dispatch(surchargeActions.setShippingType(res.data))
        } catch (e) {
            console.log(e.response)
        }
    }
}
