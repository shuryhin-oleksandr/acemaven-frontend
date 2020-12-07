import {Dispatch} from "redux";
import {
    commonRateActions,
    rateActions,
} from "../../reducers/surcharge&rates/rateReducer";
import {rateAPI} from "../../../_DAL/API/rates&surcharges/rateApi";
import {ThunkAction} from "redux-thunk";
import {AppStateType} from "../../store";
import {surchargeAPI} from "../../../_DAL/API/rates&surcharges/surchargeApi";
import {quotesAgentActions} from "../../reducers/quotes/quotesAgentReducer";



type ThunkType = ThunkAction<Promise<void>,
    AppStateType,
    unknown,
    commonRateActions>;

export const getPorts = (local: any, q: string, field: string, type: string) => {
    return async (dispatch: Dispatch<commonRateActions>) => {
        try {
            let res = await rateAPI.getPortsList(local, q, type);
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

export const registerNewFreightRateThunk = (freight_data: any, history: any) => {
    return async (dispatch: Dispatch<any>) => {
        try {
            debugger
            let res = await rateAPI.registerNewSurcharge(freight_data);
            if (freight_data.hasOwnProperty('temporary')) {
                debugger
                dispatch(quotesAgentActions.setExistingRateForQuote(res.data))
                //dispatch(quotesAgentActions.setCheckedIsRateExist('success'))
            } else {
                history.push('/services/rates/')
            }
            //dispatch(rateActions.setNewFreightRate(res.data));
            dispatch(rateActions.setRegistrationSuccess("success"));
            dispatch(rateActions.setExistingSurchargeByRate(null));
            dispatch(rateActions.setEmptyExistingSurcharge(''));
        } catch (e) {
            console.log(e.response);
            e.response?.data.rates && dispatch(rateActions.setAddingRateError(e.response.data.rates))
            e.response?.data.transit_time && dispatch(rateActions.setTransitError(e.response.data.transit_time))
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
    return async (dispatch: Dispatch<any>) => {
        try {
            let res = await surchargeAPI.registerNewSurcharge(surcharge_data)
            if (surcharge_data.hasOwnProperty('temporary')) {
                dispatch(quotesAgentActions.setExistingSurchargeForQuote(res.data))
            } else {
                dispatch(rateActions.setExistingSurchargeByRate(res.data))
            }
        } catch (e) {
            e.response?.data.usage_fees && dispatch(rateActions.setAddingPopupError(e.response.data.usage_fees))
            e.response?.data.charges && dispatch(rateActions.setAddingPopupError(e.response.data.charges))
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
          dispatch(rateActions.setIsFetching(true))
          let res = await rateAPI.getExactRate(id);
          dispatch(rateActions.setRateInfo(res.data));
          dispatch(rateActions.setIsFetching(false))
        } catch (e) {
          console.log(e);
          dispatch(rateActions.setIsFetching(false))
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
            console.log(e);
        }
    };
};

export const ActivateRateThunk = (id: number, value: boolean) => {
    return async (dispatch: Dispatch<commonRateActions>) => {
        try {
            let res = await rateAPI.setActiveOrPausedRate(id, value)
            dispatch(rateActions.setRateIsActive(res.data.is_active))
        } catch (e) {
            console.log(e)
        }
    }
}


export const editRates = (id: number | undefined,
                          rates:{ container_type: number, currency: number, rate: string | null, start_date: string, expiration_date: string }
                          ) => {
    return async (dispatch: Dispatch<commonRateActions>) => {
        try {
          dispatch(rateActions.setIsFetching(true))
          if(rates.rate && rates.start_date && rates.expiration_date) {
            let res = await rateAPI.editRates(id, rates)
            dispatch(rateActions.setEditedRateInfo(res.data))
            res.data && dispatch(rateActions.setEditSuccess('success'))
          }
          dispatch(rateActions.setIsFetching(false))
        } catch (e) {
            console.log(e)
          dispatch(rateActions.setIsFetching(false))
        }
    }
}

/*let reformed_rates = rate?.rates.map(r => ({
  container_type: r.container_type.id,
  currency: r.currency.id,
  rate: r.rate,
  start_date: r.start_date,
  expiration_date: r.expiration_date}))*/
