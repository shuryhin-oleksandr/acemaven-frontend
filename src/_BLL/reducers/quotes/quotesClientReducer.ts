import {QuoteType} from "../../types/quotes/quotesTypes";



const initialState = {
    isFetching: false,
    quotes_list: [] as QuoteType[],
    post_quote_success: false,
    future_archive_quote_id: 0
}

type InitialStateType = typeof initialState

export const quotesClientReducer = (state = initialState, action: commonQuotesClientActions):InitialStateType => {
    switch (action.type) {
        case "SET_IS_FETCHING":
            return {
                ...state,
                isFetching: action.isFetching
            }
        case "SET_CLIENT_QUOTES_LIST":
            return {
                ...state,
                quotes_list: action.quotes
            }
        case "SET_POST_CLIENT_QUOTE_SUCCESS":
            return {
                ...state,
                post_quote_success: action.success
            }
        case "SET_ACTIVATE_QUOTE":
            return {
                ...state,
                quotes_list: state.quotes_list.map(q => {
                    if(q.id === action.id) {
                        q.is_active = action.is_active
                        return q
                    } else {
                        return q
                    }
                })
            }
        case "DELETE_QUOTE_FROM_LIST":
            return {
                ...state,
                quotes_list: state.quotes_list.filter(q => q.id !== action.id)
            }
        case "SET_FUTURE_ARCHIVE_QUOTE_ID":
            return {
                ...state,
                future_archive_quote_id: action.id
            }
        default: return state
    }
}

type AC<T> = T extends { [key: string]: (...args: any[]) => infer U } ? U : never;
export type commonQuotesClientActions = AC<typeof quotesClientActions>;

export const quotesClientActions = {
    setIsFetching: (isFetching: boolean) => ({type: 'SET_IS_FETCHING', isFetching} as const),
    setClientQuotesList: (quotes: QuoteType[]) => ({type: 'SET_CLIENT_QUOTES_LIST', quotes} as const),
    setPostClientQuoteSuccess: (success: boolean) => ({type: 'SET_POST_CLIENT_QUOTE_SUCCESS', success} as const),
    setActivateQuote: (id: number, is_active: boolean) => ({type: 'SET_ACTIVATE_QUOTE', id, is_active} as const),
    deleteQuoteFromList: (id: number) => ({type: "DELETE_QUOTE_FROM_LIST", id} as const),
    setFutureArchiveQuoteId: (id: number) => ({type: 'SET_FUTURE_ARCHIVE_QUOTE_ID', id} as const)
};