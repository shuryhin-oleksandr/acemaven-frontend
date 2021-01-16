import { BillingOperationType } from "../../../types/billing/billingTypes";

const initialState = {
  isFetching: false,
  client_billing_operations_list: [] as BillingOperationType[],
};

type InitialStateType = typeof initialState;

export const clientBillingReducer = (
  state = initialState,
  action: commonClientBillingActions
): InitialStateType => {
  switch (action.type) {
    case "SET_IS_FETCHING":
      return {
        ...state,
        isFetching: action.isFetching,
      };
    case "SET_CLIENT_BILLING_LIST":
      return {
        ...state,
        client_billing_operations_list: action.list,
      };
    case "REMOVE_PENDING_BOOKING":
      return {
        ...state,
        client_billing_operations_list: state.client_billing_operations_list.filter(
          (i) => i.id !== action.id
        ),
      };
    default:
      return state;
  }
};

type AC<T> = T extends { [key: string]: (...args: any[]) => infer U }
  ? U
  : never;
export type commonClientBillingActions = AC<typeof clientBillingActions>;

export const clientBillingActions = {
  setIsFetching: (isFetching: boolean) =>
    ({ type: "SET_IS_FETCHING", isFetching } as const),
  setClientBillingList: (list: BillingOperationType[]) =>
    ({
      type: "SET_CLIENT_BILLING_LIST",
      list,
    } as const),
  removePendingBooking: (id: number) =>
    ({
      type: "REMOVE_PENDING_BOOKING",
      id,
    } as const),
};
