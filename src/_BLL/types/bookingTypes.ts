import { CargoGroupType } from "./search/search_types";
import {CargoGroupQuoteType, RateQuoteType} from "./quotes/quotesTypes";

export type CargoDetailsValue = {
  id: string;
  description: string;
};

export type ChoiceType = {
  id: number;
  code?: string;
  title: string;
};

export type DescriptionStepType = {
  cargo_groups: CargoGroupType[];
  release_type?: number;
  number_of_documents?: number;
};

export type ShipperType = {
  id?: number;
  name: string;
  address_line_first?: string;
  address_line_second?: string;
  state?: string;
  city: string;
  zip_code?: string;
  contact_name: string;
  phone: string;
  phone_additional?: string;
  email: string;
};

export type PostBookingData = {
  cargo_groups: CargoGroupType[];
  release_type?: number;
  number_of_documents?: number;
  date_from: string;
  date_to: string;
  freight_rate: number;
  shipper?: ShipperType;
  existing_shipper?:number;
};

export type CostBookingType = {
  freight_rate?: any,
  doc_fee: {currency: string, cost: number, subtotal: number, volume?: number},
  total_freight_rate: {BRL?: number, USD?: number},
  total_surcharge: {BRL?: number, USD?: number},
  totals: {BRL?: number, USD?: number},
  service_fee?: {cost : number, currency : string, subtotal : number},
  pay_to_book?: {
    currency : string
    booking_fee : number,
    pay_to_book : number,
    service_fee : number
  },
  cargo_groups: Array<{
    volume: number,
    cargo_type: string,
    freight: {currency: string, cost: number, subtotal: number},
    other: {currency: string, cost: number, subtotal: number},
    handling: {currency: string, cost: number, subtotal: number}
    cargo_group?: CargoGroupQuoteType
  }>
}
export type BookingInfoType = {
  id:number;
  aceid: string;
  cargo_groups: CargoGroupQuoteType[];
  release_type?: {id: number, title: string};
  number_of_documents?: number;
  date_from: string;
  date_to: string;
  freight_rate: RateQuoteType;
  shipper: ShipperType;
  shipping_type: string;
  status: string;
  client: string;
  client_contact_person: string;
  week_range: {week_from: number; week_to: number},
  charges: CostBookingType,
  is_assigned: boolean
}

export type BookingShipmentDetailsType = {
  booking_number: string,
  booking_number_with_carrier?: string,
  flight_number?: string,
  vessel?: string,
  voyage?: string,
  container_number?:	string,
  mawb?: string,
  date_of_departure :string,
  date_of_arrival: string,
  document_cut_off_date?: string,
  cargo_cut_off_date?: string,
  cargo_pick_up_location?: string,
  cargo_pick_up_location_address?: string
  cargo_drop_off_location?: string,
  cargo_drop_off_location_address?:	string,
  empty_pick_up_location?: string,
  empty_pick_up_location_address?: string,
  container_free_time?:	number,
  booking_notes: string,
  booking: number
}
