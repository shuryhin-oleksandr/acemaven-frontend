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
};
