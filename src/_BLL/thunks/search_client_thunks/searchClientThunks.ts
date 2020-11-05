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
  return async (
    dispatch: Dispatch<commonSearchActions>,
    getState: () => AppStateType
  ) => {
    try {
      let res = await searchAPI.getWmCalculation({
        width: data.width,
        length: data.length,
        height: data.length,
        weight: data.weight,
        shipping_type: String(data.shipping_type),
        length_measurement: data.length_measurement,
        weight_measurement: data.weight_measurement,
        volume: data.volume,
      });
      res.data &&
        dispatch(
          searchActions.setCargoGroup({
            ...data,
            id: getState().search.cargo_groups
                // @ts-ignore
              ? getState().search.cargo_groups?.length + 1
              : 0,
            //one_box_wm: res.data,
            total_wm: res.data,
          })
        );
      dispatch(searchActions.setSuccessCalculate(true));
    } catch (e) {
      console.log(e.response);
    }
  };
};

export const searchRatesOffersThunk = (search_data: SearchDataType) => {
  return async (dispatch: Dispatch<commonSearchActions>) => {
    try {
      let res = await searchAPI.searchRates(search_data);
      res.data && dispatch(searchActions.setSearchResult(res.data));
    } catch (e) {
      console.log(e.response);
    }
  };
};

export const getFrozenChoices = () => {
  return async(dispatch: Dispatch<commonSearchActions>)=>{
      try{
          let res = await searchAPI.getFrozenChoices();
          dispatch(searchActions.setFrozenChoices(res.data))
      }catch (e){
          console.log(e.response)
      }
    };
};
