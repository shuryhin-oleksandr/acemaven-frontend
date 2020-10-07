export type CurrencyType = {
    id: number,
    code: string
}
export type CarrierType = {
    id: number,
    title: string,
    shipping_type: number
}
export type PortType = {
    id: number ,
    display_name: string,
    name: string,
    code: string
}

export type AdditionalSurchargeType = {
    id: number,
    title: string
}
export type ContainerType = {
    id: number,
    code: string
}
export type ShippingModeType = {
    id: number,
    title: string,
    additional_surcharges?: AdditionalSurchargeType[],
    container_types?: ContainerType[]
}
export type ShippingTypeType = {
    id: number,
    title: string,
    shipping_modes: ShippingModeType[]
}


type Usage_fee = {
    container_type: number,
    currency: number,
    charge: string | number
}

type ChargeType = {
    additional_surcharge: number,
    currency: number,
    charge: string | number,
    conditions?: string
}
export type SurchargeObjectType = {
    id: number,
    carrier: number | string,
    direction: string ,
    location: number | string,
    start_date: string,
    expiration_date: string,
    shipping_mode: number | string,
    usage_fees?: Usage_fee[],
    charges: ChargeType[]
}

//air mode
export type Conditions = {
    id: number,
    title: string,
    tooltip: string
}

export type FeeType = {
    id: number,
    title: string
}