import {Dispatch} from "redux";
import {commonQuotesClientActions, quotesClientActions} from "../../reducers/quotes/quotesClientReducer";
import {quotesClientAPI} from "../../../_DAL/API/quotes/client/quotesClientAPI";


export const postSearchQuoteThunk = (data:any, history: any) =>{
    return async (dispatch: Dispatch<commonQuotesClientActions>) => {
        try {
            let res = await quotesClientAPI.postSearchQuote(data);
            console.log(res)
            history.push(`/quotes`)
        }catch (e) {
            console.log(e);
        }
    }
}

export const getClientQuotesThunk = (type: string, field_name: string, search_column: string, search_value: string) => {
    return async (dispatch: Dispatch<commonQuotesClientActions>) => {
        try {
            let res = await quotesClientAPI.getQuotes(type, field_name, search_column, search_value)
            dispatch(quotesClientActions.setClientQuotesList(res.data))
            console.log(res.data)
        } catch (e) {
            console.log(e)
        }
    }
}

export const activateClientQuoteThunk = (id: number, is_active: boolean) => {
    return async (dispatch: Dispatch<commonQuotesClientActions>) => {
        try {
            await quotesClientAPI.activateQuote(id, is_active)
            dispatch(quotesClientActions.setActivateQuote(id, is_active))
        } catch (e) {
            console.log(e)
        }
    }
}

export const deleteQuoteFromClientListThunk = (id: number) => {
    return async (dispatch: Dispatch<commonQuotesClientActions>) => {
        try {
            await quotesClientAPI.deleteQuoteFromClientList(id)
            dispatch(quotesClientActions.deleteQuoteFromList(id))
        } catch (e) {
            console.log(e)
        }
    }
}

