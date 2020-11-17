import {Dispatch} from "redux";
import {quotesAgentAPI} from "../../../_DAL/API/quotes/agent/agentQuotesAPI";
import {quotesAgentActions} from "../../reducers/quotes/quotesAgentReducer";

export const getAgentQuotesListThunk = (type: string, field_name: string, search_column: string, search_value: string) => {
    return async (dispatch: Dispatch) => {
        try {
            let res = await quotesAgentAPI.getList(type, field_name, search_column, search_value)
            dispatch(quotesAgentActions.setAgentQuotesList(res.data))
            console.log(res.data)
        } catch (e) {
            console.log(e)
        }
    }
}

export const getExactQuoteThunk = (id: number) => {
    return async (dispatch: Dispatch) => {
        try {
            let res = await quotesAgentAPI.getExactQuote(id)
            dispatch(quotesAgentActions.setExactQuoteInfo(res.data))
            //history.push(`/quotes/${id}`)
            console.log(res.data)
        } catch (e) {
            console.log(e)
        }
    }
}