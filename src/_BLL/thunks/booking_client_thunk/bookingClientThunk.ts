import { Dispatch } from "redux";
import {
  commonBookingActions,
  bookingActions,
} from "../../reducers/bookingReducer";
import { bookingApi } from "../../../_DAL/API/bookingApi";

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
