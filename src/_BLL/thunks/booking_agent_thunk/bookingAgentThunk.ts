import { Dispatch } from "redux";
import { bookingApi } from "../../../_DAL/API/bookingApi";
import { agentBookingActions } from "../../reducers/booking/agentBookingReducer";

export const getBookingRequestListThunk = (
  type: string,
  field_name: string,
  search_column: string,
  search_value: string
) => {
  return async (dispatch: Dispatch) => {
    try {
      let res = await bookingApi.getAgentsBookingRequestList(
        type,
        field_name,
        search_column,
        search_value
      );
      console.log(res.data);

      dispatch(agentBookingActions.setBookingRequestsList(res.data));
    } catch (e) {
      console.log(e);
    }
  };
};

export const getBookingInfoByIdThunk = (id: number) => {
  return async (dispatch: Dispatch) => {
    try {
      let res = await bookingApi.getAgentBookingInfoById(id);
      console.log(res.data);
      dispatch(agentBookingActions.setExactBookingInfo(res.data));
    } catch (e) {}
  };
};

export const rejectAgentBookingByIdThunk = (id: number) => {
  return async (dispatch: Dispatch) => {
    try {
      let res = await bookingApi.deleteBookingByAgent(id);
      console.log(res.data);
      dispatch(agentBookingActions.setRejectBookingRequest(id));
    } catch (e) {}
  };
};

export const acceptBookingByAgentThunk = (data: any) => {
  return async (dispatch: Dispatch) => {
    try {
      let res = await bookingApi.acceptBookingByAgent(data);
      console.log(res.data);
    } catch (e) {}
  };
};

export const getMyAgentsThunk = () => {
  return async (dispatch: Dispatch) => {
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
  return async (dispatch: Dispatch) => {
    try {
      await bookingApi.assignAnotherAgentToBooking(user_id, booking_id)
      dispatch(agentBookingActions.setAssignSuccess('success'))
    }
    catch (e) {
      console.log(e)
    }
  }
}
