import {AppStateType} from "../../store";

export const getCargoGroupsListSelector = ((state:AppStateType) => state.search.cargo_groups)
export const getWmCalculationSuccessSelector = ((state:AppStateType) => state.search.success_server_calc)
export const getEditableCargoSelector = ((state: AppStateType) => state.search.cargo_for_edit)
export const getFrozenChoicesSelector = ((state: AppStateType) => state.search.frozen_choices) || []