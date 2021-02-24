import { Dispatch } from "redux";
import { supportApi } from "../../../_DAL/API/supportApi/supportApi";
import {
  commonSupportActions,
  supportActions,
} from "../../reducers/support_reducer/supportReducer";
import { TicketType } from "../../types/support_types/support_types";

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

export const postNewTicketThunk = (data: TicketType, history: any) => {
  return async () => {
    try {
      let res = await supportApi.postNewTicket(data);
      history.push(`/support/${res.data.id}/`);
    } catch (e) {
      console.log(e);
    }
  };
};

export const getExactTicketThunk = (id: number) => {
  return async (dispatch: Dispatch<commonSupportActions>) => {
    try {
      let res = await supportApi.getExactTicket(id);
      dispatch(supportActions.setExactTicket(res.data));
    } catch (e) {
      console.log(e);
    }
  };
};
