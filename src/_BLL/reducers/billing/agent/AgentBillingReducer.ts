import {BillingOperationType, ExchangeRateType} from "../../../types/billing/billingTypes";


const initialState = {
    isFetching: false,
    exchange_list: [] as ExchangeRateType[],
    repeated_exchange: null as {rates: Array<{currency: number, rate: string, spread: string}>} | null,
    adding_exchange_success: false,
    billing_operations_list: [] as BillingOperationType[]
}

type InitialStateType = typeof initialState

export const agentBillingReducer = (state = initialState, action: commonAgentBillingActions):InitialStateType => {
    switch (action.type) {
        case "SET_IS_FETCHING":
            return {
                ...state,
                isFetching: action.isFetching
            }
        case "SET_EXCHANGE_LIST":
            return {
                ...state,
                exchange_list: action.exchange_list
            }
        case "SET_NEW_EXCHANGE_TO_LIST":
            return {
                ...state,
                exchange_list: [...state.exchange_list, action.exchange]
            }
        case "SET_REPEATED_EXCHANGE":
            return {
                ...state,
                repeated_exchange: action.exchange
            }
        case "SET_ADDING_EXCHANGE_SUCCESS":
            return {
                ...state,
                adding_exchange_success: action.value
            }
        case "SET_BILLING_OPERATIONS_LIST":
            return {
                ...state,
                billing_operations_list: action.list
            }
        default: return state
    }
}


type AC<T> = T extends { [key: string]: (...args: any[]) => infer U } ? U : never;
export type commonAgentBillingActions = AC<typeof agentBillingActions>;

export const agentBillingActions = {
    setIsFetching: (isFetching: boolean) => ({type: 'SET_IS_FETCHING', isFetching} as const),
    setExchangeList: (exchange_list: Array<ExchangeRateType>) => ({type: 'SET_EXCHANGE_LIST', exchange_list} as const),
    setNewExchangeRateToList: (exchange: ExchangeRateType) => ({type: 'SET_NEW_EXCHANGE_TO_LIST', exchange} as const),
    setRepeatedExchange: (exchange: {rates: Array<{currency: number, rate: string, spread: string}>} | null) => ({type: 'SET_REPEATED_EXCHANGE', exchange} as const),
    setAddingExchangeSuccess: (value: boolean) => ({type: 'SET_ADDING_EXCHANGE_SUCCESS', value} as const),
    setBillingOperationsList: (list: Array<BillingOperationType>) => ({type: 'SET_BILLING_OPERATIONS_LIST', list} as const)
}

