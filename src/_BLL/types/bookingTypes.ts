import { CargoGroupType } from "./search/search_types";

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

export type BookingInfoType = {

}
