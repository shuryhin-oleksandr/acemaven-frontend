import {Dispatch} from "redux";
import {operationsAgentAPI} from "../../../../_DAL/API/operations/OperationsAgentAPI";
import {
    agentOperationsActions,
    commonAgentOperationsActions
} from "../../../reducers/operations/agent/agentOperationsReducer";
import {BookingShipmentDetailsType} from "../../../types/bookingTypes";

export const getAgentsOperationsThunk = (value: boolean | string) => {
    return async (dispatch: Dispatch<commonAgentOperationsActions>) => {
        try {
            let res = await operationsAgentAPI.getAgentsOperations(value)
            dispatch(agentOperationsActions.setAgentOperationsList(res.data))
        } catch (e) {
            console.log(e)
        }
    }
}

export const getAgentExactOperationThunk = (id: number) => {
    return async (dispatch: Dispatch<commonAgentOperationsActions>) => {
        try {
            let res = await operationsAgentAPI.getAgentExactOperation(id)
            dispatch(agentOperationsActions.setAgentExactOperationInfo(res.data))
        } catch (e) {
            console.log(e)
        }
    }
}

export const confirmBookingRequestThunk = (data: BookingShipmentDetailsType) => {
    return async (dispatch: Dispatch<any>) => {
        try {
            let res = await operationsAgentAPI.confirmBookingRequest(data)

        } catch (e) {
            console.log(e)
        }
    }
}