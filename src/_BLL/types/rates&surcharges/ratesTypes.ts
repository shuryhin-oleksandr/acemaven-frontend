export type CurrencyType = {
  id: number,
  code: string
}

export type PortType = {
  id: number;
  display_name: string;
  name: string;
  code: string;
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
