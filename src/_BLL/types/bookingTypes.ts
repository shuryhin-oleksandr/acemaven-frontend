import { CargoGroupType } from "./search/search_types";
import {CargoGroupQuoteType, RateQuoteType} from "./quotes/quotesTypes";

export type CargoDetailsValue = {
  id: string;
  description: string;
};

// export type CargoGroup = {
//   container_type?: string;
//   packaging_type?: string;
//   volume?: number;
//   weight?: number;
//   length?: number;
//   width?: number;
//   height?: number;
//   total_wm?: string;
//   frozen?: string;
//   dangerous?: boolean;
//   weight_measurement?: string;
//   length_measurement?: string;
//   description?: string;
//   id?: string;
// };

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
  shipper: ShipperType;
};

export type CostBookingType = {
  freight_rate?: any,
  doc_fee: {currency: string, cost: number, subtotal: number},
  total_freight_rate: {BRL?: number, USD?: number},
  total_surcharge: {BRL?: number, USD?: number},
  totals: {BRL?: number, USD?: number},
  cargo_groups: Array<{
    volume: number,
    cargo_type: string,
    freight: {currency: string, cost: number, subtotal: number},
    other: {currency: string, cost: number, subtotal: number},
    handling: {currency: string, cost: number, subtotal: number}
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
  charges: CostBookingType
}
