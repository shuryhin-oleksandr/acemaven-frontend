import {CargoGroupQuoteType, RateQuoteType} from "../quotes/quotesTypes";
import {CostBookingType, ShipperType} from "../bookingTypes";

export type WeekRangeType = {
    week_from: number,
    week_to: number
}

export type ShipmentDetailsType = {
    id: number,
    booking_number : string,
    booking_number_with_carrier?: any,
    flight_number?: string | number,
    vessel?: string,
    voyage?: string,
    container_number?: any,
    mawb?: string,
    date_of_departure: string,
    date_of_arrival: string,
    document_cut_off_date?: string,
    cargo_cut_off_date?: string,
    cargo_pick_up_location?: string,
    cargo_pick_up_location_address?: string,
    cargo_drop_off_location?: string,
    cargo_drop_off_location_address?:string,
    empty_pick_up_location?: string,
    empty_pick_up_location_address?: string,
    container_free_time?: number,
    booking_notes : string
    booking : number
}

export type AgentBankAccountType = {
    id: number,
    bank_name: string,
    bank_number: string,
    branch: string,
    number: string
}

export type OperationType = {
    id: number,
    aceid: string,
    booking_number?: string,
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
    agent_bank_account?: AgentBankAccountType
    shipper?: ShipperType,
    charges?: CostBookingType,
    client_contact_person?: string,
    client?: string,
    shipment_details?: ShipmentDetailsType[],
    payment_due_by: string | null,
    has_change_request?: boolean
}