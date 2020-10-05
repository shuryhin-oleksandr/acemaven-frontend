import {CarrierType, PortType, ShippingModeType, ShippingTypeType} from "../../types/rates&surcharges/surchargesTypes";


const initialState = {
    sea_carriers: null as CarrierType[] | null,
    air_carriers: null as CarrierType[] | null,
    shipping_modes: null as ShippingModeType[] | null,
    ports: null as PortType[] | null,
    shipping_type: null as ShippingTypeType[] | null
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
    setShippingType: (shipping_type: ShippingTypeType[]) => ({type: 'SET_SHIPPING_TYPE', shipping_type} as const)
}