import instance from "./axiosConfig";
import { RateType } from "../../_BLL/types/rates&surcharges/ratesTypes";

export const rateAPI = {
  getPortsList(q: string) {
    return instance.get(`/handling/port/?is_local=true&search=${q}`);
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
  getSurchargeToRate(rate_data: RateType) {
    return instance.post("/booking/rate/", rate_data);
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
};
