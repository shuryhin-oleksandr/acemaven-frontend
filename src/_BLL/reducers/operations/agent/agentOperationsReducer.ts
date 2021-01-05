import {
  OperationType,
  ShipmentDetailsType,
  TrackingBackendType,
} from "../../../types/operations/operationsTypes";
import { ChoiceType } from "../../../types/bookingTypes";

const initialState = {
  isFetching: false,
  agent_operations_list: [] as OperationType[],
  agent_operation_info: null as OperationType | null,
  edit_success: "",
  cancellation_choices: [] as any[],
  cancellation_confirmation: "",
  change_request_confirmation: "",
  taked_over: "",
  status_options: [] as ChoiceType[],
  tracking_data: [] as TrackingBackendType[],
};

type InitialStateType = typeof initialState;

export const agentOperationsReducer = (
  state = initialState,
  action: commonAgentOperationsActions
): InitialStateType => {
  switch (action.type) {
    case "SET_IS_FETCHING":
      return {
        ...state,
        isFetching: action.isFetching,
      };
    case "SET_AGENT_OPERATIONS_LIST":
      return {
        ...state,
        agent_operations_list: action.list,
      };
    case "SET_AGENT_EXACT_OPERATION_INFO":
      return {
        ...state,
        agent_operation_info: action.info,
      };
    case "SET_EDIT_SUCCESS":
      return {
        ...state,
        edit_success: action.success,
      };
    case "SET_EDITED_SHIPMENT_DETAILS":
      return {
        ...state,
        agent_operation_info: state.agent_operation_info?.shipment_details
          ? {
              ...state.agent_operation_info,
              shipment_details: state.agent_operation_info?.shipment_details.map(
                (d) => {
                  if (d.id === action.data.id) {
                    return action.data;
                  } else return d;
                }
              ),
            }
          : null,
      };
    case "SET_EDITED_PAYMENT_DUE_BY":
      return {
        ...state,
        //@ts-ignore
        agent_operation_info: {
          ...state.agent_operation_info,
          payment_due_by: action.value,
        },
      };
    case "SET_CANCELLATION_CHOICES":
      return {
        ...state,
        cancellation_choices: action.choices,
      };
    case "SET_CANCELLATION_CONFIRMATION":
      return {
        ...state,
        cancellation_confirmation: action.value,
      };
    case "SET_CHANGE_REQUEST_CONFIRMATION":
      return {
        ...state,
        change_request_confirmation: action.value,
      };
    case "SET_TAKED_OVER":
      return {
        ...state,
        taked_over: action.value,
      };

    case "SET_TRACKING_STATUS_OPTIONS":
      return {
        ...state,
        status_options: action.options,
      };
    case "SAVE_TRACKING":
      return {
        ...state,
        tracking_data: action.data,
      };
    case "UPDATE_MANUAL_TRACKING_INFO":
      return {
        ...state,
        tracking_data: [action.data, ...state.tracking_data],
      };
    case "DELETE_TRACKING_STATUS":
      return {
        ...state,
        tracking_data: state.tracking_data.filter((i) => i.id !== action.id),
      };
    // case "UPDATE_MANUAL_TRACKING_INFO":
    //   return {
    //     ...state,
    //     agent_operation_info: {
    //       ...state.agent_operation_info,
    //       tracking: [
    //         ...state.agent_operation_info?.tracking,
    //         {
    //           booking: 150,
    //           comment: "on board",
    //
    //           data: null,
    //           date_created: "07:52 30 December 2020",
    //           id: 45,
    //           route: null,
    //           status: "Cargo Shipped on Board",
    //         },
    //       ],
    //     },
    //   };
    default:
      return state;
  }
};

type AC<T> = T extends { [key: string]: (...args: any[]) => infer U }
  ? U
  : never;
export type commonAgentOperationsActions = AC<typeof agentOperationsActions>;

export const agentOperationsActions = {
  setIsFetching: (isFetching: boolean) =>
    ({ type: "SET_IS_FETCHING", isFetching } as const),
  setAgentOperationsList: (list: OperationType[]) =>
    ({ type: "SET_AGENT_OPERATIONS_LIST", list } as const),
  setAgentExactOperationInfo: (info: OperationType | null) =>
    ({ type: "SET_AGENT_EXACT_OPERATION_INFO", info } as const),
  setEditedPaymentDueBy: (value: string) =>
    ({ type: "SET_EDITED_PAYMENT_DUE_BY", value } as const),
  setEditSuccess: (success: string) =>
    ({ type: "SET_EDIT_SUCCESS", success } as const),
  setEditedShipmentDetails: (data: ShipmentDetailsType) =>
    ({ type: "SET_EDITED_SHIPMENT_DETAILS", data } as const),
  setCancellationChoices: (choices: any) =>
    ({ type: "SET_CANCELLATION_CHOICES", choices } as const),
  setCancellationConfirmation: (value: string) =>
    ({ type: "SET_CANCELLATION_CONFIRMATION", value } as const),
  setChangeRequestConfirmation: (value: string) =>
    ({ type: "SET_CHANGE_REQUEST_CONFIRMATION", value } as const),
  setTakedOver: (value: string) => ({ type: "SET_TAKED_OVER", value } as const),
  setTrackingStatusOptions: (options: any) =>
    ({ type: "SET_TRACKING_STATUS_OPTIONS", options } as const),
  saveTrackingToStore: (data: TrackingBackendType[]) =>
    ({
      type: "SAVE_TRACKING",
      data,
    } as const),
  updateTrackingInfoList: (data: any) =>
    ({ type: "UPDATE_MANUAL_TRACKING_INFO", data } as const),
  deleteTrackingStatus: (id: number) =>
    ({ type: "DELETE_TRACKING_STATUS", id } as const),
};
