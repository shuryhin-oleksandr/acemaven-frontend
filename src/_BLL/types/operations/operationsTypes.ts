import {CargoGroupQuoteType, RateQuoteType} from "../quotes/quotesTypes";

export type WeekRangeType = {
    week_from: number,
    week_to: number
}

export type OperationType = {
    id: number,
    aceid: string,
    date_from : string,
    date_to : string,
    release_type : null | string | number,
    number_of_documents : null | number,
    shipping_type : string,
    status : string,
    cargo_groups: CargoGroupQuoteType[],
    freight_rate: RateQuoteType,
    agent_contact_person: string
}