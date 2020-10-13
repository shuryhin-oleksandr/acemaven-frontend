import { Dispatch } from "redux";
import { commonRateActions, rateActions } from "./rateReducer";
import { rateAPI } from "../../../_DAL/API/rateApi";
import { ThunkAction } from "redux-thunk";
import { AppStateType } from "../../store";
import { CarrierType } from "../../types/rates&surcharges/ratesTypes";

type ThunkType = ThunkAction<
  Promise<void>,
  AppStateType,
  unknown,
  commonRateActions
>;

export const getCarriers = () => {
  return async (dispatch: Dispatch<commonRateActions>) => {
    try {
      let res = await rateAPI.getCarriersList();
      let air = res.data.filter((r: CarrierType) => r.shipping_type === 1);
      dispatch(rateActions.setAirCarriersList(air));
      let sea = res.data.filter((r: CarrierType) => r.shipping_type === 2);
      dispatch(rateActions.setSeaCarriersList(sea));
    } catch (e) {
      console.log(e.response);
    }
  };
};

export const getShippingTypes = () => {
  return async (dispatch: Dispatch<commonRateActions>) => {
    try {
      let res = await rateAPI.getShippingTypesList();
      dispatch(rateActions.setShippingType(res.data));
    } catch (e) {
      console.log(e.response);
    }
  };
};
