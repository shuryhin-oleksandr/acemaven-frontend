import {AdditionalSurchargeType, ContainerType} from "./surchargesTypes";

export enum ShippingModeEnum {
    Loose_Cargo_RORO = 1,
    ULD = 2,
    FCL = 3,
    LCL = 4,
    Loose_Cargo = 5
}

export enum ShippingTypesEnum {
    SEA='sea',
    AIR='air'
}

export type CurrentShippingType = "air" | "sea"


export type ShippingModeType = {
    id: number,
    title: string,
    additional_surcharges?: AdditionalSurchargeType[],
    container_types?: ContainerType[]
}

export type ShippingType = {
    id: number,
    title: string,
    shipping_modes: ShippingModeType[]
}

