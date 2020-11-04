import instance from "./axiosConfig";
import {SearchDataType} from "../../_BLL/types/search/search_types";

export const searchAPI = {
    getWmCalculation (calculation_values: {weight: number, length: number, width: number, height: number,
                        shipping_type: string, weight_measurement: string, length_measurement: string, volume: number})
    {
        return instance.post('', calculation_values)
    },
    searchRates (search_data: SearchDataType) {
        return instance.post('', search_data)
    }

}
