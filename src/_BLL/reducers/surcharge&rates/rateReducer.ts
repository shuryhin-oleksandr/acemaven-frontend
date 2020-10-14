import {
  CarrierType,
  PortType,
  ShippingTypeType,
  CurrencyType,
} from "../../types/rates&surcharges/ratesTypes";

const initialState = {
  shipping_type: null as ShippingTypeType[] | null,
  sea_carriers: null as CarrierType[] | null,
  air_carriers: null as CarrierType[] | null,
  origin_ports: null as PortType[] | null,
  destination_ports: null as PortType[] | null,
  currency_list: null as CurrencyType[] | null,
};

type InitialStateType = typeof initialState;
export const rateReducer = (
  state = initialState,
  action: commonRateActions
): InitialStateType => {
  switch (action.type) {
    case "SET_SHIPPING_TYPE":
      return {
        ...state,
        shipping_type: action.shipping_type,
      };
    case "SET_SEA_CARRIERS_LIST":
      return {
        ...state,
        sea_carriers: action.sea_carriers,
      };
    case "SET_AIR_CARRIERS_LIST":
      return {
        ...state,
        air_carriers: action.air_carriers,
      };
    case "SET_ORIGIN_PORTS":
      return {
        ...state,
        origin_ports: action.ports,
      };
    case "SET_DESTINATION_PORTS":
      return {
        ...state,
        destination_ports: action.ports,
      };
    case "SET_CURRENCY_LIST":
      return {
        ...state,
        currency_list: action.list,
      };
    default:
      return state;
  }
};

type AC<T> = T extends { [key: string]: (...args: any[]) => infer U }
  ? U
  : never;
export type commonRateActions = AC<typeof rateActions>;

export const rateActions = {
  setShippingType: (shipping_type: ShippingTypeType[]) =>
    ({ type: "SET_SHIPPING_TYPE", shipping_type } as const),
  setSeaCarriersList: (sea_carriers: CarrierType[]) =>
    ({ type: "SET_SEA_CARRIERS_LIST", sea_carriers } as const),
  setAirCarriersList: (air_carriers: CarrierType[]) =>
    ({ type: "SET_AIR_CARRIERS_LIST", air_carriers } as const),
  setOriginPortsList: (ports: PortType[]) =>
    ({ type: "SET_ORIGIN_PORTS", ports } as const),
  setDestinationPortsList: (ports: PortType[]) =>
    ({ type: "SET_DESTINATION_PORTS", ports } as const),
  setCurrencyList: (list: CurrencyType[]) =>
    ({ type: "SET_CURRENCY_LIST", list } as const),
};
