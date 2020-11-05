
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
    weight: number,
    weight_measurement: string,
    length: number,
    length_measurement: string,
    width: number,
    height: number,
    is_dangerous: boolean,
    total_wm?: number,
    one_box_wm?: number,
    shipping_type?: string,
    id?: number
}



export type ChoiceType = {
    id: string
    title: string
}

export type FrozenChoiceType = {
    frozen_choices:ChoiceType[]
}