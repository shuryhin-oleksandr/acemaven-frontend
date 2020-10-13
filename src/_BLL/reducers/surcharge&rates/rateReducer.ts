import { ShippingTypeType } from "../../types/rates&surcharges/ratesTypes";
import { CarrierType } from "../../types/rates&surcharges/ratesTypes";

const initialState = {
  shipping_type: null as ShippingTypeType[] | null,
  sea_carriers: null as CarrierType[] | null,
  air_carriers: null as CarrierType[] | null,
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
};
