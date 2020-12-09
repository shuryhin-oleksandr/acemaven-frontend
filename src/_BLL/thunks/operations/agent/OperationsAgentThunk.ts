import { Dispatch } from "redux";
import { operationsAgentAPI } from "../../../../_DAL/API/operations/OperationsAgentAPI";
import {
  agentOperationsActions,
  commonAgentOperationsActions,
} from "../../../reducers/operations/agent/agentOperationsReducer";
import { BookingShipmentDetailsType } from "../../../types/bookingTypes";
import {bookingApi} from "../../../../_DAL/API/bookingApi";


export const getAgentsOperationsThunk = (
  type: string,
  is_mine: boolean | string,
  field_name: string,
  search_column: string,
  search_value: string,
  status?: string
) => {
  return async (dispatch: Dispatch<commonAgentOperationsActions>) => {
    try {
      let res = await operationsAgentAPI.getAgentsOperations(
        type,
        is_mine,
        field_name,
        search_column,
        search_value,
        status
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
      history.push("/operations_active");
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

export const getCancellationChoicesThunk = () => {
  return async (dispatch: Dispatch<commonAgentOperationsActions>) => {
    try {
      let res = await operationsAgentAPI.getCancellationChoices()
      dispatch(agentOperationsActions.setCancellationChoices(res.data.cancellation_reason))
    } catch (e) {
      console.log(e)
    }
  }
}

export const cancelOperationByAgentThunk = (id: number, data: {reason: string, comment: string}, history: any) => {
  return async (dispatch: Dispatch<commonAgentOperationsActions>) => {
    try {
      let res = await operationsAgentAPI.cancelOperationByAgent(id, data)
      dispatch(agentOperationsActions.setCancellationConfirmation('cancelled'))
      history.push('/operations_active')
    } catch (e) {
      console.log(e)
    }
  }
}

export const confirmChangeRequestThunk = (id: number, new_shipment_data: any, shipment_id: number) => {
  return async (dispatch: Dispatch<any>) => {
    try {
      debugger
      await operationsAgentAPI.editOperationByAgent(new_shipment_data, shipment_id)
      //await operationsAgentAPI.editOperationPaymentDueByAgent({payment_due_by: payment_due_by}, id)
      let res = await operationsAgentAPI.confirmChangeRequest(id)
      dispatch(agentOperationsActions.setChangeRequestConfirmation('reaction'))
      let response = await operationsAgentAPI.getAgentExactOperation(res.data.id)
      dispatch(agentOperationsActions.setAgentExactOperationInfo(response.data))
      console.log(res.data)
    } catch (e) {
      console.log(e)
    }
  }
}

export const cancelChangeRequestThunk = (id: number) => {
  return async (dispatch: Dispatch<commonAgentOperationsActions>) => {
    try {
      debugger
      let res = await operationsAgentAPI.cancelChangeRequest(id)
      dispatch(agentOperationsActions.setChangeRequestConfirmation('reaction'))
      console.log(res.data)
    } catch (e) {
      console.log(e)
    }
  }
}

export const takeOverThunk = (user_id: number, booking_id: number) => {
  return async (dispatch: Dispatch<any>) => {
    try {
      await bookingApi.assignAnotherAgentToBooking(user_id, booking_id)
      dispatch(agentOperationsActions.setTakedOver('taked'))
      let res = await operationsAgentAPI.getAgentExactOperation(booking_id)
      dispatch(agentOperationsActions.setAgentExactOperationInfo(res.data))
    } catch (e) {
      console.log(e)
    }
  }
}