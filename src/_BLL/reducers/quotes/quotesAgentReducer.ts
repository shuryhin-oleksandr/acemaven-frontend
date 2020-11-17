import {QuoteType} from "../../types/quotes/quotesTypes";


const initialState = {
    agentsQuoteList: [] as QuoteType[],
    exactQuoteInfo: null as QuoteType | null
}

type InitialStateType = typeof initialState

export const quotesAgentReducer = (state = initialState, action: commonQuotesAgentActions):InitialStateType => {
    switch (action.type) {
        case "SET_AGENT_QUOTES_LIST":
            return {
                ...state,
                agentsQuoteList: action.quotes
            }
        case "SET_EXACT_QUOTE_INFO":
            return {
                ...state,
                exactQuoteInfo: action.quote_info
            }
        default: return state
    }
}

type AC<T> = T extends { [key: string]: (...args: any[]) => infer U } ? U : never;
export type commonQuotesAgentActions = AC<typeof quotesAgentActions>;

export const quotesAgentActions = {
    setAgentQuotesList: (quotes: QuoteType[]) => ({type: 'SET_AGENT_QUOTES_LIST', quotes} as const),
    setExactQuoteInfo: (quote_info: QuoteType | null) => ({type: 'SET_EXACT_QUOTE_INFO', quote_info} as const)
};