import { Dispatch } from "redux";
import {
  commonRateActions,
  rateActions,
} from "../../reducers/surcharge&rates/rateReducer";
import { rateAPI } from "../../../_DAL/API/rateApi";
import { ThunkAction } from "redux-thunk";
import { AppStateType } from "../../store";

type ThunkType = ThunkAction<
  Promise<void>,
  AppStateType,
  unknown,
  commonRateActions
>;

export const getPorts = (q: string, field: string, type: string) => {
  return async (dispatch: Dispatch<commonRateActions>) => {
    try {
      let res = await rateAPI.getPortsList(q, type);
      field === "origin"
        ? dispatch(rateActions.setOriginPortsList(res.data))
        : dispatch(rateActions.setDestinationPortsList(res.data));
    } catch (e) {
      console.log(e.response);
    }
  };
};

export const checkRatesDatesThunk = (check_values: {
  carrier: number;
  shipping_mode: number;
  origin: number;
  destination: number;
}) => {
  return async (dispatch: Dispatch<commonRateActions>) => {
    try {
      let res = await rateAPI.checkRatesDates(check_values);
    } catch (e) {
      console.log(e.response);
    }
  };
};

export const registerNewFreightRateThunk = (freight_data: any) => {
  return async (dispatch: Dispatch<commonRateActions>) => {
    try {
      let res = await rateAPI.registerNewSurcharge(freight_data);
      dispatch(rateActions.setNewFreightRate(res.data));
      dispatch(rateActions.setRegistrationSuccess('success'))
    } catch (e) {
      console.log(e.response);
    }
  };
};

export const getSurchargeForExactRateThunk = (rate_data: any) => {
  return async (dispatch: Dispatch<commonRateActions>) => {
    try {
      debugger;
      dispatch(rateActions.setRateStartDate(rate_data.start_date));
      let res = await rateAPI.getSurchargeToRate(rate_data);
      if (Object.keys(res.data).length === 0) {
        dispatch(rateActions.setEmptyExistingSurcharge("empty"));
      } else {
        dispatch(rateActions.setExistingSurchargeByRate(res.data));
      }
    } catch (e) {
      console.log(e.response);
    }
  };
};

export const getFilteredRateListThunk = (
  direction: string,
  type: string,
  field_name: string,
  search_column: string,
  search_value: string
) => {
  return async (dispatch: Dispatch<commonRateActions>) => {
    try {
      let res = await rateAPI.getFilteredRateList(
        direction,
        type,
        field_name,
        search_column,
        search_value
      );
      dispatch(rateActions.setFreightRatesList(res.data));
    } catch (e) {
      console.log(e.response);
    }
  };
};

export const getRateInfoThunk = (id: number) => {
  return async (dispatch: Dispatch<commonRateActions>) => {
    try {
      let res = await rateAPI.getExactRate(id);
      dispatch(rateActions.setRateInfo(res.data));
    } catch (e) {
      console.log(e.response);
    }
  };
};
