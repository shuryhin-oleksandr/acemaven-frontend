import {CarrierType, ChargesType, UsageFeeType} from "../rates&surcharges/surchargesTypes";
import {PortType, ShippingModeType} from "../rates&surcharges/ratesTypes";


export type CargoGroupQuoteType = {
    container_type?: {
        id: number,
        code: string,
        shipping_mode: number,
        is_frozen: boolean,
        can_be_dangerous: boolean
    },
    packaging_type?: {
        id: number,
        code: string,
        description: string
    },
    volume: number,
    weight: string,
    weight_measurement: string,
    length: string,
    length_measurement: string,
    width: string,
    height: string,
    dangerous?: boolean,
    frozen?: string,
    total_wm?: number,
    total_per_pack?: number,
    shipping_type?: string,
    id?: number
    description?: any
}

export type StatusesQuoteType = {
    id: number,
    quote: number,
    company: any,
    status: string,
    is_viewed: boolean,
    freight_rate?: {
        id: number,
        carrier: CarrierType ,
        carrier_disclosure: boolean,
        origin: PortType,
        destination: PortType,
        transit_time: any,
        is_active: boolean,
        shipping_mode: ShippingModeType,
        temporary: boolean,
        shipping_type: string,
        rates?: Rate[]
    },
    charges: ChargeCalculationType
}
export type QuoteType = {
    id?: number,
    origin: {
        id: number,
        code: string,
        name: string,
        display_name: string,
        is_local?: boolean
    },
    destination: {
        id: number,
        code: string,
        name: string,
        display_name: string,
        is_local?: boolean
    },
    shipping_mode: {
        id: number,
        title: string
    },
    date_from: string,
    date_to: string,
    is_active: boolean,
    is_submitted?: boolean,
    cargo_groups: CargoGroupQuoteType[],
    shipping_type: string,
    week_range: {
        week_from: number,
        week_to: number
    },
    statuses?: StatusesQuoteType[],
    offers?: number,
    unchecked_offers?: number
}

export type AgentQuoteType = {
    id?: number,
    origin: {
        id: number,
        code: string,
        name: string,
        display_name: string,
        is_local?: boolean
    },
    destination: {
        id: number,
        code: string,
        name: string,
        display_name: string,
        is_local?: boolean
    },
    shipping_mode: {
        id: number,
        title: string
    },
    date_from: string,
    date_to: string,
    is_active: boolean,
    is_submitted?: boolean,
    cargo_groups: CargoGroupQuoteType[],
    shipping_type: string,
    week_range: {
        week_from: number,
        week_to: number
    },
    status?: StatusesQuoteType,
    offers?: number,
    unchecked_offers?: number
}

export type CargoGroupQuoteNumberType = {
    container_type?: number,
    packaging_type?: number,
    volume: number,
    weight: string,
    weight_measurement: string,
    length: string,
    length_measurement: string,
    width: string,
    height: string,
    dangerous?: boolean,
    frozen?: string,
    total_wm?: number,
    total_per_pack?: number,
    shipping_type?: string,
    id?: number
    description?: any
}

export type QuoteForRateType = {
    origin: number,
    destination: number,
    shipping_mode: number,
    carrier: number,
    cargo_groups: CargoGroupQuoteNumberType[],
    date_from: string,
    date_to: string,
}

export type Rate = {
    id: number,
    container_type: any,
    currency: {id: number, code: string},
    rate: string,
    start_date: string,
    expiration_date: string,
    surcharges?: SurchargesForQuoteType[],
    updated_by? : string,
    date_updated?: string
}
export type RateQuoteType = {
    id: number,
    carrier: {id: number, title: string},
    carrier_disclosure: boolean,
    origin: PortType,
    destination: PortType,
    transit_time: any,
    is_active: boolean,
    shipping_mode: {id: number, title: string},
    temporary: boolean,
    rates: Rate[]
}
export type SurchargesForQuoteType = {
    id: number,
    carrier: CarrierType,
    direction: string,
    shipping_mode: {id: number, title: string}
    location?: PortType,
    destination: PortType,
    start_date: string,
    expiration_date: string,
    temporary: true,
    usage_fees: UsageFeeType[],
    charges: ChargesType[],
    shipping_type: string
}

export type ChargeCalculationType = {
    totals: {BRL : number, USD: number},
    doc_fee?: {
        cost: number,
        currency: string,
        subtotal: number,
        volume?: number
    },
    pay_to_book?: {
        currency: string,
        booking_fee: number,
        pay_to_book: number,
        service_fee: number
    },
    service_fee?: {
        cost: number,
        currency: string,
        subtotal: number,
    },
    total_surcharge?: {
        'BRL' : number,
        'USD' : number
    },
    total_freight_rate?: {
        'BRL' : number,
        'USD': number
    },
    cargo_groups?: Array<{ volume: number,
          cargo_type: string,
          other: {
                cost: number,
                currency: string,
                subtotal: number,
          },
          freight: {
                currency: string,
                cost: number,
                subtotal: number,
                booking_fee: number
          },
          handling: {
                cost: number,
                currency: string,
                subtotal: number,
          }
        }>,
    freight_rate?: {
        id: number,
        carrier: any,
        carrier_disclosure: boolean,
        company: string,
        is_active: boolean,
        transit_time: any,
        shipping_mode: string,
        shipping_type: string,
        expiration_date: string,
        origin: PortType,
        destination: PortType
    }
}

