import instance from "../../axiosConfig";


export const agentBillingAPI = {
    getExchangeCompanyList () {
        return instance.get("/handling/exchange-rate/");
    },
    addNewExchangeRate (exchange_data: {rates: Array<{currency: number, rate: string, spread: string}>}) {
        return instance.post("/handling/exchange-rate/", exchange_data)
    },
    getBillingList (type: string, field_name: string, search_column: string,
                    //@ts-ignore
                    search_value: string, status?: string, date_from: string, date_to: string) {
        return instance.get(
            `/booking/billing/?shipping_type=${type}&ordering=${field_name}&${search_column}=${search_value}&status=${status}&date_from=${date_from}&date_to=${date_to}`
        )
    },
    getBillingOperationDetails (id: number) {
        return instance.get(`/booking/billing/${id}/`)
    }
}