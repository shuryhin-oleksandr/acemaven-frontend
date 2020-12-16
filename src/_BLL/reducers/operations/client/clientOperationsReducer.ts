import { CargoGroupQuoteType } from "../../../types/quotes/quotesTypes";
import { ChoiceType, CostBookingType } from "../../../types/bookingTypes";
import { OperationType } from "../../../types/operations/operationsTypes";

const initialState = {
  isFetching: false,
  client_operations_list: [] as OperationType[],
  client_operation_info: null as OperationType | null,
  operationCargoGroups: [] as CargoGroupQuoteType[],
  packaging_types: [] as ChoiceType[],
  container_types_air: [] as ChoiceType[],
  recalculated_charges: null as CostBookingType | null,
};

type InitialStateType = typeof initialState;

export const clientOperationsReducer = (
  state = initialState,
  action: commonClientOperationsActions
): InitialStateType => {
  switch (action.type) {
    case "SET_IS_FETCHING":
      return {
        ...state,
        isFetching: action.isFetching,
      };
    case "SET_CLIENT_OPERATIONS_LIST":
      return {
        ...state,
        client_operations_list: action.list,
      };
    case "SET_CLIENT_EXACT_OPERATION_INFO":
      return {
        ...state,
        client_operation_info: action.info,
      };

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
    case "SET_RECALCULATED_CHARGES":
      return {
        ...state,
        recalculated_charges: action.charges,
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
  setIsFetching: (isFetching: boolean) =>
    ({ type: "SET_IS_FETCHING", isFetching } as const),

  setClientExactOperationInfo: (info: OperationType) =>
    ({ type: "SET_CLIENT_EXACT_OPERATION_INFO", info } as const),

  setClientOperationsList: (list: OperationType[]) =>
    ({ type: "SET_CLIENT_OPERATIONS_LIST", list } as const),

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
  setRecalculatedCharges: (charges: CostBookingType | null) =>
    ({
      type: "SET_RECALCULATED_CHARGES",
      charges,
    } as const),
};
