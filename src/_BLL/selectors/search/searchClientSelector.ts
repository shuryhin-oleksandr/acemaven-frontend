import {AppStateType} from "../../store";

export const getSearchIsFetching = ((state: AppStateType) => state.search.isFetching)
export const getCargoGroupsListSelector = ((state:AppStateType) => state.search.cargo_groups)
export const getWmCalculationSuccessSelector = ((state:AppStateType) => state.search.success_server_calc)
export const getEditableCargoSelector = ((state: AppStateType) => state.search.cargo_for_edit)
export const getFrozenChoicesSelector = ((state: AppStateType) => state.search.frozen_choices)
export const getSearchResult = (state: AppStateType) => state.search.search_result
export const getSearchSuccess = (state: AppStateType) => state.search.search_success
export const duplicatesError = (state: AppStateType) => state.search.duplicates_error
export const getSearchedCompanyRatingSelector = (state: AppStateType) => state.search.rating_company_data