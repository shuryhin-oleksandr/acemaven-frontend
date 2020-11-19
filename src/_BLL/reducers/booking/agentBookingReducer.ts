import { BookingInfoType, PostBookingData } from "../../types/bookingTypes";

const initialState = {
  booking_request_list: [] as BookingInfoType[] /*BookingInfoType[]*/,
  exact_booking_info: null as BookingInfoType | null,
};

type InitialStateType = typeof initialState;

export const agentBookingReducer = (
  state = initialState,
  action: commonAgentBookingActions
): InitialStateType => {
  switch (action.type) {
    case "SET_BOOKING_REQUESTS_LIST":
      return {
        ...state,
        booking_request_list: action.list,
      };
    case "SET_EXACT_BOOKING_INFO":
      return {
        ...state,
        exact_booking_info: action.booking_info,
      };
    case "SET_REJECT_BOOKING_ID":
      return {
        ...state,
        booking_request_list: state.booking_request_list.filter(
          (b) => b.id !== action.booking_id
        ),
      };
    default:
      return state;
  }
};

type AC<T> = T extends { [key: string]: (...args: any[]) => infer U }
  ? U
  : never;
export type commonAgentBookingActions = AC<typeof agentBookingActions>;

export const agentBookingActions = {
  setBookingRequestsList: (list: BookingInfoType[]) =>
    ({ type: "SET_BOOKING_REQUESTS_LIST", list } as const),
  setExactBookingInfo: (booking_info: BookingInfoType | null) =>
    ({ type: "SET_EXACT_BOOKING_INFO", booking_info } as const),
  setRejectBookingRequest: (booking_id: number) =>
    ({ type: "SET_REJECT_BOOKING_ID", booking_id } as const),
};
