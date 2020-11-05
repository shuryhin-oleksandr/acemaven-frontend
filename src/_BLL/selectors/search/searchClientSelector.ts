import {AppStateType} from "../../store";

export const getCargoGroupsListSelector = ((state:AppStateType) => state.search.cargo_groups)
export const getWmCalculationSuccessSelector = ((state:AppStateType) => state.search.success_server_calc)
export const getEditableCargo = ((state: AppStateType) => state.search.cargo_for_edit)