import {CargoGroupQuoteType, RateQuoteType} from "../quotes/quotesTypes";
import {CostBookingType, ShipperType} from "../bookingTypes";


export enum AppOperationBookingStatusesType {
    RECEIVED = 'Booking Request Received',
    IN_PROGRESS = 'Booking Request in Progress',
    REJECTED = "Booking Request Rejected",
    CONFIRMED = 'Booking Confirmed',
    CANCELED_BY_CLIENT = 'Operation Canceled by Client',
    CANCELLED_BY_AGENT = 'Operation Canceled by Agent',
    CANCELLED_BY_SYSTEM = 'Operation Canceled by the System',
    BOOKING_FEE_PENDING = 'Booking Fee Pending',
    CHANGE_REQUEST = 'Booking Change Requested',
    CONFIRMED_CHANGE_REQUEST = 'Booking Change Confirmed',
    AWAITING_PAYMENT = 'Awaiting Payment',
    SHIPMENT_IN_PROGRESS = 'Shipment in progress',
    COMPLETED = 'Operation Complete'
}

export type WeekRangeType = {
    week_from: number,
    week_to: number
}

export type ShipmentDetailsType = {
    id: number,
    booking_number: string,
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
    cargo_drop_off_location_address?: string,
    empty_pick_up_location?: string,
    empty_pick_up_location_address?: string,
    container_free_time?: number,
    booking_notes: string,
    booking: number,
    actual_date_of_arrival?: string,
    actual_date_of_departure?: string
}

export type AgentBankAccountType = {
    id: number,
    bank_name: string,
    bank_number: string,
    branch: string,
    number: string
}

export type EventType = {
    type: string,
    numberOfPieces: number,
    timeOfEvent: string,
    timeOfEventTimePartQuality: string,
    flight: string,
    origin: string,
    destination: string,
    scheduledTimeOfArrival: string,
    scheduledTimeOfDeparture: string,
    actualTimeOfDeparture: string | null,
    estimatedTimeOfArrival: string,
    plannedflightTime: string,
    estimatedDiffToSchedule: number | string,
    ecefLongitude: number,
    ecefLatitude: number
}

export type TrackingEventType = {
    id: string,
    type: string,
    airWaybillNumber: string,
    totalNumberOfPieces: string,
    originAndDestination: {
        origin: string,
        destination: string
    },
    quantity: {
        shipmentDescriptionCode: string,
        numberOfPieces: string,
        weight: {
            amount: string,
            unit: string
        }
    },
    otherCustomsSecurityAndRegulatoryInformation: any, //do we need these fields?
    otherServiceInformation: string, //comments for table
    events: EventType[],
    messageHeader: any //do we need these fields?
} //air

export type SeaDataDataType = {
    route: {
        pod: { date: string, location: number },
        pol: { date: string, location: number },
        prepol: { date: string, location: number },
        postpod: { date: string, location: number }
    },
    vessels: {
        id: number,
        imo: number,
        flag: string,
        mmsi: number
        name: string
        call_sign: string
    }[],
    locations: {
        id: number,
        lat: number,
        lng: number
        name: string,
        state: string,
        locode: any
        country: string,
        country_code: string
    }[],
    containers: Array<{
        iso_code: string,
        number: string,
        events: Array<{
            date: string
            type: string
            status: string
            vessel: number | string
            voyage: string
            location: number | string
            description: string
        }>
    }>,
    status: string,
    message: string
}

export type TrackingBackendType = {
    id: number,
    date_created: string,
    route: {
        status: string,
        message: string,
        data: {
            pin: number[],
            route: {
                type: string,
                path: number[]
            } []
        }
    } | null
    comment?: any,
    status?: any,
    booking: number,
    // data: {
    //     data: SeaDataDataType,
    //     status: string,
    //     message: string,
    // } | TrackingEventType // sea and air
    data: any,
    created_by?: string
}

export type InitialTrackingType = {
    shipping_type: string,
    direction: string,
    origin: { latitude: number, longitude: number },
    destination: { latitude: number, longitude: number },
}

export type OperationType = {
    id: number,
    aceid: string,
    booking_number?: string,
    chat?: {chat: number, has_perm_to_read: boolean, has_perm_to_write: boolean},
    is_assigned?: boolean,
    date_from: string,
    date_to: string,
    week_range?: WeekRangeType,
    release_type: any,
    number_of_documents: null | number,
    shipping_type: string,
    status: string,
    cargo_groups: CargoGroupQuoteType[],
    freight_rate: RateQuoteType,
    agent_contact_person: string,
    agent_bank_account?: AgentBankAccountType
    shipper?: ShipperType,
    charges?: CostBookingType,
    charges_today?: {
        total_today: number,
        "EUR exchange rate"?: number,
        "USD exchange rate"?: number,
    } | null,
    client_contact_person?: string,
    client?: string,
    shipment_details?: ShipmentDetailsType[],
    payment_due_by: string | null,
    has_change_request?: boolean,
    change_requests?: Array<OperationType>,
    can_be_patched?: boolean,
    automatic_tracking?: boolean,
    tracking_events?: TrackingEventType[], //REMOVE IT!!!!
    tracking: TrackingBackendType[],
    tracking_initial?: InitialTrackingType | null,
    has_review?: boolean
}

export type LatestTrackingWidgetType = {
    booking_number: string
    date_created: string
    route: string
    shipping_type: string
    status: string
}