import {OperationType} from "../../../types/operations/operationsTypes";


const initialState = {
    isFetching: false,
    agent_operations_list: [] as OperationType[],
    agent_operation_info: null as OperationType | null
}

type InitialStateType = typeof initialState

export const agentOperationsReducer = (state = initialState, action: commonAgentOperationsActions):InitialStateType => {
    switch (action.type) {
        case "SET_IS_FETCHING":
            return {
                ...state,
                isFetching: action.isFetching
            }
        case "SET_AGENT_OPERATIONS_LIST":
            return {
                ...state, agent_operations_list: action.list
            };
        case "SET_AGENT_EXACT_OPERATION_INFO":
            return {
                ...state, agent_operation_info: action.info
            }
        default: return state
    }
}

type AC<T> = T extends { [key: string]: (...args: any[]) => infer U } ? U : never;
export type commonAgentOperationsActions = AC<typeof agentOperationsActions>;

export const agentOperationsActions = {
    setIsFetching: (isFetching: boolean) => ({type: 'SET_IS_FETCHING', isFetching} as const),
    setAgentOperationsList: (list: OperationType[]) => ({type: 'SET_AGENT_OPERATIONS_LIST', list} as const),
    setAgentExactOperationInfo: (info: OperationType) => ({type: 'SET_AGENT_EXACT_OPERATION_INFO', info} as const)
}