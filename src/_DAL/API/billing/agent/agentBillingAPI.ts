import instance from "../../axiosConfig";


export const agentBillingAPI = {
    getExchangeCompanyList () {
        return instance.get("/handling/exchange-rate/");
    },
    addNewExchangeRate (exchange_data: {rates: Array<{currency: number, rate: string, spread: string}>}) {
        return instance.post("/handling/exchange-rate/", exchange_data)
    }
}