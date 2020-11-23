import instance from "../../axiosConfig";
import {SearchDataType} from "../../../../_BLL/types/search/search_types";

export const quotesClientAPI = {
    postSearchQuote(data:SearchDataType) {
        return instance.post('/booking/quote/', data);
    },
    getQuotes (type: string, field_name: string, search_column: string, search_value: string) {
        return instance.get(`/booking/quote/?shipping_type=${type}&ordering=${field_name}&${search_column}=${search_value}`)
    },
    activateQuote (id: number, is_active: boolean) {
        return instance.patch(`/booking/quote/${id}/`, {is_active: is_active})
    },
    makeOfferViewed (offer_id: number) {
        return instance.patch(`/booking/status/${offer_id}/`, {is_viewed : true})
    },
    deleteQuoteFromClientList (id: number) {
        return instance.delete(`/booking/quote/${id}/`)
    }
};