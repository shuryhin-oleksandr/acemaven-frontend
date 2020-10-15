import instance from "./axiosConfig";
import {
    editChargesType,
    editDatesType, editHandlingType,
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
    checkSurchargeDates (checkSurchargeValues: {location: number,
        carrier: number,
        direction: string,
        shipping_mode: number}) {
        return instance.post<SurchargeCheckDateResponseType>('/booking/surcharge/check-date/', checkSurchargeValues).then(res => res.data)
    },
    registerNewSurcharge (surcharge_data: SurchargeObjectType) {
    return instance.post('/booking/surcharge/', surcharge_data)
    },
    editSurchargeDates (id: number, edit_data: editDatesType) {
        return instance.patch(`/booking/surcharge/${id}/`, edit_data)
    },
    editSurchargeHandling (id: number, edit_handling: editHandlingType) {
        return instance.patch(`/booking/usage-fee/${id}/`, edit_handling)
    },
    editSurchargeAdditional (id: number, edit_additional: editChargesType) {
        return instance.patch(`/booking/usage-fee/${id}/`, edit_additional)
    }
}