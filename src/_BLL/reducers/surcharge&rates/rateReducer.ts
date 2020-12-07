import {
  CarrierType,
  PortType,
  ShippingTypeType,
  CurrencyType,
  RateForSurchargeType,
  RateInfoType,
} from "../../types/rates&surcharges/ratesTypes";
import { SurchargeInfoType } from "../../types/rates&surcharges/surchargesTypes";
import {CurrentShippingType} from "../../types/rates&surcharges/newSurchargesTypes";


const initialState = {
  isFetching: false,
  current_shipping_type: 'sea' as CurrentShippingType | 'sea',
  shipping_type: null as ShippingTypeType[] | null,
  sea_carriers: null as CarrierType[] | null,
  air_carriers: null as CarrierType[] | null,
  origin_ports: [] as PortType[] ,
  destination_ports: [] as PortType[] ,
  currency_list: null as CurrencyType[] | null,
  freight_rates_list: null as any | null,
  existing_surcharge: null as SurchargeInfoType | null,
  empty_existing_surcharge: "",
  origin_port_value: null as PortType | null,
  destination_port_value: null as PortType | null,
  rate_start_date: "",
  rate_data_for_surcharge: null as RateForSurchargeType | null,
  registration_success: "",
  rate_info: null as any | null,
  booked_dates: null as Array<Array<{container_type: number | null, start_date: string, expiration_date: string}>> | null,
  edit_success: '',
  adding_rate_error: null,
  adding_popup_error: null,
  rate_transit_error: null
};

