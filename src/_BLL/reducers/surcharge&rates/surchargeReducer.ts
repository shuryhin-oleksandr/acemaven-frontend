import {
    CarrierType,
    CurrencyType,
    PortType,
    ShippingModeType,
    ShippingTypeType, SurchargeInfoType, SurchargeObjectType
} from "../../types/rates&surcharges/surchargesTypes";


const initialState = {
    sea_carriers: null as CarrierType[] | null,
    air_carriers: null as CarrierType[] | null,
    shipping_modes: null as ShippingModeType[] | null,
    ports: null as PortType[] | null,
    shipping_type: null as ShippingTypeType[] | null,
    currency_list: null as CurrencyType[] | null,
    surcharges_list: null as SurchargeObjectType[] | null,
    surcharge_info: null as SurchargeInfoType | null,
    surchargeId: 0
}

type InitialStateType = typeof initialState

export const surchargeReducer = (state = initialState, action: commonSurchargeActions):InitialStateType => {
    switch (action.type) {
        case "SET_SEA_CARRIERS_LIST":
            return {
                ...state,
                sea_carriers: action.sea_carriers
            }
        case "SET_AIR_CARRIERS_LIST":
            return {
                ...state,
                air_carriers: action.air_carriers
            }
        case "SET_SHIPPING_MODES":
            return {
                ...state,
                shipping_modes: action.shipping_modes
            }
        case "SET_PORTS_LIST":
            return {
                ...state,
                ports: action.ports
            }
        case "SET_SHIPPING_TYPE":
            return {
                ...state,
                shipping_type: action.shipping_type
            }
        case "SET_CURRENCY_LIST":
            return {
                ...state,
                currency_list: action.list
            }
        case "SET_NEW_SURCHARGE":
            return {
                ...state,
                surcharges_list: [...state.surcharges_list, action.surcharge]
            }
        case "SET_SURCHARGES_LIST":
            return {
                ...state,
                surcharges_list: action.list
            }
        case "SET_SURCHARGE_INFO":
            return {
                ...state,
                surcharge_info: action.info
            }
        default: return state
    }
}

type AC<T> = T extends { [key: string]: (...args: any[]) => infer U } ? U : never;
export type commonSurchargeActions = AC<typeof surchargeActions>;

export const surchargeActions = {
    setSeaCarriersList: (sea_carriers: CarrierType[]) => ({type: 'SET_SEA_CARRIERS_LIST', sea_carriers} as const),
    setAirCarriersList: (air_carriers: CarrierType[]) => ({type: 'SET_AIR_CARRIERS_LIST', air_carriers} as const),
    setPortsList: (ports: PortType[]) => ({type: 'SET_PORTS_LIST', ports} as const),
    setShippingModeList: (shipping_modes: ShippingModeType[]) => ({type: 'SET_SHIPPING_MODES', shipping_modes} as const),
    setShippingType: (shipping_type: ShippingTypeType[]) => ({type: 'SET_SHIPPING_TYPE', shipping_type} as const),
    setCurrencyList: (list: CurrencyType[]) => ({type: 'SET_CURRENCY_LIST', list} as const),
    setNewSurcharge: (surcharge: SurchargeObjectType) => ({type: 'SET_NEW_SURCHARGE', surcharge} as const),
    setSurchargesList: (list: SurchargeObjectType[]) => ({type: 'SET_SURCHARGES_LIST', list} as const),
    setSurchargeInfo: (info: SurchargeInfoType) => ({type: 'SET_SURCHARGE_INFO', info} as const)
}