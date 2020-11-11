import instance from "../../axiosConfig";
import {SearchDataType} from "../../../../_BLL/types/search/search_types";

export const quotesClientAPI = {
    getQuotes () {
        return instance.get('')
    },
    activateQuote (id: number, is_active: boolean) {
        return instance.patch('', {is_active: is_active})
    },
    filterSortClientQuotes (type: string, field_name: string, search_column: string, search_value: string) {
        return instance.get(`/.../?shipping_type=${type}&ordering=${field_name}&${search_column}=${search_value}`)
    },
    deleteQuoteFromClientList (id: number) {
        return instance.delete('')
    },
    postSearchQuote(data:SearchDataType) {
        console.log("data", data);
        // return instance.post('', data);
    }

};