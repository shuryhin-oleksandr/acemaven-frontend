import {Dispatch} from "redux";
import {operationsAgentAPI} from "../../../../_DAL/API/operations/OperationsAgentAPI";
import {
    agentOperationsActions,
    commonAgentOperationsActions,
} from "../../../reducers/operations/agent/agentOperationsReducer";
import {BookingShipmentDetailsType} from "../../../types/bookingTypes";
import {bookingApi} from "../../../../_DAL/API/bookingApi";
import {AppStateType} from "../../../store";
import {TrackingBackendType} from "../../../types/operations/operationsTypes";

export const getAgentsOperationsThunk = (
    type: string,
    is_mine: boolean | string,
    field_name: string,
    search_column: string,
    search_value: string,
    status?: string
) => {
    return async (dispatch: Dispatch<commonAgentOperationsActions>) => {
        try {
            dispatch(agentOperationsActions.setIsFetching(true));
            let res = await operationsAgentAPI.getAgentsOperations(
                type,
                is_mine,
                field_name,
                search_column,
                search_value,
                status
            );
            dispatch(agentOperationsActions.setAgentOperationsList(res.data));
            dispatch(agentOperationsActions.setIsFetching(false));
        } catch (e) {
            console.log(e);
            dispatch(agentOperationsActions.setIsFetching(false));
        }
    };
};

export const getAgentExactOperationThunk = (id: number) => {
    return async (dispatch: Dispatch<any>) => {
        try {
            dispatch(agentOperationsActions.setIsFetching(true));
            let res = await operationsAgentAPI.getAgentExactOperation(id);
            if (!res.data.automatic_tracking) {

                let departed_set = res.data.tracking.some((t: TrackingBackendType) => t.status === 'Vessel Departed' || t.status === 'Aircraft Departed')
                departed_set
                    ? dispatch(getManualTrackingStatusOptions(res.data.freight_rate.shipping_mode.id, res.data.tracking_initial.direction, true))
                    : dispatch(getManualTrackingStatusOptions(res.data.freight_rate.shipping_mode.id, res.data.tracking_initial.direction, ''))
            }
            dispatch(agentOperationsActions.setAgentExactOperationInfo(res.data));
            dispatch(agentOperationsActions.setIsFetching(false));
        } catch (e) {
            console.log(e);
            dispatch(agentOperationsActions.setIsFetching(false));
        }
    };
};

export const confirmBookingRequestThunk = (
    data: BookingShipmentDetailsType,
    history: any
) => {
    return async () => {
        try {
            await operationsAgentAPI.confirmBookingRequest(data);
            history.push("/operations_active");
        } catch (e) {
            console.log(e);
        }
    };
};

export const editOperationByAgentThunk = (data: any, id: number) => {
    return async (dispatch: any, getState: () => AppStateType) => {
        try {
            dispatch(agentOperationsActions.setIsFetching(true));
            await operationsAgentAPI.editOperationByAgent(data, id);
            let current_operation_id = getState().agent_operations.agent_operation_info?.id
            dispatch(getAgentExactOperationThunk(Number(current_operation_id)))
            dispatch(agentOperationsActions.setEditSuccess("success"));
            dispatch(agentOperationsActions.setIsFetching(false));
        } catch (e) {
            console.log(e);
            dispatch(agentOperationsActions.setIsFetching(false));
        }
    };
};


export const editOperationPaymentDueByAgentThunk = (data: any, id: number) => {
    return async (dispatch: Dispatch<commonAgentOperationsActions>) => {
        try {
            dispatch(agentOperationsActions.setIsFetching(true));
            let res = await operationsAgentAPI.editOperationPaymentDueByAgent(
                data,
                id
            );
            dispatch(
                agentOperationsActions.setEditedPaymentDueBy(res.data.payment_due_by)
            );
            dispatch(agentOperationsActions.setEditSuccess("success"));
            dispatch(agentOperationsActions.setIsFetching(false));
        } catch (e) {
            console.log(e);
            dispatch(agentOperationsActions.setIsFetching(false));
        }
    };
};

export const getCancellationChoicesThunk = () => {
    return async (dispatch: Dispatch<commonAgentOperationsActions>) => {
        try {
            let res = await operationsAgentAPI.getCancellationChoices();
            dispatch(
                agentOperationsActions.setCancellationChoices(
                    res.data.cancellation_reason
                )
            );
        } catch (e) {
            console.log(e);
        }
    };
};

