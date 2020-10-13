import instance from "./axiosConfig";

export const rateAPI = {
  getShippingTypesList() {
    return instance.get("/handling/shipping-type/");
  },
  getCarriersList () {
    return instance.get('/handling/carrier/')
  },
};