type InitialStateType = typeof initialState;
export const rateReducer = (
  state = initialState,
  action: commonRateActions
): InitialStateType => {
  switch (action.type) {
    case "SET_IS_FETCHING":
      return {
        ...state,
        isFetching: action.value
      }
    case "SET_CURRENT_SHIPPING_TYPE":
      return {
        ...state,
        current_shipping_type: action.current_type
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

    case "SET_FREIGHT_RATES_LIST":
      return {
        ...state,
        freight_rates_list: action.freight_rates_list,
      };
    case "SET_NEW_FREIGHT_RATE":
      return {
        ...state,
        freight_rates_list: [...state.freight_rates_list, action.freight_rate],
      };
    case "SET_EXISTING_SURCHARGE_BY_RATE":
      return {
        ...state,
        existing_surcharge: action.surcharge,
      };
    case "SET_EMPTY_EXISTING_SURCHARGE":
      return {
        ...state,
        empty_existing_surcharge: action.empty,
      };
    case "SET_ORIGIN_PORT_VALUE":
      return {
        ...state,
        origin_port_value: action.port_value,
      };
    case "SET_DESTINATION_PORT_VALUE":
      return {
        ...state,
        destination_port_value: action.port_value,
      };
    case "SET_RATE_START_DATE":
      return {
        ...state,
        rate_start_date: action.start_date,
      };
    case "SET_RATE_DATA_FOR_SURCHARGE":
      return {
        ...state,
        rate_data_for_surcharge: action.rate_data,
      };
    case "SET_REGISTRATION_SUCCESS":
      return {
        ...state,
        registration_success: action.success,
      };
    case "SET_RATE_INFO":
      return {
        ...state,
        rate_info: action.info,
      };
    case "EDIT_RATE_IS_ACTIVE":
      return {
        ...state,
        rate_info: {...state.rate_info, is_active: action.is_active}
      }
    case "SET_ACTIVE_OR_PAUSED":
      return {
        ...state,
        freight_rates_list: state.freight_rates_list.map((item: any) => {
          if (item.id === action.rate.id) {
            item.is_active = action.rate.is_active;
            return item;
          } else {
            return item;
          }
        }),
      };
    case "SET_BOOKED_DATES": {
      return {
        ...state,
        booked_dates: action.booked_dates
      }
    }
    case "SET_EDIT_RATE_SUCCESS": {
      return {
        ...state,
        edit_success: action.success
      }
    }
    case "SET_ADDING_POPUP_ERROR":
      debugger
      return {
        ...state,
        adding_popup_error: action.error
      }
    case "SET_ADDING_RATE_ERROR":
      return {
        ...state,
        adding_rate_error: action.error
      }
    case "SET_TRANSIT_ERROR":
      return {
        ...state,
       rate_transit_error: action.error
      }
    case "SET_EDITED_RATE_INFO":
      debugger
      return {
        ...state,
        rate_info: {...state.rate_info, rates: state.rate_info.rates.map((r: any) => {
            if (r.container_type && (r.container_type.id === action.value.container_type)) {
              return {
                ...r,
                rate: action.value.rate,
                start_date: action.value.start_date,
                expiration_date: action.value.expiration_date
              }
            } else if(!r.container_type) {
              return {
                ...r,
                rate: action.value.rate,
                start_date: action.value.start_date,
                expiration_date: action.value.expiration_date
              }
            } else {
              return r
            }
          })}
      }
    default:
      return state;
  }
};

type AC<T> = T extends { [key: string]: (...args: any[]) => infer U } ? U : never;
export type commonRateActions = AC<typeof rateActions>;

export const rateActions = {
  setIsFetching: (value: boolean) => ({type: 'SET_IS_FETCHING', value} as const),
  setCurrentShippingType: (current_type: CurrentShippingType) => ({type: 'SET_CURRENT_SHIPPING_TYPE', current_type} as const),
  setOriginPortsList: (ports: PortType[]) =>
    ({ type: "SET_ORIGIN_PORTS", ports } as const),
  setDestinationPortsList: (ports: PortType[]) =>
    ({ type: "SET_DESTINATION_PORTS", ports } as const),
  setCurrencyList: (list: CurrencyType[]) =>
    ({ type: "SET_CURRENCY_LIST", list } as const),
  setFreightRatesList: (freight_rates_list: any) =>
    ({ type: "SET_FREIGHT_RATES_LIST", freight_rates_list } as const),
  setNewFreightRate: (freight_rate: any) =>
    ({ type: "SET_NEW_FREIGHT_RATE", freight_rate } as const),
  setRegistrationSuccess: (success: string) =>
    ({ type: "SET_REGISTRATION_SUCCESS", success } as const),
  setExistingSurchargeByRate: (surcharge: any) =>
    ({ type: "SET_EXISTING_SURCHARGE_BY_RATE", surcharge } as const),
  setEmptyExistingSurcharge: (empty: string) =>
    ({ type: "SET_EMPTY_EXISTING_SURCHARGE", empty } as const),
  setOriginPortValue: (port_value: PortType | null) =>
    ({ type: "SET_ORIGIN_PORT_VALUE", port_value } as const),
  setDestinationPortValue: (port_value: PortType | null) =>
    ({ type: "SET_DESTINATION_PORT_VALUE", port_value } as const),
  setRateStartDate: (start_date: string) =>
    ({ type: "SET_RATE_START_DATE", start_date } as const),
  setRateDataForSurcharge: (rate_data: RateForSurchargeType) =>
    ({ type: "SET_RATE_DATA_FOR_SURCHARGE", rate_data } as const),
  setRateInfo: (info: RateInfoType | null) =>
    ({ type: "SET_RATE_INFO", info } as const),
  setRateIsActive: (is_active: boolean) => ({type: 'EDIT_RATE_IS_ACTIVE', is_active} as const),
  setCheckedFreight: (freight_rate: any) =>
    ({ type: "SET_CHECKED_FREIGHT_RATE", freight_rate } as const),
  setActiveOrPaused: (rate: any) =>
    ({ type: "SET_ACTIVE_OR_PAUSED", rate } as const),
  setBookedDates: (booked_dates: Array<Array<{container_type: number, start_date: string, expiration_date: string}>>) =>
      ({type: 'SET_BOOKED_DATES', booked_dates} as const),
  setEditSuccess: (success: string) => ({type: 'SET_EDIT_RATE_SUCCESS', success} as const),
  setAddingPopupError: (error: any) => ({type: 'SET_ADDING_POPUP_ERROR', error} as const),
  setAddingRateError: (error: any) => ({type: 'SET_ADDING_RATE_ERROR', error} as const),
  setTransitError: (error: any) => ({type: 'SET_TRANSIT_ERROR', error} as const),
  setEditedRateInfo: (value: any) => ({type: 'SET_EDITED_RATE_INFO', value} as const)
};
