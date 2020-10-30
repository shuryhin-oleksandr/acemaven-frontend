import { CargoDetailsValue } from "../types/bookingTypes";

const initialState = {
  cargo_details: null as CargoDetailsValue[] | null,
  booking_step: "shipping-form",
};

type InitialStateType = typeof initialState;

export const bookingReducer = (
  state = initialState,
  action: commonBookingActions
) => {
  switch (action.type) {
    case "SET_CARGO_DETAILS":
      return {
        ...state,
        cargo_details: action.details,
      };
    case "CHANGE_BOOKING_STEP":
      return {
        ...state,
        booking_step: action.step,
      };
    default:
      return state;
  }
};

type AC<T> = T extends { [key: string]: (...args: any[]) => infer U }
  ? U
  : never;
export type commonBookingActions = AC<typeof bookingActions>;

export const bookingActions = {
  setCargoDetails: (details: CargoDetailsValue[]) =>
    ({ type: "SET_CARGO_DETAILS", details } as const),
  changeBookingStep: (step: string) =>
    ({ type: "CHANGE_BOOKING_STEP", step } as const),
};
