import {PortType} from "../rates&surcharges/ratesTypes";
import {ChargeCalculationType} from "../quotes/quotesTypes";

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

export type BillingOperationType = {
    id: number,
    aceid: string,
    booking_number: string,
    origin: PortType,
    destination: PortType,
    shipping_type: string,
    shipping_mode: string,
    payment_due_by: string,
    status: string,
    carrier: string,
    charges: ChargeCalculationType,
    vessel: string,
    client: string
}