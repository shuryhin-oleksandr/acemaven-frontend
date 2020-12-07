import { Dispatch } from "redux";
import { bookingApi } from "../../../_DAL/API/bookingApi";
import {agentBookingActions, commonAgentBookingActions} from "../../reducers/booking/agentBookingReducer";


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

export const rejectAgentBookingByIdThunk = (id: number, message: string, history: any) => {
  return async (dispatch: Dispatch<commonAgentBookingActions>) => {
    try {
      let res = await bookingApi.rejectBookingByAgent(id, {message: message});
      console.log(res.data);
      dispatch(agentBookingActions.setRejectBookingRequest(id));
      history.push('/requests/booking')
    } catch (e) {
      console.log(e)
    }
  };
};

export const acceptBookingByAgentThunk = (user_id: number, booking_id: number, history: any) => {
  return async (dispatch: Dispatch<commonAgentBookingActions>) => {
    try {
      await bookingApi.acceptBookingByAgent(user_id, booking_id);
      dispatch(agentBookingActions.setAcceptSuccess('success'))
      history.push('/requests/booking')
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

export const assignAgentThunk = (user_id: number, booking_id: number, history: any) => {
  return async (dispatch: Dispatch<commonAgentBookingActions>) => {
    try {
      await bookingApi.assignAnotherAgentToBooking(user_id, booking_id)
      dispatch(agentBookingActions.setAssignSuccess('success'))
      history.push('/requests/booking')
    }
    catch (e) {
      console.log(e)
    }
  }
}
