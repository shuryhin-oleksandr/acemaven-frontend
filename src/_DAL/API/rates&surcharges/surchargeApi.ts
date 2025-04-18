import instance from "../axiosConfig";
import {
    ChargesType,
    ContainerType,
    SurchargeCheckDateResponseType,
    SurchargeObjectType
} from "../../../_BLL/types/rates&surcharges/surchargesTypes";

export const surchargeAPI = {
    getCarriersList() {
        return instance.get('/handling/carrier/')
    },
    getPortsList(local: any, q: string) {
        return instance.get(`/handling/port/?is_local=${local}&search=${q}`)
    },
    getShippingModesList() {
        return instance.get('/handling/shipping-mode/')
    },
    getShippingTypesList(is_freight_rate?: boolean | string) {
        return instance.get(`/handling/shipping-type/?is_freight_rate=${is_freight_rate}`)
    },
    getCurrencyList() {
        return instance.get('/handling/currency/')
    },
    getSurchargesList() {
        return instance.get('/booking/surcharge/')
    },
    filterByDirectionDelivery(direction: string, type: string, field_name: string, search_column: string, search_value: string) {
        return instance.get(`/booking/surcharge/?direction=${direction}&shipping_type=${type}&ordering=${field_name}&${search_column}=${search_value}`)
    },
    getExactSurcharge(id: number) {
        return instance.get(`/booking/surcharge/${id}/`)
    },
    checkSurchargeDates(checkSurchargeValues: {
        location: number,
        carrier: number,
        direction: string,
        shipping_mode: number
    }) {
        return instance.post<SurchargeCheckDateResponseType>('/booking/surcharge/check-date/', checkSurchargeValues).then(res => res.data)
    },
    registerNewSurcharge(surcharge_data: SurchargeObjectType) {
        return instance.post('/booking/surcharge/', surcharge_data)
    },
    editSurchargeInfo(id: number, data: { start_date?: string, expiration_date?: string, usage_fees?: ContainerType[], charges?: ChargesType[] }) {
        return instance.patch(`/booking/surcharge/${id}/`, data)
    }
}