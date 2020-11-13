import {
  CargoDetailsValue,
  CargoGroup,
  ChoiceType,
} from "../types/bookingTypes";

const initialState = {
  cargo_details: null as CargoDetailsValue[] | null,
  booking_step: "shipping-form",
  current_booking_freight_rate_id: null as number | null,
  booking_dates: null as { date_from: string; date_to: string } | null,
  current_booking_cargo_groups: null as CargoGroup[] | null,
  release_type_choices: null as ChoiceType[] | null,
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
    case "SET_FREIGHT_RATE_ID":
      return {
        ...state,
        current_booking_freight_rate_id: action.id,
      };
    case "SET_BOOKING_DATES":
      return {
        ...state,
        booking_dates: action.dates,
      };
    case "SET_CURRENT_CARGO_GROUPS":
      return {
        ...state,
        current_booking_cargo_groups: action.cargo_groups,
      };
    case "SET_RELEASE_TYPE_CHOICES":
      return {
        ...state,
        release_type_choices: action.choices,
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
  set_current_booking_freight_rate_id: (id: number) =>
    ({
      type: "SET_FREIGHT_RATE_ID",
      id,
    } as const),
  set_booking_dates: (dates: { date_from: string; date_to: string }) =>
    ({
      type: "SET_BOOKING_DATES",
      dates,
    } as const),
  set_current_booking_cargo_groups: (cargo_groups: CargoGroup[]) =>
    ({
      type: "SET_CURRENT_CARGO_GROUPS",
      cargo_groups,
    } as const),
  set_release_type_choices: (choices: ChoiceType[]) =>
    ({ type: "SET_RELEASE_TYPE_CHOICES", choices } as const),
};
