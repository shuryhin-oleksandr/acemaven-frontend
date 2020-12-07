import { CargoGroupQuoteType } from "../../../types/quotes/quotesTypes";
import { ChoiceType } from "../../../types/bookingTypes";

const initialState = {
  operationCargoGroups: [] as CargoGroupQuoteType[],
  packaging_types: [] as ChoiceType[],
  container_types_air: [] as ChoiceType[],
};

type InitialStateType = typeof initialState;

export const clientOperationsReducer = (
  state = initialState,
  action: commonClientOperationsActions
): InitialStateType => {
  switch (action.type) {
    case "SET_OPERATION_CARGO_GROUPS":
      return {
        ...state,
        operationCargoGroups: action.groups,
      };

    case "SET_CONTAINER_CHOICES":
      return {
        ...state,
        container_types_air: action.choices,
      };

    case "SET_PACKAGING_CHOICES":
      return {
        ...state,
        packaging_types: action.choices,
      };
    case "ADD_OPERATION_CARGO_GROUPS":
      return {
        ...state,
        operationCargoGroups: [...state.operationCargoGroups, action.group],
      };

    default:
      return state;
  }
};

type AC<T> = T extends { [key: string]: (...args: any[]) => infer U }
  ? U
  : never;
export type commonClientOperationsActions = AC<typeof clientOperationsActions>;

export const clientOperationsActions = {
  setOperationCargoGroups: (groups: CargoGroupQuoteType[]) =>
    ({ type: "SET_OPERATION_CARGO_GROUPS", groups } as const),
  setContainerTypeAir: (choices: ChoiceType[]) =>
    ({
      type: "SET_CONTAINER_CHOICES",
      choices,
    } as const),
  setPackagingType: (choices: ChoiceType[]) =>
    ({
      type: "SET_PACKAGING_CHOICES",
      choices,
    } as const),
  addNewCargoGroup: (group: CargoGroupQuoteType) =>
    ({ type: "ADD_OPERATION_CARGO_GROUPS", group } as const),
};
