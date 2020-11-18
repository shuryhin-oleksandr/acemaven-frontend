

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
    }
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
    expiration_date: string
}
export type RateQuoteType = {
    id: number,
    carrier: number,
    carrier_disclosure: boolean,
    origin: number,
    destination: number,
    transit_time: any,
    is_active: boolean,
    shipping_mode: number,
    temporary: boolean,
    rates: Rate[]
}

