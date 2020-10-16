

export type CurrencyType = {
    id: number,
    code: string
}
export type CarrierType = {
    id: number,
    title: string,
    shipping_type?: number
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
//post surcharge
export type SurchargeObjectType = {
    id: number,
    carrier: number | string,
    direction: string ,
    location: number | string,
    start_date: string,
    expiration_date: string,
    shipping_mode: number | string,
    shipping_type: string,
    usage_fees?: Usage_fee[],
    charges: ChargeType[]
}
//get surcharge
export type SurchargeInfoType = {
    id: number,
    carrier: CarrierType,
    direction: string ,
    location: LocationType,
    start_date: string,
    expiration_date: string,
    shipping_mode: ShippingModeType,
    shipping_type: string,
    usage_fees?: UsageFeeType[],
    charges: ChargesType[]
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

export type LocationType = {
    id: number,
    display_name: string,
    code: string,
    name: string
}

export type UsageFeeType = {
    charge: string,
    container_type: ContainerType[],
    currency: CurrencyType,
    date_updated: string,
    id: number,
    updated_by: string
}

export type ChargesType = {
    charge: string,
    additional_surcharge: AdditionalSurchargeType,
    currency: CurrencyType,
    date_updated: string,
    id: number,
    updated_by: string,
    conditions: string
}

export type PeriodType = {
    from: Date | string
    to: Date | string
}

export type CheckSurchargeDatesType = {
    carrier: CarrierType,
    direction: string ,
    location: LocationType,
    shipping_mode: ShippingModeType,
}

export type SurchargeCheckDateResponseType = Array<editDatesType>

export type editDatesType = {
    start_date: string,
    expiration_date: string
}

export type editHandlingType = {
    id: number,
    container_type: number,
    currency: number,
    charge: string | number,
    updated_by: string,
    date_updated: string
}

export type editChargesType = {
    id: number,
    additional_surcharge: number,
    conditions: string,
    currency: number,
    charge: string | number,
    updated_by: string,
    date_updated: string
}
