import instance from "./axiosConfig";
import { FreightRateType } from "../../_BLL/types/rates&surcharges/ratesTypes";

export const rateAPI = {
  getPortsList(q: string, type: string) {
    return instance.get(
      `/handling/port/?is_local=&search=${q}&shipping_type=${type}`
    );
  },
  checkRatesDates(checkRatesValues: {
    carrier: number;
    shipping_mode: number;
    origin: number;
    destination: number;
  }) {
    return instance.post("/booking/freight-rate/check-date/", checkRatesValues);
  },
  registerNewSurcharge(freight_rate_data: any) {
    return instance.post("/booking/freight-rate/", freight_rate_data);
  },
  getSurchargeToRate(rate_data: FreightRateType) {
    return instance.post("/booking/freight-rate/check-surcharge/", rate_data);
  },
  getFilteredRateList(
    direction: string,
    type: string,
    field_name: string,
    search_column: string,
    search_value: string
  ) {
    return instance.get(
      `/booking/freight-rate/?direction=${direction}&shipping_type=${type}&ordering=${field_name}&${search_column}=${search_value}`
    );
  },
  getExactRate(id: number) {
    return instance.get(`/booking/freight-rate/${id}/`);
  },
};
