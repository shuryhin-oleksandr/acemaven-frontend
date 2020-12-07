import {AppStateType} from "../../store";

export const getAgentsOperationsListSelector = (state: AppStateType) => state.agent_operations.agent_operations_list
export const getExactOperationSelector = (state: AppStateType) => state.agent_operations.agent_operation_info
export const getIsFetchingOperationSelector = (state: AppStateType) => state.agent_operations.isFetching
export const getEditOperationSuccessSelector = (state: AppStateType) => state.agent_operations.edit_success
export const getCancellationChoicesSelector = (state: AppStateType) => state.agent_operations.cancellation_choices
export const getCancellationConfirmationSelector = (state: AppStateType) => state.agent_operations.cancellation_confirmation
