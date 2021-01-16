import { Dispatch } from "redux";
import {
  commonBookingActions,
  bookingActions,
} from "../../reducers/booking/bookingReducer";
import { bookingApi } from "../../../_DAL/API/bookingApi";
import { PostBookingData } from "../../types/bookingTypes";
import { AppStateType } from "../../store";
import { quotesClientAPI } from "../../../_DAL/API/quotes/client/quotesClientAPI";
import { getClientExactOperationThunk } from "../operations/client/OperationsClientThunk";

export const getReleaseTypeChoices = () => {
  return async (dispatch: Dispatch<commonBookingActions>) => {
    try {
      let res = await bookingApi.getReleaseTypeChoices();
      dispatch(bookingActions.set_release_type_choices(res.data.release_type));
    } catch (e) {
      console.log(e.response);
    }
  };
};

export const postBooking = (data: PostBookingData, quotes_mode?: boolean) => {
  return async (dispatch: Dispatch<any>, getState: () => AppStateType) => {
    try {
      if (!quotes_mode) {
        let res = await bookingApi.postBooking(data);
        dispatch(bookingActions.setRecalculatedBooking(res.data));
      } else {
        let quote_archive_id = getState().client_quotes.future_archive_quote_id;
        let res = await bookingApi.postBooking(data);
        dispatch(bookingActions.setRecalculatedBooking(res.data));
        await quotesClientAPI.archiveQuote(quote_archive_id);
      }
    } catch (e) {
      console.log(e.response);
    }
  };
};

export const changeBooking = (id: number, patchObj: any, setIsOpen: any) => {
  return async (dispatch: any) => {
    try {
     await bookingApi.changeBooking(id, patchObj);
      setIsOpen(false);
      await dispatch(getClientExactOperationThunk(id));
    } catch (e) {
      console.log("error", e.response.data.error);
      dispatch(bookingActions.setChangeBookingError("Entered dates mismatch with surcharges or freight rate dates."));
    }
  };
};
