import { Dispatch } from "redux";
import {
  commonBookingActions,
  bookingActions,
} from "../../reducers/booking/bookingReducer";
import { bookingApi } from "../../../_DAL/API/bookingApi";
import { PostBookingData } from "../../types/bookingTypes";

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

export const postBooking = (data: PostBookingData) => {
  return async (dispatch: Dispatch<commonBookingActions>) => {
    try {
      let res = await bookingApi.postBooking(data);
      dispatch(bookingActions.setRecalculatedBooking(res.data))
    } catch (e) {
      console.log(e.response);
    }
  };
};
