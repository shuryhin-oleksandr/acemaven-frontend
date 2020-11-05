import {Dispatch} from "redux";
import {commonSearchActions, searchActions} from "../../reducers/search_client/searchClientReducer";
import {CargoGroupType, SearchDataType} from "../../types/search/search_types";
import {searchAPI} from "../../../_DAL/API/searchAPI";
import {AppStateType} from "../../store";

export const getWMCalculationThunk = (data: CargoGroupType) => {
    return async (dispatch: Dispatch<commonSearchActions>, getState: () => AppStateType) => {
        try {
            debugger
            let res = await searchAPI.getWmCalculation(
                {width: data.width, length: data.length, height: data.length,
                                weight: data.weight, shipping_type: String(data.shipping_type),
                                length_measurement: data.length_measurement,
                                weight_measurement: data.weight_measurement,
                                volume: data.volume}
                )
            console.log('group', {
                ...data,
                /*// @ts-ignore
                 //id:  getState().search.cargo_groups.length  ? (getState().search.cargo_groups.length === 0 ? getState().search.cargo_groups.length) + 1 : 0,*/
                total_per_one: res.data.total_per_one,
                total_wm: res.data.total
            })
            let data_cargo = {...data, total_per_pack: res.data.total_per_pack, total_wm: res.data.total}
            dispatch(searchActions.setCargoGroupData(data_cargo))
            dispatch(searchActions.setSuccessCalculate(true))
        } catch (e) {
            console.log(e.response);
        }
    };
};

export const searchRatesOffersThunk = (search_data: SearchDataType) => {
    return async (dispatch: Dispatch<commonSearchActions>) => {
        try {
            let res = await searchAPI.searchRates(search_data)
            res.data && dispatch(searchActions.setSearchResult(res.data))
        } catch (e) {
            console.log(e.response)
        }
    }
}



