import { Dispatch } from "redux";
import { bookingApi } from "../../../_DAL/API/bookingApi";
import {agentBookingActions, commonAgentBookingActions} from "../../reducers/booking/agentBookingReducer";
import {BookingShipmentDetailsType} from "../../types/bookingTypes";

export const getBookingRequestListThunk = (type: string, field_name: string, search_column: string, search_value: string) => {
  return async (dispatch: Dispatch<commonAgentBookingActions>) => {
    try {
      dispatch(agentBookingActions.setIsFetching(true))
      let res = await bookingApi.getAgentsBookingRequestList(type, field_name, search_column, search_value);
      dispatch(agentBookingActions.setBookingRequestsList(res.data));
      dispatch(agentBookingActions.setIsFetching(false))
    } catch (e) {
      console.log(e);
      dispatch(agentBookingActions.setIsFetching(false))
    }
  };
};

export const getBookingInfoByIdThunk = (id: number) => {
  return async (dispatch: Dispatch<commonAgentBookingActions>) => {
    try {
      dispatch(agentBookingActions.setIsFetching(true))
      let res = await bookingApi.getAgentBookingInfoById(id);
      dispatch(agentBookingActions.setExactBookingInfo(res.data));
      dispatch(agentBookingActions.setIsFetching(false))
    } catch (e) {
      console.log(e)
      dispatch(agentBookingActions.setIsFetching(false))
    }
  };
};

export const rejectAgentBookingByIdThunk = (id: number) => {
  return async (dispatch: Dispatch<commonAgentBookingActions>) => {
    try {
      let res = await bookingApi.deleteBookingByAgent(id);
      console.log(res.data);
      dispatch(agentBookingActions.setRejectBookingRequest(id));
    } catch (e) {
      console.log(e)
    }
  };
};

export const acceptBookingByAgentThunk = (data: BookingShipmentDetailsType) => {
  return async (dispatch: Dispatch<commonAgentBookingActions>) => {
    try {
      debugger
      let res = await bookingApi.acceptBookingByAgent(data);
      console.log(res.data);
    } catch (e) {
      console.log(e)
    }
  };
};

export const getMyAgentsThunk = () => {
  return async (dispatch: Dispatch<commonAgentBookingActions>) => {
    try {
      let res = await bookingApi.getMyAgents()
      dispatch(agentBookingActions.setMyAgents(res.data))
    }
    catch (e) {
      console.log(e)
    }
  }
}

export const assignAgentThunk = (user_id: number, booking_id: number) => {
  return async (dispatch: Dispatch<commonAgentBookingActions>) => {
    try {
      await bookingApi.assignAnotherAgentToBooking(user_id, booking_id)
      dispatch(agentBookingActions.setAssignSuccess('success'))
    }
    catch (e) {
      console.log(e)
    }
  }
}
