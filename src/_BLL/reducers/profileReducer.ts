import {IAdditionalUserCompleteData} from "../types/addNewUserTypes";


const initialState = {
    isFetching: false,
    userProfile : null as IAdditionalUserCompleteData | null
 }

 type InitialStateType = typeof initialState

 export const profileReducer = (state= initialState, action: commonProfileActions):InitialStateType => {
    switch (action.type) {
        case "SET_IS_FETCHING":
            return {
                ...state,
                isFetching: action.isFetching
            }
        case "SET_USER_PROFILE":
            return {
                ...state,
                userProfile: action.profileData
            }
        default: return state
    }
 }


type AC<T> = T extends { [key: string]: (...args: any[]) => infer U } ? U : never;
type commonProfileActions = AC<typeof profileActions>


export const profileActions = {
    setIsFetching: (isFetching: boolean) => ({type: 'SET_IS_FETCHING', isFetching} as const),
    setUserProfile: (profileData: IAdditionalUserCompleteData) => ({type: 'SET_USER_PROFILE', profileData}) as const
}