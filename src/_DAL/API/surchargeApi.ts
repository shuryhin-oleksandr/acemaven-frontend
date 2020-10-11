import instance from "./axiosConfig";
import {
    CheckSurchargeDatesType,
    SurchargeCheckDateResponseType,
    SurchargeObjectType
} from "../../_BLL/types/rates&surcharges/surchargesTypes";

export const surchargeAPI = {
    getCarriersList () {
        return instance.get('/handling/carrier/')
    },
    getPortsList (q: string) {
        return instance.get(`/handling/port/?is_local=true&search=${q}`)
    },
    getShippingModesList () {
        return instance.get('/handling/shipping-mode/')
    },
    getShippingTypesList () {
        return instance.get('/handling/shipping-type/')
    },
    getCurrencyList () {
        return instance.get('/handling/currency/')
    },

    getSurchargesList () {
        return instance.get('/booking/surcharge/')
    },
    filterByDirectionDelivery (direction: string, type: string, field_name: string, search_column: string, search_value: string) {
        return instance.get(`/booking/surcharge/?direction=${direction}&shipping_type=${type}&ordering=${field_name}&${search_column}=${search_value}`)
    },
    getExactSurcharge (id: number) {
        return instance.get(`/booking/surcharge/${id}`)
    },

    checkSurchargeDates (checkSurchargeValues: CheckSurchargeDatesType) {
        return instance.post<SurchargeCheckDateResponseType>('/booking/surcharge/surcharge/check-date/', checkSurchargeValues).then(res => res.data)
    },

    registerNewSurcharge (surcharge_data: SurchargeObjectType) {
    return instance.post('/booking/surcharge/', surcharge_data)
    }

}