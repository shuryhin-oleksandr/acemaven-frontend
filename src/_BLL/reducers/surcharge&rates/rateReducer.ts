import {
  CarrierType,
  PortType,
  ShippingTypeType,
  CurrencyType, RateForSurchargeType,
} from "../../types/rates&surcharges/ratesTypes";
import {SurchargeInfoType} from "../../types/rates&surcharges/surchargesTypes";


const initialState = {
  shipping_type: null as ShippingTypeType[] | null,
  sea_carriers: null as CarrierType[] | null,
  air_carriers: null as CarrierType[] | null,
  origin_ports: null as PortType[] | null,
  destination_ports: null as PortType[] | null,
  currency_list: null as CurrencyType[] | null,
  freight_rates_list: null as any | null,
  existing_surcharge: null as SurchargeInfoType |  null,
  empty_existing_surcharge: '',
  origin_port_value: null as PortType | null,
  destination_port_value: null as PortType | null,
  rate_start_date: '',
  rate_data_for_surcharge: null as RateForSurchargeType | null,
  registration_success: ''
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
    case "SET_FREIGHT_RATES_LIST":
      return {
        ...state,
        freight_rates_list: action.freight_rates_list
      }
    case "SET_NEW_FREIGHT_RATE":
      return {
        ...state, freight_rates_list: [...state.freight_rates_list, action.freight_rate]
      }
    case "SET_EXISTING_SURCHARGE_BY_RATE":
      return {
        ...state, existing_surcharge: action.surcharge
      }
    case "SET_EMPTY_EXISTING_SURCHARGE":
      return {
        ...state, empty_existing_surcharge: action.empty
      }
    case "SET_ORIGIN_PORT_VALUE":
      return {
        ...state,
        origin_port_value: action.port_value
      }
    case "SET_DESTINATION_PORT_VALUE":
      return {
        ...state,
        destination_port_value: action.port_value
      }
    case "SET_RATE_START_DATE":
      return {
        ...state,
        rate_start_date: action.start_date
      }
    case "SET_RATE_DATA_FOR_SURCHARGE":
      return {
        ...state,
        rate_data_for_surcharge: action.rate_data
      }
    case "SET_REGISTRATION_SUCCESS":
      return {
        ...state,
        registration_success: action.success
      }
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
  setFreightRatesList: (freight_rates_list: any) => ({type: 'SET_FREIGHT_RATES_LIST', freight_rates_list} as const),
  setNewFreightRate: (freight_rate: any) => ({type: 'SET_NEW_FREIGHT_RATE', freight_rate} as const),
  setRegistrationSuccess: (success: string) => ({type: 'SET_REGISTRATION_SUCCESS', success} as const),
  setExistingSurchargeByRate: (surcharge: any) => ({type: 'SET_EXISTING_SURCHARGE_BY_RATE', surcharge} as const),
  setEmptyExistingSurcharge: (empty: string) => ({type: 'SET_EMPTY_EXISTING_SURCHARGE', empty} as const),
  setOriginPortValue: (port_value: PortType) => ({type: 'SET_ORIGIN_PORT_VALUE', port_value} as const),
  setDestinationPortValue: (port_value: PortType) => ({type: 'SET_DESTINATION_PORT_VALUE', port_value} as const),
  setRateStartDate: (start_date: string) => ({type: 'SET_RATE_START_DATE', start_date} as const),
  setRateDataForSurcharge: (rate_data: RateForSurchargeType) => ({type: 'SET_RATE_DATA_FOR_SURCHARGE', rate_data} as const ),
  setCheckedFreight: (freight_rate: any) => ({type: 'SET_CHECKED_FREIGHT_RATE', freight_rate} as const)
};
