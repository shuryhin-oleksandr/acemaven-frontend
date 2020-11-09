
export type SearchDataType = {
    shipping_mode: number,
    origin: number,
    destination: number,
    date_from: string,
    date_to: string,
    cargo_groups: CargoGroupType[] | null
}

export type CargoGroupType = {
    container_type?: number,
    package_type?: number,
    volume: number,
    weight: string,
    weight_measurement: string,
    length: string,
    length_measurement: string,
    width: string,
    height: string,
    is_dangerous?: boolean,
    total_wm?: number,
    total_per_pack?: number,
    shipping_type?: string,
    id?: number
}

export type SearchFreightRateType = {
    id: number,
    carrier: string,
    carrier_disclosure?: boolean,
    origin: string,
    destination: string,
    shipping_mode: string,
    shipping_type: string,
    expiration_date: string,
    transit_time: number,
    is_active?: boolean,
    company: string
}
export type CargoGroupResultType = {
    freight: {
        currency: number,
        cost: number,
        subtotal: number,
        booking_fee: number
    },
    other: {
        currency: "BRL",
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