import {QuoteType, RateQuoteType} from "../../types/quotes/quotesTypes";
import {SurchargeInfoType} from "../../types/rates&surcharges/surchargesTypes";


const initialState = {
    agentsQuoteList: [] as QuoteType[],
    exactQuoteInfo: null as QuoteType | null,
    existing_rate: null as RateQuoteType | null,
    existing_surcharge_for_quote: null as SurchargeInfoType | null,
    checkedRateResult: '',
    saveRateResult: false,
    badSavingMessage: '',
    finded_first: false
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
        case "SET_EXISTING_RATE":
            return {
                ...state,
                existing_rate: action.rate
        }
        case "SET_EXISTING_SURCHARGE_FOR_QUOTE":
            return {
                ...state,
                existing_surcharge_for_quote: action.surcharge
            }
        case "SET_CHECK_IS_RATE_EXIST":
            return {
                ...state,
                checkedRateResult: action.value
            }
        case "DELETE_REJECTED_QUOTE":
            return {
                ...state,
                agentsQuoteList: state.agentsQuoteList.filter(q => q.id !== action.id)
            }
        case "SET_SUBMITTED_QUOTE":
            return {
                ...state,
                agentsQuoteList: state.agentsQuoteList.map(q => {
                    if(q.id === action.id) {
                        return {...q, is_submitted: true}
                    } else {
                        return q
                    }
                })
            }
        case "SET_SAVE_RATE_TO_YOUR_LIST":
            return {
                ...state,
                saveRateResult: action.value
            }
        case "SET_BAD_SAVING":
            return {
                ...state,
                badSavingMessage: action.message
            }
        case "SET_FINDED_FIRST":
            return {
                ...state,
                finded_first: action.value
            }
        default: return state
    }
}

type AC<T> = T extends { [key: string]: (...args: any[]) => infer U } ? U : never;
export type commonQuotesAgentActions = AC<typeof quotesAgentActions>;

export const quotesAgentActions = {
    setAgentQuotesList: (quotes: QuoteType[]) => ({type: 'SET_AGENT_QUOTES_LIST', quotes} as const),
    setExactQuoteInfo: (quote_info: QuoteType | null) => ({type: 'SET_EXACT_QUOTE_INFO', quote_info} as const),
    setExistingRateForQuote: (rate: RateQuoteType | null) => ({type: 'SET_EXISTING_RATE', rate} as const),
    setExistingSurchargeForQuote: (surcharge: SurchargeInfoType | null) => ({type: 'SET_EXISTING_SURCHARGE_FOR_QUOTE', surcharge} as const),
    setCheckedIsRateExist: (value: string) => ({type: 'SET_CHECK_IS_RATE_EXIST', value} as const),
    deleteRejectedQuote: (id: number) => ({type: 'DELETE_REJECTED_QUOTE', id} as const),
    setSubmittedQuote: (id: number) => ({type: 'SET_SUBMITTED_QUOTE', id} as const),
    setSaveRateToYourResult: (value: boolean) => ({type: 'SET_SAVE_RATE_TO_YOUR_LIST', value} as const),
    setBadSavingRateToList: (message: string) => ({type: 'SET_BAD_SAVING', message} as const),
    setFindedFirst: (value: boolean) => ({type: 'SET_FINDED_FIRST', value} as const)
};