import { TicketType } from "../../types/support_types/support_types";

const initialState = {
  isFetching: false,
  tickets_list: [] as TicketType[],
};

type InitialStateType = typeof initialState;

export const supportReducer = (
  state = initialState,
  action: any
): InitialStateType => {
  switch (action.type) {
    case "SET_IS_FETCHING":
      return {
        ...state,
        isFetching: action.isFetching,
      };
    case "SET_TICKETS_LIST":
      return {
        ...state,
        tickets_list: action.list,
      };
    default:
      return state;
  }
};

type AC<T> = T extends { [key: string]: (...args: any[]) => infer U }
  ? U
  : never;
export type commonSupportActions = AC<typeof supportActions>;

export const supportActions = {
  setIsFetching: (isFetching: boolean) =>
    ({ type: "SET_IS_FETCHING", isFetching } as const),
  setTicketsList: (list: TicketType[]) =>
    ({ type: "SET_TICKETS_LIST", list } as const),
};
