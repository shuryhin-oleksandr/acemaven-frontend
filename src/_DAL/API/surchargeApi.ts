import instance from "./axiosConfig";

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
    registerNewSurcharge (surcharge_data: any) {
        return instance.post('/booking/surcharge/', surcharge_data)
    },
    getSurchargesList () {
        return instance.get('/booking/surcharge/')
    }
}