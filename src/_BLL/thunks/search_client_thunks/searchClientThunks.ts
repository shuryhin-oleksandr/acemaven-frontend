import { Dispatch } from "redux";
import {
  commonSearchActions,
  searchActions,
} from "../../reducers/search_client/searchClientReducer";
import {
  CargoGroupType,
  SearchDataType,
} from "../../types/search/search_types";
import { searchAPI } from "../../../_DAL/API/searchAPI";
import { AppStateType } from "../../store";



export const getWMCalculationThunk = (data: CargoGroupType) => {
    return async (dispatch: Dispatch<commonSearchActions>, getState: () => AppStateType) => {
        try {
            let mode = getState().search.edit_mode
            let res = await searchAPI.getWmCalculation(
                {width: data.width, length: data.length, height: data.length,
                    weight: data.weight, shipping_type: String(data.shipping_type),
                    length_measurement: data.length_measurement,
                    weight_measurement: data.weight_measurement,
                    volume: data.volume}
            )
            console.log('mode', mode);
            console.log('res', res)
            if(!mode) {
                console.log('!mode')
                let id_cargo = getState().search.cargo_groups?.length + 1
                let data_cargo = {
                    ...data,
                    total_per_pack: res.data.total_per_pack,
                    total_wm: res.data.total,
                    id: id_cargo,
                    description: ''
                }
                console.log('id_cargo', id_cargo);
                console.log(data_cargo)
                // dispatch(searchActions.setCargoGroupData(data_cargo))
            } else {
                console.log('mode')
                dispatch(searchActions.editChosenCargoGroup({...data, total_per_pack: res.data.total_per_pack, total_wm: res.data.total}))
            }
            dispatch(searchActions.setSuccessCalculate(true))
        } catch (e) {
            console.log(e.response);
        }
    };
};

export const searchRatesOffersThunk = (search_data: SearchDataType) => {
  return async (dispatch: Dispatch<commonSearchActions>) => {
    try {
      let res = await searchAPI.searchRates(search_data);
      console.log('search', res.data)
      dispatch(searchActions.setSearchSuccess(true))
      dispatch(searchActions.setSearchResult(res.data));
    } catch (e) {
      console.log(e);
      console.log('server_errors', e.response);
    }
  };
};

export const getFrozenChoices = () => {
  return async ( dispatch: Dispatch<commonSearchActions> ) => {
      try{
          let res = await searchAPI.getFrozenChoices();
          dispatch(searchActions.setFrozenChoices(res.data))
      }catch (e){
          console.log(e.response)
      }
    };
};

export const getCompanyRatingThunk = (id: number) => {
    return async ( dispatch: Dispatch<commonSearchActions> ) => {
        try {
            dispatch(searchActions.setIsFetching(true))
            let res = await searchAPI.getAllReviews(id)
            dispatch(searchActions.setSearchedCompanyRating(res.data))
            dispatch(searchActions.setIsFetching(false))
        } catch (e) {
            dispatch(searchActions.setIsFetching(false))
            console.log(e)
        }

    }
}

export const getPartnersThunk = () => {
    return async (dispatch: Dispatch<commonSearchActions>) => {
        try{
            let res = await searchAPI.getPartners();
            dispatch(searchActions.setPartners(res.data));
        }catch (e) {
            console.log(e)
        }

    }
}
