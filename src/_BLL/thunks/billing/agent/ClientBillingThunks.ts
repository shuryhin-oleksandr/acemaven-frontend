import { clientBillingApi } from "../../../../_DAL/API/billing/agent/clientBillingAPI";
import { Dispatch } from "redux";
import {
  clientBillingActions,
  commonClientBillingActions,
} from "../../../reducers/billing/client/ClientBillingReducer";
import moment from "moment";
import { commonClientOperationsActions } from "../../../reducers/operations/client/clientOperationsReducer";
import { operationsClientAPI } from "../../../../_DAL/API/operations/operationsClientAPI";

export const getClientBillingOperationsThunk = (
  type: string,
  status: string,
  date_from: string = "",
  date_to: string = ""
) => {
  return async (dispatch: Dispatch<commonClientBillingActions>) => {
    try {
      dispatch(clientBillingActions.setIsFetching(true));
      let res = await clientBillingApi.getClientBillingOperations(
        type,
        status,
        date_from,
        date_to
      );
      dispatch(clientBillingActions.setClientBillingList(res.data));
      dispatch(clientBillingActions.setIsFetching(false));
    } catch (e) {
      console.log(e);
      dispatch(clientBillingActions.setIsFetching(false));
    }
  };
};

export const cancelClientPendingBooking = (
  id: number,
  setIsCancelByClient: any
) => {
  return async (dispatch: Dispatch<commonClientBillingActions>) => {
    try {
      let res = await operationsClientAPI.cancelOperation(id);
      dispatch(clientBillingActions.removePendingBooking(id));
      setIsCancelByClient(false);
    } catch (e) {
      console.log(e);
    }
  };
};
