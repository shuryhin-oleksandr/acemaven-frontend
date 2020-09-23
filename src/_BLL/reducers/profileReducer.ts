
import {Dispatch} from "redux";
import {authAPI} from "../../_DAL/API/authAPI";
import {IAuthUserInfo} from "../types/authTypes";
import {profileSettingsAPI} from "../../_DAL/API/profileSettingsAPI";
import {CompanyInfoType} from "../types/profileSettingsType";


const initialState = {
    isFetching: false,
    authUserInfo: null as IAuthUserInfo | null,
    companyInfo: null as CompanyInfoType | null
 }

 type InitialStateType = typeof initialState

 export const profileReducer = (state= initialState, action: commonProfileActions):InitialStateType => {
    switch (action.type) {
        case "SET_IS_FETCHING":
            return {
                ...state,
                isFetching: action.isFetching
            }
        case "SET_AUTH_USER_INFO":
            return {
                ...state,
                authUserInfo: action.userInfo
            }
        case "SET_COMPANY_INFO":
            return {
                ...state,
                companyInfo: action.companyInfo
            }
        default: return state
    }
 }


type AC<T> = T extends { [key: string]: (...args: any[]) => infer U } ? U : never;
type commonProfileActions = AC<typeof profileActions>


export const profileActions = {
    setIsFetching: (isFetching: boolean) => ({type: 'SET_IS_FETCHING', isFetching} as const),
    setAuthUserInfo: (userInfo: IAuthUserInfo) => ({type: 'SET_AUTH_USER_INFO', userInfo} as const),
    setCompanyInfo: (companyInfo: CompanyInfoType) => ({type: 'SET_COMPANY_INFO', companyInfo} as const)
}

export const getAuthUserInfo = () => {
    return async (dispatch: Dispatch<commonProfileActions>) => {
        try {
            dispatch(profileActions.setIsFetching(true))
            let res = await authAPI.getAuthUser()
            dispatch(profileActions.setAuthUserInfo(res.data))
            sessionStorage.setItem('u', JSON.stringify(res.data.companies[0].id))
            dispatch(profileActions.setIsFetching(false))
        } catch (e) {

            console.log('error', e.response)
            dispatch(profileActions.setIsFetching(false))
        }
    }
}

export const editProfileInfo = (id: number, data: IAuthUserInfo) => {
    return async (dispatch: Dispatch<commonProfileActions>) => {
        try {
            dispatch(profileActions.setIsFetching(true))
            let res = await profileSettingsAPI.editProfile(id, data)
            dispatch(profileActions.setAuthUserInfo(res.data))
            dispatch(profileActions.setIsFetching(false))
        } catch (e) {

            console.log('error', e.response)
            dispatch(profileActions.setIsFetching(false))
        }
    }
}

export const getCompanyInfo = (id: number) => {
    return async (dispatch: Dispatch<commonProfileActions>) => {
        try {
            dispatch(profileActions.setIsFetching(true))
            let res = await profileSettingsAPI.getCompanyInfo(id)
            dispatch(profileActions.setCompanyInfo(res.data))
            dispatch(profileActions.setIsFetching(false))
        } catch (e) {
            console.log('error', e.response)
            dispatch(profileActions.setIsFetching(false))
        }
    }
}
