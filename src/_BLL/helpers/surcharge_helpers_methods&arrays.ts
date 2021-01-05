import {Conditions, ContainerType, CurrencyType, FeeType} from "../types/rates&surcharges/surchargesTypes";

export const directions = [
    {title: 'Import', id: 'import'},
    {title: 'Export', id: 'export'}
]

export const currency = [{id: 37, code: 'BRL'}, {id: 43, code: 'USD'}, {id: 98, code: 'EUR'}]
export enum CurrencyEnum {
    'USD' = 43,
    'EUR' = 98,
    "BRL" = 37
}

export const conditions =  [{id: 1, title: 'w/m', tooltip: 'This option will indicate that the charge will be calculated by the chargeable weight (chargable_weight/m) of the cargo.', displayName:"W/M"},
    {id: 2, title: 'per_weight', tooltip: 'Will be calculated by the weight of the cargo.', displayName: "Per weight"},
    {id: 3, title: 'per_no_of_packs', tooltip: 'As opposed to the previous option, it will consider the charge by the number of packs in the shipment/client’s search_client_thunks.', displayName: "Per no. of packs"},
    {id: 4, title: 'fixed', tooltip: 'This means that the value indicated will be considered once in the shipment.', displayName: "Fixed"}];

export const createDataContainer = (container_type: ContainerType, currency: CurrencyType[], charge: number) => {
    return { container_type, currency, charge};
}

export const createDataConditions = (name: FeeType, conditions: Conditions[], currency: CurrencyType[], charge: number) => {
    return { name, conditions, currency, charge};
}