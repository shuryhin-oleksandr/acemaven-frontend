import instance from "../../axiosConfig";


export const agentBillingAPI = {
    getExchangeCompanyList () {
        return instance.get("/handling/exchange-rate/");
    },
    addNewExchangeRate (exchange_data: {rates: Array<{currency: number, rate: string, spread: string}>}) {
        return instance.post("/handling/exchange-rate/", exchange_data)
    },
    getBillingList (type: string, field_name: string, search_column: string,
                    search_value: string, status?: string) {
        return instance.get(`/booking/billing/?shipping_type=${type}&ordering=${field_name}&${search_column}=${search_value}&status=${status}`)
    },
    getBillingOperationDetails (id: number) {
        return instance.get(`/booking/billing/${id}/`)
    }
}