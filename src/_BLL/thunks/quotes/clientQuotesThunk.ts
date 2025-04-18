import {Dispatch} from "redux";
import {commonQuotesClientActions, quotesClientActions} from "../../reducers/quotes/quotesClientReducer";
import {quotesClientAPI} from "../../../_DAL/API/quotes/client/quotesClientAPI";


export const postSearchQuoteThunk = (data:any, history: any) => {
    return async (dispatch: Dispatch<commonQuotesClientActions>) => {
        try {
            await quotesClientAPI.postSearchQuote(data);
            history.push(`/quotes`)
            sessionStorage.removeItem("origin_id");
            sessionStorage.removeItem("destination_id")
        }catch (e) {
            if(e.response.data.origin || e.response.data.destination){
                dispatch(quotesClientActions.setResponseError("Please, check origin and destination of your search request and try again."));
            }
        }
    }
}

export const getClientQuotesThunk = (type: string, field_name: string, search_column: string, search_value: string) => {
    return async (dispatch: Dispatch<commonQuotesClientActions>) => {
        try {
            dispatch(quotesClientActions.setIsFetching(true))
            let res = await quotesClientAPI.getQuotes(type, field_name, search_column, search_value)
            dispatch(quotesClientActions.setClientQuotesList(res.data))
            dispatch(quotesClientActions.setIsFetching(false))
        } catch (e) {
            console.log(e)
            dispatch(quotesClientActions.setIsFetching(false))
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

export const makeOfferViewedThunk = (offer_id: number) => {
    return async (dispatch: Dispatch<commonQuotesClientActions>) => {
        try {
            await quotesClientAPI.makeOfferViewed(offer_id)
        } catch (e) {
            console.log(e)
        }
    }
}


