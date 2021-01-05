
export type ExchangeCurrenciesType = {
    id: number,
    rate: string,
    spread: string,
    currency: number | string
}

export type ExchangeRateType = {
    id: number,
    date: string,
    rates: Array<ExchangeCurrenciesType>
}