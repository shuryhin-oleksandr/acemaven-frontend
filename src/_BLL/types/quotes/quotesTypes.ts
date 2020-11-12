import {CargoGroupType} from "../search/search_types";


export type QuoteType = {
    id?: number,
    origin: number,
    destination: number,
    shipping_mode: number,
    date_from: string,
    date_to: string,
    is_active: boolean,
    cargo_groups: CargoGroupType[]
}



