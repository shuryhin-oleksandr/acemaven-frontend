import { Dispatch } from "redux";
import { commonRateActions, rateActions } from "../../reducers/surcharge&rates/rateReducer";
import { rateAPI } from "../../../_DAL/API/rateApi";
import { ThunkAction } from "redux-thunk";
import { AppStateType } from "../../store";
import { RateType} from "../../types/rates&surcharges/ratesTypes";
import {commonSurchargeActions, surchargeActions} from "../../reducers/surcharge&rates/surchargeReducer";
import {surchargeAPI} from "../../../_DAL/API/surchargeApi";

type ThunkType = ThunkAction<
  Promise<void>,
  AppStateType,
  unknown,
  commonRateActions
>;

export const getPorts = (q: string, field: string) => {
  return async (dispatch: Dispatch<commonRateActions>) => {
    try {
      let res = await rateAPI.getPortsList(q);
      field === "origin"
        ? dispatch(rateActions.setOriginPortsList(res.data))
        : dispatch(rateActions.setDestinationPortsList(res.data));
    } catch (e) {
      console.log(e.response);
    }
  };
};

export const checkRatesDatesThunk = (check_values: {carrier: number, shipping_mode: number, origin: number, destination: number}) => {
  return async (dispatch: Dispatch<commonRateActions>) => {
    try {
      let res = await rateAPI.checkRatesDates(check_values)
    } catch (e) {
      console.log(e.response)
    }
  }
}

export const registerNewFreightRateThunk = (freight_data: any) => {
  return async(dispatch: Dispatch<commonRateActions>) => {
    try {
      let res = await rateAPI.registerNewSurcharge(freight_data)
      dispatch(rateActions.setNewFreightRate(res.data))
    } catch (e) {
      console.log(e.response)
    }
  }
}

export const getSurchargeForExactRateThunk = (rate_data: RateType) => {
  return async(dispatch: Dispatch<commonRateActions>) => {
    try {
      let res = await rateAPI.getSurchargeToRate(rate_data)
      console.log(res.data)
    } catch (e) {
        console.log(e.response)
    }
  }
}

export const getFilteredRateListThunk = () => {
  return async (dispatch: Dispatch<commonRateActions>) => {
    try {
      let res = await rateAPI.getFilteredRateList();
      dispatch(rateActions.setFreightRatesList(res.data))
    } catch (e) {
      console.log(e.response)
    }
  }
}