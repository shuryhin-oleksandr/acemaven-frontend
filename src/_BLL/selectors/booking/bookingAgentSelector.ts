import {AppStateType} from "../../store";

export const getIsFetching = (state: AppStateType) => state.agent_booking.isFetching
export const getBookingRequestListSelector = (state:AppStateType) => state.agent_booking.booking_request_list
export const getExactBookingInfo = (state: AppStateType) => state.agent_booking.exact_booking_info
export const getMyAgents = (state: AppStateType) => state.agent_booking.my_agents_list
export const getAssignSuccess = (state: AppStateType) => state.agent_booking.assign_success