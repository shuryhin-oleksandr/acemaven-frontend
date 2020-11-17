import instance from "../../axiosConfig";

export const quotesAgentAPI = {
    getList (type: string, field_name: string, search_column: string, search_value: string) {
        return instance.get(`/booking/quote/agent-quotes-list/?shipping_type=${type}&ordering=${field_name}&${search_column}=${search_value}`)
    },
    getExactQuote(id: number) {
        return instance.get(`/booking/quote/${id}/`)
    }
}