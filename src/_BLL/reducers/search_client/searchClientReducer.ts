import {CargoGroupType} from "../../types/search/search_types";


const initialState = {
    cargo_groups: null as CargoGroupType[] | null,
    cargo_for_edit: null as CargoGroupType | null,
    success_server_calc: false,
    search_result: null as any | null
}

type InitialStateType = typeof initialState;

export const searchClientReducer = (state = initialState, action: commonSearchActions):InitialStateType => {
    switch (action.type) {
        case "SET_CARGO_GROUP":{
            return {
                ...state,
                cargo_groups: [...state.cargo_groups, action.cargo_data]
            }
        }
        case "DELETE_CARGO_GROUP": {
            return {
                ...state,
                cargo_groups: state.cargo_groups && state.cargo_groups.filter(c => c.id !== action.id)
            }
        }
        case "EDIT_CARGO_GROUP": {
            return {
                ...state,
                //@ts-ignore
                cargo_for_edit: state.cargo_groups?.find(c => c.id === action.id)
            }
        }
        case "SET_SUCCESS_CALCULATE": {
            return {
                ...state,
                success_server_calc: action.value
            }
        }
        case "SET_SEARCH_RESULT": {
            return {
                ...state,
                search_result: [...state.search_result, action.result]
            }
        }
        default: return state
    }
}


type AC<T> = T extends { [key: string]: (...args: any[]) => infer U } ? U : never;

export type commonSearchActions = AC<typeof searchActions>;

export const searchActions = {
    setCargoGroup: (cargo_data: CargoGroupType) => ({ type: "SET_CARGO_GROUP", cargo_data } as const),
    setSuccessCalculate: (value: boolean) => ({type:'SET_SUCCESS_CALCULATE', value} as const),
    deleteCargoGroup: (id: number) => ({type: 'DELETE_CARGO_GROUP', id} as const),
    editCargoGroup: (id: number) => ({type: 'EDIT_CARGO_GROUP', id} as const),
    setSearchResult: (result: any) => ({type: 'SET_SEARCH_RESULT', result} as const)
};
