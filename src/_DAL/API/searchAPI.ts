import instance from "./axiosConfig";
import {SearchDataType} from "../../_BLL/types/search/search_types";

export const searchAPI = {
    getWmCalculation (calculation_values: {weight: string, length: string, width: string, height: string,
                        shipping_type: string, weight_measurement: string, length_measurement: string, volume: number})
    {
        return instance.post('/booking/calculate/', calculation_values)
    },
    searchRates (search_data: SearchDataType) {
        return instance.post('booking/freight-rate/search/', search_data)
    },
    getFrozenChoices(){
        return instance.get("/core/choices/?models=frozen_choices")
    },
    getAllReviews (id: number) {
        return instance.get(`/core/company/${id}/reviews/`)
    },
    getPartners(){
        return instance.get("/core/company/partners/")
    }
}
