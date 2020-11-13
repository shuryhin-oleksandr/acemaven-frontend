
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
        display_name: string
    },
    destination: {
        id: number,
        code: string,
        name: string,
        display_name: string,
    },
    shipping_mode: {
        id: number,
        title: string
    },
    date_from: string,
    date_to: string,
    is_active: boolean,
    cargo_groups: CargoGroupQuoteType[],
    shipping_type: string,
    week_range: {
        week_from: number,
        week_to: number
    }
}



