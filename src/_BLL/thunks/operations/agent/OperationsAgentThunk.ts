import { Dispatch } from "redux";
import { operationsAgentAPI } from "../../../../_DAL/API/operations/OperationsAgentAPI";
import {
  agentOperationsActions,
  commonAgentOperationsActions,
} from "../../../reducers/operations/agent/agentOperationsReducer";
import { BookingShipmentDetailsType } from "../../../types/bookingTypes";

export const getAgentsOperationsThunk = (
  type: string,
  is_mine: boolean | string,
  field_name: string,
  search_column: string,
  search_value: string
) => {
  return async (dispatch: Dispatch<commonAgentOperationsActions>) => {
    try {
      let res = await operationsAgentAPI.getAgentsOperations(
        type,
        is_mine,
        field_name,
        search_column,
        search_value
      );
      dispatch(agentOperationsActions.setAgentOperationsList(res.data));
    } catch (e) {
      console.log(e);
    }
  };
};

export const getAgentExactOperationThunk = (id: number) => {
  return async (dispatch: Dispatch<commonAgentOperationsActions>) => {
    try {
      dispatch(agentOperationsActions.setIsFetching(true));
      let res = await operationsAgentAPI.getAgentExactOperation(id);
      dispatch(agentOperationsActions.setAgentExactOperationInfo(res.data));
      dispatch(agentOperationsActions.setIsFetching(false));
    } catch (e) {
      console.log(e);
      dispatch(agentOperationsActions.setIsFetching(false));
    }
  };
};

export const confirmBookingRequestThunk = (
  data: BookingShipmentDetailsType,
  history: any
) => {
  return async (dispatch: Dispatch<any>) => {
    try {
      await operationsAgentAPI.confirmBookingRequest(data);
      history.push("/operations");
    } catch (e) {
      console.log(e);
    }
  };
};

export const editOperationByAgentThunk = (data: any, id: number) => {
  return async (dispatch: Dispatch<commonAgentOperationsActions>) => {
    try {
      dispatch(agentOperationsActions.setIsFetching(true))
      let res = await operationsAgentAPI.editOperationByAgent(data, id)
      dispatch(agentOperationsActions.setEditedShipmentDetails(res.data))
      dispatch(agentOperationsActions.setEditSuccess('success'))
      dispatch(agentOperationsActions.setIsFetching(false))
    } catch (e) {
      console.log(e);
      dispatch(agentOperationsActions.setIsFetching(false))
    }
  };
};

export const editOperationPaymentDueByAgentThunk = (data: any, id: number) => {
  return async (dispatch: Dispatch<commonAgentOperationsActions>) => {
    try {
      dispatch(agentOperationsActions.setIsFetching(true))
      let res = await operationsAgentAPI.editOperationPaymentDueByAgent(data, id)
      dispatch(agentOperationsActions.setEditedPaymentDueBy(res.data.payment_due_by))
      dispatch(agentOperationsActions.setEditSuccess('success'))
      dispatch(agentOperationsActions.setIsFetching(false))
    } catch (e) {
      console.log(e);
      dispatch(agentOperationsActions.setIsFetching(false))
    }
  };
};