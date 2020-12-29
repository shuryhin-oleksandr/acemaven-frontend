import {AppStateType} from "../../store";

export const getAgentOperationsIsFetching = (state: AppStateType) => state.agent_operations.isFetching
export const getClientOperationsIsFetching = (state: AppStateType) => state.client_operations.isFetching
export const getAgentsOperationsListSelector = (state: AppStateType) => state.agent_operations.agent_operations_list
export const getClientOperationsListSelector = (state: AppStateType) => state.client_operations.client_operations_list
export const getExactOperationSelector = (state: AppStateType) => state.agent_operations.agent_operation_info
export const getExactClientOperationSelector = (state: AppStateType) => state.client_operations.client_operation_info
export const getIsFetchingOperationSelector = (state: AppStateType) => state.agent_operations.isFetching
export const getEditOperationSuccessSelector = (state: AppStateType) => state.agent_operations.edit_success
export const getCancellationChoicesSelector = (state: AppStateType) => state.agent_operations.cancellation_choices
export const getCancellationConfirmationSelector = (state: AppStateType) => state.agent_operations.cancellation_confirmation
export const getChangeRequestConfirmationSelector = (state: AppStateType) => state.agent_operations.change_request_confirmation
export const getTakedOverSelector = (state: AppStateType) => state.agent_operations.taked_over
export const getTrackingStatusOptions = (state: AppStateType) => state.agent_operations.status_options
