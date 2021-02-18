import { Dispatch } from "redux";
import { supportApi } from "../../../_DAL/API/supportApi/supportApi";
import {
  commonSupportActions,
  supportActions,
} from "../../reducers/support_reducer/supportReducer";

export const getTicketsListThunk = () => {
  return async (dispatch: Dispatch<commonSupportActions>) => {
    try {
      dispatch(supportActions.setIsFetching(true));
      let res = await supportApi.getTicketsList();
      dispatch(supportActions.setTicketsList(res.data));
    } catch (e) {
      console.log(e);
    } finally {
      dispatch(supportActions.setIsFetching(false));
    }
  };
};

export const getCategoryChoicesThunk = () => {
  return async (dispatch: Dispatch<commonSupportActions>) => {
    try {
      let res = await supportApi.getCategoryChoices();
      dispatch(supportActions.setCategoryChoices(res.data.ticket_category));
    } catch (e) {
      console.log(e);
    }
  };
};
