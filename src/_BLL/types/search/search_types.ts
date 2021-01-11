import {PortType} from "../rates&surcharges/ratesTypes";

export type SearchDataType = {
    shipping_mode: number,
    origin: number,
    destination: number,
    date_from: string,
    date_to: string,
    cargo_groups: CargoGroupType[]
}

export type CargoGroupType = {
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
    id?: number | string,
    description?: string
}

export type SearchFreightRateType = {
    id: number,
    carrier: string,
    carrier_disclosure?: boolean,
    origin: PortType,
    destination: PortType,
    shipping_mode: string,
    shipping_type: string,
    expiration_date: string,
    transit_time: number,
    is_active?: boolean,
    company: {id: number, name: string, rating: number | null}
}
export type CargoGroupResultType = {
    freight: {
        currency: number,
        cost: number,
        subtotal: number,
        booking_fee: number
    },
    handling: {
        currency: string,
        cost: number,
        subtotal: number
    },
    other: {
        currency: string,
        cost: number,
        subtotal: number
    },
    volume: number,
    cargo_type: string
}
export type SearchResultType = {
    cargo_groups: CargoGroupResultType[]
    freight_rate: SearchFreightRateType,
    doc_fee: {
        currency: string,
        cost: number,
        subtotal: number
    },
    service_fee: {
        currency: string,
        cost: number,
        subtotal: number
    },
    totals: {
        USD: number,
        BRL: number
    },
    total_freight_rate: {
        USD?: number,
        BRL?: number
    },
    total_surcharge: {
        BRL?: number,
        USD?: number
    },
    pay_to_book: {
        service_fee: number,
        booking_fee: number,
        pay_to_book: number,
        currency: string
    }
}

export type ChoiceType = {
    id: string
    title: string
}

export type FrozenChoiceType = {
    frozen_choices:ChoiceType[]
}

//reviews
export type ReviewType = {
    id: number,
    rating: number,
    comment: string,
    operation: number,
    date_created: string,
    route: string,
    company: string,
    reviewer_photo : string
}

export type RatingCompanyType = {
    id: number,
    name: string,
    date_created: string,
    operations_are_done: number,
    rating: number,
    reviews: Array<ReviewType>
}