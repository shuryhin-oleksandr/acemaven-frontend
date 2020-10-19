import { SurchargeInfoType } from "./surchargesTypes";

export type CurrencyType = {
  id: number;
  code: string;
};

export type PortType = {
  id: number;
  display_name: string;
  name: string;
  code: string;
  is_local?: boolean;
};

export type CarrierType = {
  id: number;
  title: string;
  shipping_type?: number;
};

export type AdditionalSurchargeType = {
  id: number;
  title: string;
};

export type ContainerType = {
  id: number;
  code: string;
};

export type ShippingModeType = {
  id: number;
  title: string;
  additional_surcharges?: AdditionalSurchargeType[];
  container_types?: ContainerType[];
};

export type ShippingTypeType = {
  id: number;
  title: string;
  shipping_modes: ShippingModeType[];
};

export type RateType = {
  container_type: number;
  currency: number;
  rate: string | number;
  start_date: string;
  expiration_date: string;
};

export type FreightRateObjectType = {
  id: number;
  shipping_mode: string;
  shipping_type: string;
  carrier: string;
  origin: string;
  destination: string;
  expiration_date: string;
  is_active: boolean;
};

export type FreightRateType = {
  rates: Array<RateType>;
  origin: number;
  destination: number;
  shipping_mode: number;
  carrier: number;
  transit_time: number;
};
export type RateForSurchargeType = {
  start_date: string;
  expiration_date: string;
  carrier: number;
  shipping_mode: number;
  origin: number;
  destination: number;
  transit_time: number;
};

export type FreightRateRateType = {
  id: number;
  container_type: ContainerType;
  currency: CurrencyType;
  rate: string;
  start_date: string;
  expiration_date: string;
  updated_by: string;
  date_updated: string;
  surcharges: SurchargeInfoType[];
};

export type RateInfoType = {
  id: number;
  carrier: CarrierType;
  is_active: boolean;
  carrier_disclosure: boolean;
  destination: PortType;
  origin: PortType;
  rates: FreightRateRateType[];
  shipping_mode: ShippingModeType;
  shipping_type: string;
  transit_time: number;
};
