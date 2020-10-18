

export type CurrencyType = {
  id: number,
  code: string
}

export type PortType = {
  id: number;
  display_name: string;
  name: string;
  code: string;
  is_local?: boolean
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
  container_type: number
  currency: number
  rate: string | number
  start_date: string
  expiration_date: string
}

export type FreightRateType = {
  rates: Array<RateType>,
  origin: number,
  destination: number,
  shipping_mode: number,
  carrier: number,
  transit_time: number
}
export type RateForSurchargeType = {
  start_date: string,
  expiration_date: string,
  carrier: number,
  shipping_mode: number,
  origin: number,
  destination: number,
  transit_time: number
}
