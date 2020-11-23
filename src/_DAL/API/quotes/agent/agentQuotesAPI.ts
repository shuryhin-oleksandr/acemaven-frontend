import instance from "../../axiosConfig";
import {QuoteForRateType, RateQuoteType} from "../../../../_BLL/types/quotes/quotesTypes";

export const quotesAgentAPI = {
    getList (type: string, field_name: string, search_column: string, search_value: string) {
        return instance.get(`/booking/quote/agent-quotes-list/?shipping_type=${type}&ordering=${field_name}&${search_column}=${search_value}`)
    },
    getExactQuote(id: number) {
        return instance.get(`/booking/quote/${id}/`)
    },
    submitQuote(quote_id: number, freight_id: number) {
        return instance.post(`/booking/quote/${quote_id}/submit/`,
            {
                freight_rate: freight_id
                }
            )
    },
    rejectQuote (quote_id: number) {
        return instance.post(`/booking/quote/${quote_id}/reject/`, {})
    },
    withdrawOffer (quote_id: number) {
        return instance.post(`/booking/quote/${quote_id}/withdraw/`, {})
    },
    getExistingRateForQuote (data: QuoteForRateType) {
        return instance.post('/booking/quote/surcharge-search/', data)
    },
    saveRateToYourList (freight_id: number, rate_data: RateQuoteType) {
        return instance.post(`/booking/freight-rate/${freight_id}/save/`, rate_data)
    }
}