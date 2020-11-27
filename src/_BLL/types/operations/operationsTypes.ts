import {CargoGroupQuoteType, RateQuoteType} from "../quotes/quotesTypes";
import {CostBookingType, ShipperType} from "../bookingTypes";

export type WeekRangeType = {
    week_from: number,
    week_to: number
}

export type OperationType = {
    id: number,
    aceid: string,
    is_assigned?: boolean,
    date_from : string,
    date_to : string,
    week_range?: WeekRangeType,
    release_type : null | string | number,
    number_of_documents : null | number,
    shipping_type : string,
    status : string,
    cargo_groups: CargoGroupQuoteType[],
    freight_rate: RateQuoteType,
    agent_contact_person: string,
    shipper?: ShipperType,
    charges?: CostBookingType,
    client_contact_person?: string,
    client?: string,
    shipment_details?: any
}