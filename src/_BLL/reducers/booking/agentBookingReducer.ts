import { BookingInfoType } from "../../types/bookingTypes";

const initialState = {
  isFetching: false,
  booking_request_list: [] as BookingInfoType[] ,
  exact_booking_info: null as BookingInfoType | null,
  my_agents_list: [] as any,
  assign_success: ''
};

type InitialStateType = typeof initialState;

export const agentBookingReducer = (
  state = initialState,
  action: commonAgentBookingActions
): InitialStateType => {
  switch (action.type) {
    case "SET_IS_FETCHING":
      return {
        ...state,
        isFetching: action.isFetching
      }
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
    case "SET_MY_AGENTS":
      return {
        ...state,
        my_agents_list: action.agents
      }
    case "SET_ASSIGN_SUCCESS":
      return {
        ...state,
        assign_success: action.assign_success
      }
    default:
      return state;
  }
};

type AC<T> = T extends { [key: string]: (...args: any[]) => infer U }
  ? U
  : never;
export type commonAgentBookingActions = AC<typeof agentBookingActions>;

export const agentBookingActions = {
  setIsFetching: (isFetching: boolean) => ({type: 'SET_IS_FETCHING', isFetching} as const),
  setBookingRequestsList: (list: BookingInfoType[]) =>
    ({ type: "SET_BOOKING_REQUESTS_LIST", list } as const),
  setExactBookingInfo: (booking_info: BookingInfoType | null) =>
    ({ type: "SET_EXACT_BOOKING_INFO", booking_info } as const),
  setRejectBookingRequest: (booking_id: number) =>
    ({ type: "SET_REJECT_BOOKING_ID", booking_id } as const),
  setMyAgents: (agents: any) => ({type: 'SET_MY_AGENTS', agents} as const),
  setAssignSuccess: (assign_success: string) => ({type: 'SET_ASSIGN_SUCCESS', assign_success} as const)
};
