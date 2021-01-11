import {
    CargoGroupType,
    FrozenChoiceType,
    ChoiceType,
    SearchResultType, RatingCompanyType
} from "../../types/search/search_types";


const initialState = {
    cargo_groups: [] as CargoGroupType[] ,
    edit_mode: false,
    cargo_for_edit: null as CargoGroupType | null,
    success_server_calc: false,
    search_result: [] as SearchResultType[],
    search_success: false,
    frozen_choices: [] as ChoiceType[],
    duplicates_error: '',
    rating_company_data: null as RatingCompanyType | null
}

type InitialStateType = typeof initialState;

export const searchClientReducer = (state = initialState, action: commonSearchActions):InitialStateType => {
   switch (action.type) {
       case "SET_CARGO_GROUP_DATA":
           return {
               ...state,
               cargo_groups: [...state.cargo_groups, action.cargo_data]
           }
       case "CLEAR_CARGO_LIST":
           return {
               ...state,
               cargo_groups: action.value
           }
       case "DELETE_CARGO_GROUP":
           return {
               ...state,
               cargo_groups: state.cargo_groups && state.cargo_groups.filter(c => c.id !== action.id)
           }
       case "SET_EDIT":
           return {
               ...state,
               edit_mode: action.edit_mode
           }
       case "SET_EDITABLE_CARGO_GROUP":
           return {
               ...state,
               //@ts-ignore
               cargo_for_edit: state.cargo_groups?.find(c => c.id === action.id)
           }
       case "EDIT_CHOSEN_CARGO_GROUP":
           return {
               ...state,
               //@ts-ignore
               cargo_groups: state.cargo_groups.map(c => {
                   return c.id === action.edit_data.id ? action.edit_data : c
               })
           }
       case "SET_EDITABLE_CARGO_TO_NULL":
           return {
               ...state,
               cargo_for_edit: action.value
           }
       case "SET_SUCCESS_CALCULATE":
           return {
               ...state,
               success_server_calc: action.value
           }
       case "SET_SEARCH_RESULT":
           return {
               ...state,
               search_result: action.result
           }
       case "SET_SEARCH_SUCCESS":
           return {
               ...state,
               search_success: action.value
           }
       case "SET_FROZEN_CHOICES": {
           return {
               ...state,
               frozen_choices: action.choices.frozen_choices
           }
       }
       case "SET_DUPLICATED_ERROR":
           return {
               ...state,
               duplicates_error: action.error
           }
       case "SET_SEARCHED_COMPANY_RATING":
           return {
               ...state,
               rating_company_data: action.rating_data
           }
       default: return state
   }
}

type AC<T> = T extends { [key: string]: (...args: any[]) => infer U } ? U : never;
export type commonSearchActions = AC<typeof searchActions>;

export const searchActions = {
    clearCargoList: (value: any) => ({type: 'CLEAR_CARGO_LIST', value} as const),
    setCargoGroupData: (cargo_data: CargoGroupType ) => ({ type: "SET_CARGO_GROUP_DATA", cargo_data } as const),
    setSuccessCalculate: (value: boolean) => ({type:'SET_SUCCESS_CALCULATE', value} as const),
    deleteCargoGroup: (id: number) => ({type: 'DELETE_CARGO_GROUP', id} as const),
    setEdit: (edit_mode: boolean) => ({type: 'SET_EDIT', edit_mode} as const),
    setEditableCargoGroup: (id: number) => ({type: 'SET_EDITABLE_CARGO_GROUP', id} as const),
    editChosenCargoGroup: (edit_data: CargoGroupType) => ({type: 'EDIT_CHOSEN_CARGO_GROUP', edit_data} as const),
    setEditableCargoGroupToNull: (value: any) => ({type: 'SET_EDITABLE_CARGO_TO_NULL', value} as const),
    setSearchResult: (result: SearchResultType[]) => ({type: 'SET_SEARCH_RESULT', result} as const),
    setSearchSuccess: (value: boolean) => ({type: 'SET_SEARCH_SUCCESS', value} as const),
    setFrozenChoices:(choices:FrozenChoiceType)=>({type:"SET_FROZEN_CHOICES", choices} as const),
    setDuplicatedError: (error: string) => ({type: 'SET_DUPLICATED_ERROR', error} as const),
    setSearchedCompanyRating: (rating_data: RatingCompanyType | null) => ({type: 'SET_SEARCHED_COMPANY_RATING', rating_data} as const )
};
