import {Conditions, ContainerType, CurrencyType, FeeType} from "../types/rates&surcharges/surchargesTypes";

export const directions = [
    {title: 'Import', id: 'import'},
    {title: 'Export', id: 'export'}
]


export const createDataContainer = (container_type: ContainerType, currency: CurrencyType[], charge: number) => {
    return { container_type, currency, charge};
}


export const createDataConditions = (name: FeeType, conditions: Conditions[], currency: CurrencyType[], charge: number) => {
    return { name, conditions, currency, charge};
}