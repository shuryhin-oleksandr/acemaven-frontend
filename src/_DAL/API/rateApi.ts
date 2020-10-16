import instance from "./axiosConfig";
import {FreightRateType, RateType} from "../../_BLL/types/rates&surcharges/ratesTypes";

export const rateAPI = {
  getPortsList (q: string) {
    return instance.get(`/handling/port/?is_local=true&search=${q}`)
  },
  checkRatesDates (checkRatesValues: {carrier: number, shipping_mode: number, origin: number, destination: number}) {
    return instance.post('/booking/freight-rate/check-date/', checkRatesValues)
  },
  registerNewSurcharge (freight_rate_data:  any) {
    return instance.post('/booking/freight-rate/', freight_rate_data)
  },
  getSurchargeToRate (rate_data: FreightRateType) {
    return instance.post('/booking/freight-rate/check-surcharge/', rate_data)
  }
};
