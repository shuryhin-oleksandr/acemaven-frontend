
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
    packaging_type?: number,
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