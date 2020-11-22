import {Dispatch} from "redux";
import {quotesAgentAPI} from "../../../_DAL/API/quotes/agent/agentQuotesAPI";
import {commonQuotesAgentActions, quotesAgentActions} from "../../reducers/quotes/quotesAgentReducer";
import {QuoteForRateType, RateQuoteType} from "../../types/quotes/quotesTypes";


export const getAgentQuotesListThunk = (type: string, field_name: string, search_column: string, search_value: string) => {
    return async (dispatch: Dispatch<commonQuotesAgentActions>) => {
        try {
            dispatch(quotesAgentActions.setIsFetching(true))
            let res = await quotesAgentAPI.getList(type, field_name, search_column, search_value)
            dispatch(quotesAgentActions.setAgentQuotesList(res.data))
            dispatch(quotesAgentActions.setIsFetching(false))
        } catch (e) {
            console.log(e)
            dispatch(quotesAgentActions.setIsFetching(false))
        }
    }
}

export const getExactQuoteThunk = (id: number) => {
    return async (dispatch: Dispatch<commonQuotesAgentActions>) => {
        try {
            let res = await quotesAgentAPI.getExactQuote(id)
            dispatch(quotesAgentActions.setExactQuoteInfo(res.data))
        } catch (e) {
            console.log(e)
        }
    }
}
export const getExistingRatesForQuoteThunk = (quote_data: QuoteForRateType) => {
    return async (dispatch: Dispatch<commonQuotesAgentActions>) => {
        try {
            let res = await quotesAgentAPI.getExistingRateForQuote(quote_data)
            dispatch(quotesAgentActions.setFindedFirst(false))
            if(JSON.stringify(res.data) === '{}') {
                dispatch(quotesAgentActions.setExistingRateForQuote(null))
                dispatch(quotesAgentActions.setCheckedIsRateExist('success'))
            } else {
                dispatch(quotesAgentActions.setFindedFirst(true))
                dispatch(quotesAgentActions.setExistingRateForQuote(res.data))
                dispatch(quotesAgentActions.setCheckedIsRateExist('success'))
            }
        } catch (e) {
            console.log(e)
        }
    }
}

export const submitQuoteThunk = (quote_id: number, freight_id: number, history: any) => {
    return async (dispatch: Dispatch<commonQuotesAgentActions>) => {
        try {
            await quotesAgentAPI.submitQuote(quote_id, freight_id)
            dispatch(quotesAgentActions.setSubmittedQuote(quote_id))
            history.push('/general')
        } catch(e) {
            console.log(e)
        }
    }
}

export const rejectQuoteThunk = (quote_id: number, history: any) => {
    return async (dispatch: Dispatch<commonQuotesAgentActions>) => {
        try {
            await quotesAgentAPI.rejectQuote(quote_id)
            dispatch(quotesAgentActions.deleteRejectedQuote(quote_id))
            dispatch(quotesAgentActions.setExactQuoteInfo(null))
            dispatch(quotesAgentActions.setCheckedIsRateExist(''))
            dispatch(quotesAgentActions.setExistingRateForQuote(null))
            dispatch(quotesAgentActions.setExistingSurchargeForQuote(null))
            history.push('/general')
        } catch(e) {
            console.log(e)
        }
    }
}
export const withdrawOfferThunk = (quote_id: number, history: any) => {
    return async (dispatch: Dispatch<commonQuotesAgentActions>) => {
        try {
            await quotesAgentAPI.withdrawOffer(quote_id)
            await quotesAgentAPI.rejectQuote(quote_id)
            dispatch(quotesAgentActions.deleteRejectedQuote(quote_id))
            dispatch(quotesAgentActions.setExactQuoteInfo(null))
            history.push('/general')
        } catch (e) {
            console.log(e)
        }
    }
}

export const saveRateToMyListThunk = (freight_id: number, freight_data: RateQuoteType) => {
    return async (dispatch: Dispatch<commonQuotesAgentActions>) => {
        try {
            dispatch(quotesAgentActions.setBadSavingRateToList(""))
            await quotesAgentAPI.saveRateToYourList(freight_id, freight_data)
            dispatch(quotesAgentActions.setSaveRateToYourResult(true))
        } catch (e) {
            console.log(e)
            dispatch(quotesAgentActions.setSaveRateToYourResult(false))
            dispatch(quotesAgentActions.setBadSavingRateToList("Sorry, this rate can't be saved. Probably you have a similar one"))
        }
    }
}