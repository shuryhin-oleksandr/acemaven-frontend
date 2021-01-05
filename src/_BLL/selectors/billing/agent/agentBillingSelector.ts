import {AppStateType} from "../../../store";
import {CurrencyEnum} from "../../../helpers/surcharge_helpers_methods&arrays";

export const getAgentExchangeListSelector = (state: AppStateType) => {
    const exchange_list = state.agent_billing.exchange_list;
    // data for the chart
    let dates_labels = exchange_list.map(ex => ex.date.slice(0, 5))
    //USD
    let usd_a = exchange_list.map(ex => ex.rates.filter(r => r.currency === 'USD' || r.currency === CurrencyEnum.USD))
    //@ts-ignore
    let usd_rates = usd_a.flat().map(u => Number(u.rate))
    //EUR
    let eur_a = exchange_list.map(ex => ex.rates.filter(r => r.currency === 'EUR' || r.currency === CurrencyEnum.EUR))
    //@ts-ignore
    let eur_rates = eur_a.flat().map(eu => Number(eu.rate))


    return {
        exchange_list,
        dates_labels,
        usd_rates,
        eur_rates
    }
}


export const isFetchingSelector = (state: AppStateType) => state.agent_billing.isFetching
export const repeatedExchangeSelector  = (state: AppStateType) => state.agent_billing.repeated_exchange