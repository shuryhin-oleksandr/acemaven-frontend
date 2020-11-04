import {useSelector} from "react-redux";
import {AppStateType} from "../../store";

export const getCargoGroupsList = useSelector((state:AppStateType) => state.search.cargo_groups)
export const getWmCalculationSuccess = useSelector((state:AppStateType) => state.search.success_server_calc)
export const getEditableCargo = useSelector((state: AppStateType) => state.search.cargo_for_edit)