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
            dispatch(agentOperationsActions.setIsFetching(true))
            let res = await operationsAgentAPI.getAgentExactOperation(id)
            dispatch(agentOperationsActions.setAgentExactOperationInfo(res.data))
            dispatch(agentOperationsActions.setIsFetching(false))
        } catch (e) {
            console.log(e)
            dispatch(agentOperationsActions.setIsFetching(false))
        }
    }
}

export const confirmBookingRequestThunk = (data: BookingShipmentDetailsType, history: any) => {
    return async (dispatch: Dispatch<any>) => {
        try {
            await operationsAgentAPI.confirmBookingRequest(data)
            history.push('/operations')
        } catch (e) {
            console.log(e)
        }
    }
}