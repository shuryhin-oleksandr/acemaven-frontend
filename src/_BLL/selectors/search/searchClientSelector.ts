import {AppStateType} from "../../store";

export const getCargoGroupsList = ((state:AppStateType) => state.search.cargo_groups)
export const getWmCalculationSuccess = ((state:AppStateType) => state.search.success_server_calc)
export const getEditableCargo = ((state: AppStateType) => state.search.cargo_for_edit)
export const getFrozenChoicesSelector = ((state: AppStateType) => state.search.frozen_choices) || []