export const cancelOperationByAgentThunk = (
    id: number,
    data: { reason: string; comment: string },
    history: any
) => {
    return async (dispatch: Dispatch<commonAgentOperationsActions>) => {
        try {
            dispatch(agentOperationsActions.setIsFetching(true));
            await operationsAgentAPI.cancelOperationByAgent(id, data);
            dispatch(agentOperationsActions.setCancellationConfirmation("cancelled"));
            history.push("/operations_cancelled");
            dispatch(agentOperationsActions.setIsFetching(false));
        } catch (e) {
            console.log(e);
            dispatch(agentOperationsActions.setIsFetching(false));
        }
    };
};

export const completeOperationByAgentThunk = (
    id: number,
    history: any
) => {
    return async (dispatch: Dispatch<commonAgentOperationsActions>) => {
        try {
            dispatch(agentOperationsActions.setIsFetching(true));
            await operationsAgentAPI.completeOperationByAgent(id);
            history.push("/operations_completed");
            dispatch(agentOperationsActions.setIsFetching(false));
        } catch (e) {
            console.log(e);
            dispatch(agentOperationsActions.setIsFetching(false));
        }
    };
};

export const confirmChangeRequestThunk = (
    id: number,
    new_shipment_data: any,
    shipment_id: number
) => {
    return async (dispatch: Dispatch<any>) => {
        try {
            await operationsAgentAPI.editOperationByAgent(
                new_shipment_data,
                shipment_id
            );
            //await operationsAgentAPI.editOperationPaymentDueByAgent({payment_due_by: payment_due_by}, id)
            let res = await operationsAgentAPI.confirmChangeRequest(id);
            dispatch(agentOperationsActions.setChangeRequestConfirmation("reaction"));
            let response = await operationsAgentAPI.getAgentExactOperation(
                res.data.id
            );
            dispatch(
                agentOperationsActions.setAgentExactOperationInfo(response.data)
            );
        } catch (e) {
            console.log(e);
        }
    };
};

export const cancelChangeRequestThunk = (id: number) => {
    return async (dispatch: Dispatch<commonAgentOperationsActions>) => {
        try {
            await operationsAgentAPI.cancelChangeRequest(id);
            dispatch(agentOperationsActions.setChangeRequestConfirmation("reaction"));
        } catch (e) {
            console.log(e);
        }
    };
};

export const takeOverThunk = (user_id: number, booking_id: number) => {
    return async (dispatch: Dispatch<any>) => {
        try {
            await bookingApi.assignAnotherAgentToBooking(user_id, booking_id);
            dispatch(agentOperationsActions.setTakedOver("taked"));
            let res = await operationsAgentAPI.getAgentExactOperation(booking_id);
            dispatch(agentOperationsActions.setAgentExactOperationInfo(res.data));
        } catch (e) {
            console.log(e);
        }
    };
};

export const getManualTrackingStatusOptions = (
    type: number,
    direction: string, departed: boolean | string
) => {
    return async (dispatch: Dispatch<commonAgentOperationsActions>) => {
        try {
            let res = await operationsAgentAPI.getTrackingStatusOptions(
                type,
                direction, departed
            );
            dispatch(agentOperationsActions.setTrackingStatusOptions(res.data));
        } catch (e) {
            console.log(e);
        }
    };
};

export const updateShipmentInfo = (data: any, reset: any) => {
    return async (dispatch: Dispatch<commonAgentOperationsActions>) => {
        try {
            let response = await operationsAgentAPI.updateShipmentInfo(data);
            dispatch(agentOperationsActions.updateTrackingInfoList(response.data));
            reset();
        } catch (e) {
            console.log(e);
        }
    };
};

export const deleteTrackingStatus = (id: number) => {
    return async (dispatch: any, getState: () => AppStateType) => {
        try {
            await operationsAgentAPI.deleteTrackingStatus(id);
            dispatch(agentOperationsActions.deleteTrackingStatus(id));
            let current_operation_id = getState().agent_operations.agent_operation_info?.id
            dispatch(getAgentExactOperationThunk(Number(current_operation_id)))
        } catch (e) {
            console.log(e);
        }
    };
};
