import instance from "./axiosConfig";

export const surchargeAPI = {
    getCarriersList () {
        return instance.get('/handling/carrier/')
    },
    getPortsList () {
        return instance.get('/handling/port/')
    },
    getShippingModesList () {
        return instance.get('/handling/shipping-mode/')
    },
    getShippingTypesList () {
        return instance.get('/handling/shipping-type/')
    },
    getCurrencyList () {
        return instance.get('/handling/currency/')
    }
}