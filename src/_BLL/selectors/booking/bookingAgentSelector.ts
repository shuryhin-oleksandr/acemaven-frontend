import {AppStateType} from "../../store";

export const getBookingRequestListSelector = (state:AppStateType) => state.agent_booking.booking_request_list
export const getExactBookingInfo = (state: AppStateType) => state.agent_booking.exact_booking_info