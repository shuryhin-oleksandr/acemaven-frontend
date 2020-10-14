import instance from "./axiosConfig";

export const rateAPI = {
  getShippingTypesList() {
    return instance.get("/handling/shipping-type/");
  },
  getCarriersList () {
    return instance.get('/handling/carrier/')
  },
  getPortsList (q: string) {
    return instance.get(`/handling/port/?is_local=true&search=${q}`)
  },
  getCurrencyList () {
    return instance.get('/handling/currency/')
  },
  checkRatesDates (checkRatesValues: {carrier: number, shipping_mode: number, origin: number, destination: number}) {
    return instance.post('/booking/freight-rate/check-date/', checkRatesValues)
  }
};
