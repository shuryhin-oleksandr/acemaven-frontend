import {Dispatch} from "redux";
import {commonQuotesClientActions, quotesClientActions} from "../../reducers/quotes/quotesClientReducer";
import {quotesClientAPI} from "../../../_DAL/API/quotes/client/quotesClientAPI";

export const getClientQuotesThunk = () => {
    return async (dispatch: Dispatch<commonQuotesClientActions>) => {
        try {
            let res = await quotesClientAPI.getQuotes()
            console.log(res.data)
        } catch (e) {
            console.log(e)
        }
    }
}

export const activateClientQuoteThunk = (id: number, is_active: boolean) => {
    return async (dispatch: Dispatch<commonQuotesClientActions>) => {
        try {
            let res = await quotesClientAPI.activateQuote(id, is_active)
            console.log(res.data)
        } catch (e) {
            console.log(e)
        }
    }
}

export const filterSortClientQuotesThunk = (type: string, field_name: string, search_column: string, search_value: string) => {
    return async (dispatch: Dispatch<commonQuotesClientActions>) => {
        try {
            let res = await quotesClientAPI.filterSortClientQuotes(type, field_name, search_column, search_value)
        } catch (e) {
            console.log(e)
        }
    }
}

export const deleteQuoteFromClientListThunk = (id: number) => {
    return async (dispatch: Dispatch<commonQuotesClientActions>) => {
        try {
           let res = await quotesClientAPI.deleteQuoteFromClientList(id)
            console.log(res.data)
            dispatch(quotesClientActions.deleteQuoteFromList(id))
        } catch (e) {
            console.log(e)
        }
    }
}