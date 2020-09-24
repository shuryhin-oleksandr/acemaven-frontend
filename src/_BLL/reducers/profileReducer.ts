
import {Dispatch} from "redux";
import {authAPI} from "../../_DAL/API/authAPI";
import {IAuthUserInfo} from "../types/authTypes";
import {profileSettingsAPI} from "../../_DAL/API/profileSettingsAPI";
import {CompanyInfoType} from "../types/profileSettingsType";
import {IAddNewBank} from "../types/addNewUserTypes";


const initialState = {
    isFetching: false,
    authUserInfo: null as IAuthUserInfo | null,
    companyInfo: null as CompanyInfoType | null,
    banksList:  null as Array<IAddNewBank> | null
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
        case "SET_BANKS_LIST":
            return {
                ...state,
                banksList: action.banksList
            }
        case "SET_NEW_TO_BANKS":
            return {
                ...state,
                banksList: [...state.banksList, action.bank]
            }
        case "SET_EDITED_BANK":
            return {
                ...state,
                banksList: state.banksList?.map(b => {
                    if(b.id === action.id) {
                        return action.bank
                    } else {
                        return b
                    }
                })
            }
        case "SET_BANKS_AFTER_DELETE":
            return {
                ...state,
                banksList: state.banksList?.filter(b => b.id !== action.id)
            }
        default: return state
    }
 }


type AC<T> = T extends { [key: string]: (...args: any[]) => infer U } ? U : never;
type commonProfileActions = AC<typeof profileActions>


export const profileActions = {
    setIsFetching: (isFetching: boolean) => ({type: 'SET_IS_FETCHING', isFetching} as const),
    setAuthUserInfo: (userInfo: IAuthUserInfo) => ({type: 'SET_AUTH_USER_INFO', userInfo} as const),
    setCompanyInfo: (companyInfo: CompanyInfoType) => ({type: 'SET_COMPANY_INFO', companyInfo} as const),
    setBanksList: (banksList: Array<IAddNewBank>) => ({type: 'SET_BANKS_LIST', banksList} as const),
    setNewToBanksList: (bank: IAddNewBank) => ({type: 'SET_NEW_TO_BANKS', bank} as const),
    setEditedBank: (id: number, bank: IAddNewBank) => ({type: 'SET_EDITED_BANK', id, bank} as const),
    setBanksAfterDelete: (id: number) => ({type: 'SET_BANKS_AFTER_DELETE', id} as const)
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

export const editCompanyInfo = (id: number, editData: CompanyInfoType) => {
    return async (dispatch: Dispatch<commonProfileActions>) => {
        try {
            dispatch(profileActions.setIsFetching(true))
            let res = await profileSettingsAPI.editCompanyInfoData(id, editData)
            dispatch(profileActions.setCompanyInfo(res.data))
            dispatch(profileActions.setIsFetching(false))
        } catch (e) {
            console.log('error', e.response)
            dispatch(profileActions.setIsFetching(false))
        }
    }
}

export const getBankAccounts = (id: number) => {
    return async (dispatch: Dispatch<commonProfileActions>) => {
        try {
            dispatch(profileActions.setIsFetching(true))
            let res = await profileSettingsAPI.getBanksList(id)
            dispatch(profileActions.setBanksList(res.data))
            dispatch(profileActions.setIsFetching(false))
        } catch (e) {
            console.log('error', e.response)
            dispatch(profileActions.setIsFetching(false))
        }
    }
}

export const addBankAccount = (id: number, bankData: IAddNewBank) => {
    return async (dispatch: Dispatch<commonProfileActions>) => {
        try {
            dispatch(profileActions.setIsFetching(true))
            let res = await profileSettingsAPI.addNewBank(id, bankData)
            dispatch(profileActions.setNewToBanksList(res.data))
            dispatch(profileActions.setIsFetching(false))
        } catch (e) {
            console.log('error', e.response)
            dispatch(profileActions.setIsFetching(false))
        }
    }
}
export const editBankAccount = (id: number, bankData: IAddNewBank) => {
    return async (dispatch: Dispatch<commonProfileActions>) => {
        try {
            dispatch(profileActions.setIsFetching(true))
            let res = await profileSettingsAPI.editBank(id, bankData)
            dispatch(profileActions.setEditedBank(id, res.data))
            dispatch(profileActions.setIsFetching(false))
        } catch (e) {
            console.log('error', e.response)
            dispatch(profileActions.setIsFetching(false))
        }
    }
}
export const deleteBankAccount = (bankId: number) => {
    return async (dispatch: Dispatch<commonProfileActions>) => {
        try {
            dispatch(profileActions.setIsFetching(true))
            let res = await profileSettingsAPI.deleteBank(bankId)
            res && dispatch(profileActions.setBanksAfterDelete(bankId))
            dispatch(profileActions.setIsFetching(false))
        } catch (e) {
            console.log('error', e.response)
            dispatch(profileActions.setIsFetching(false))
        }
    }
}



