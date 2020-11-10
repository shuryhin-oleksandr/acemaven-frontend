import { Dispatch } from "redux";
import {
  commonRateActions,
  rateActions,
} from "../../reducers/surcharge&rates/rateReducer";
import { rateAPI } from "../../../_DAL/API/rateApi";
import { ThunkAction } from "redux-thunk";
import { AppStateType } from "../../store";
import {surchargeAPI} from "../../../_DAL/API/surchargeApi";



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
  freight_rate?: number;
}) => {
  return async (dispatch: Dispatch<commonRateActions>) => {
    try {
      let res = await rateAPI.checkRatesDates(check_values);
      dispatch(rateActions.setBookedDates(res.data))
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
      dispatch(rateActions.setRegistrationSuccess("success"));
      dispatch(rateActions.setExistingSurchargeByRate(null));
      dispatch(rateActions.setEmptyExistingSurcharge(''));
    } catch (e) {
      console.log(e.response);
      e.response.data.rates && dispatch(rateActions.setAddingRateError(e.response.data.rates))
      e.response.data.transit_time && dispatch(rateActions.setTransitError(e.response.data.transit_time))
    }
  };
};

export const getSurchargeForExactRateThunk = (rate_data: any) => {
  return async (dispatch: Dispatch<commonRateActions>) => {
    try {
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
export const addNewSurchargeForRate = (surcharge_data: any) => {
  return async (dispatch:Dispatch<any>) => {
    try {
      let res = await surchargeAPI.registerNewSurcharge(surcharge_data)
      dispatch(rateActions.setExistingSurchargeByRate(res.data))
    } catch (e) {
      e.response.data.usage_fees && dispatch(rateActions.setAddingPopupError(e.response.data.usage_fees))
      e.response.data.charges && dispatch(rateActions.setAddingPopupError(e.response.data.charges))
    }
  }
}

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

export const setActiveOrPausedRateThunk = (id: number, value: boolean) => {
  return async (dispatch: Dispatch<commonRateActions>) => {
    try {
      let res = await rateAPI.setActiveOrPausedRate(id, value);
      console.log(res.data)
      dispatch(rateActions.setActiveOrPaused(res.data));
    } catch (e) {
      console.log(e.response);
    }
  };
};

export const ActivateRateThunk = (id: number, value: boolean) => {
  return async (dispatch: Dispatch<commonRateActions>) => {
    try {
      let res = await rateAPI.setActiveOrPausedRate(id, value)
      dispatch(rateActions.setRateIsActive(res.data.is_active))
    } catch (e) {
      console.log(e.response)
    }
  }
}


export const editRates = (id: number | undefined, rates : Array<{container_type: number, currency: number, rate: string, updated_by: string, date_updated: string}>) => {
  return async (dispatch: Dispatch<commonRateActions>) => {
    try {
      let res = await rateAPI.editRates(id, rates)
      res.data && dispatch(rateActions.setEditSuccess('success'))
    } catch (e) {
      console.log(e.response)
    }
  }
}
