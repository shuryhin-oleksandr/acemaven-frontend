
import {Dispatch} from "redux";
import {authAPI} from "../../_DAL/API/authAPI";
import {IAuthUserInfo} from "../types/authTypes";
import {profileSettingsAPI} from "../../_DAL/API/profileSettingsAPI";
import {CompanyInfoType} from "../types/profileSettingsType";
import {IAddNewBank, IAddNewUserData} from "../types/addNewUserTypes";


const initialState = {
    isFetching: false,
    authUserInfo: null as IAuthUserInfo | null,
    companyInfo: null as CompanyInfoType | null,
    banksList:  null as Array<IAddNewBank> | null,
    workersList: null as Array<IAddNewUserData> | null
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
        case "SET_BANKS_AFTER_DELETE":
            return {
                ...state,
                banksList: state.banksList && state.banksList.filter(b => b.id !== action.id)
            }
        case "SET_BANKS_AFTER_DEFAULT":
            return {
                ...state,
                banksList: state.banksList && state.banksList.map(b => {
                    if(b.id === action.bankId) {
                        return action.default_bank
                    } else {
                        return b
                    }
                })
            }
        case "SET_WORKERS_LIST":
            return {
                ...state,
                workersList: action.workersList
            }
        case "SET_NEW_TO_WORKERS_LIST":
            return {
                ...state,
                workersList: [...state.workersList, action.worker]
            }
        case "SET_EDITED_WORKER":
            return {
                ...state,
                workersList: state.workersList && state.workersList.map(w => {
                    if(w.id === action.id) {
                        return action.worker
                    } else {
                        return w
                    }
                })
            }
        case "SET_WORKERS_LIST_AFTER_DELETE":
            return {
                ...state,
                workersList: state.workersList && state.workersList.filter(w => w.id !== action.workerId)
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
    setBanksAfterDelete: (id: number) => ({type: 'SET_BANKS_AFTER_DELETE', id} as const),
    setWorkersList: (workersList: Array<IAddNewUserData>) => ({type: 'SET_WORKERS_LIST', workersList} as const),
    setNewToWorkersList: (worker: IAddNewUserData) => ({type: 'SET_NEW_TO_WORKERS_LIST', worker} as const),
    setEditedToWorkersList: (id: number, worker: IAddNewUserData) => ({type: 'SET_EDITED_WORKER', id, worker} as const),
    deleteWorker: (workerId: number) => ({type: 'SET_WORKERS_LIST_AFTER_DELETE', workerId} as const),
    setBanksAfterDefault: (bankId: number, default_bank: IAddNewBank) => ({type: 'SET_BANKS_AFTER_DEFAULT', bankId, default_bank} as const)
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


//company settings
export const getBankAccounts = () => {
    return async (dispatch: Dispatch<commonProfileActions>) => {
        try {
            dispatch(profileActions.setIsFetching(true))
            let res = await profileSettingsAPI.getBanksList()
            dispatch(profileActions.setBanksList(res.data))
            dispatch(profileActions.setIsFetching(false))
        } catch (e) {
            console.log('error', e.response)
            dispatch(profileActions.setIsFetching(false))
        }
    }
}
export const addBankAccount = ( bankData: IAddNewBank) => {
    return async (dispatch: Dispatch<commonProfileActions>) => {
        try {
            dispatch(profileActions.setIsFetching(true))
            let res = await profileSettingsAPI.addNewBank(bankData)
            dispatch(profileActions.setNewToBanksList(res.data))
            dispatch(profileActions.setIsFetching(false))
        } catch (e) {
            console.log('error', e.response)
            dispatch(profileActions.setIsFetching(false))
        }
    }
}

export const deleteBank = (bankId: number) => {
    return async (dispatch: Dispatch<any>) => {
        try {
            dispatch(profileActions.setIsFetching(true))
            let res = await profileSettingsAPI.deleteBank(bankId)
            res && dispatch(getBankAccounts())
            dispatch(profileActions.setIsFetching(false))
        } catch (e) {
            console.log('error', e.response)
            dispatch(profileActions.setIsFetching(false))
        }
    }
}
export const makeBankDefault = (bankId: number, changes: any) => {
    return async (dispatch: Dispatch<any>) => {
        try {
            dispatch(profileActions.setIsFetching(true))
            let res = await profileSettingsAPI.defaultBank(bankId, changes)
            res && dispatch(getBankAccounts())
            dispatch(profileActions.setIsFetching(false))
        } catch (e) {
            console.log('error', e.response)
            dispatch(profileActions.setIsFetching(false))
        }
    }
}

//user management
export const getWorkersList = () => {
    return async (dispatch: Dispatch<commonProfileActions>) => {
        try {
            dispatch(profileActions.setIsFetching(true))
            let res = await profileSettingsAPI.getWorkersList()
            dispatch(profileActions.setWorkersList(res.data))
            dispatch(profileActions.setIsFetching(false))
        } catch (e) {
            console.log('error', e.response)
            dispatch(profileActions.setIsFetching(false))
        }
    }
}
export const addNewWorker = ( workerData: IAddNewUserData) => {
    return async (dispatch: Dispatch<commonProfileActions>) => {
        try {
            dispatch(profileActions.setIsFetching(true))
            let res = await profileSettingsAPI.addNewWorker(workerData)
            dispatch(profileActions.setNewToWorkersList(res.data))
            dispatch(profileActions.setIsFetching(false))
        } catch (e) {
            console.log('error', e.response)
            dispatch(profileActions.setIsFetching(false))
        }
    }
}
export const editWorker = (workerId: number, workerData: IAddNewUserData) => {
    return async (dispatch: Dispatch<commonProfileActions>) => {
        try {
            dispatch(profileActions.setIsFetching(true))
            let res = await profileSettingsAPI.editWorker(workerId, workerData)
            dispatch(profileActions.setEditedToWorkersList(workerId, res.data))
            dispatch(profileActions.setIsFetching(false))
        } catch (e) {
            console.log('error', e.response)
            dispatch(profileActions.setIsFetching(false))
        }
    }
}
export const deleteWorker = (workerId: number) => {
    return async (dispatch: Dispatch<commonProfileActions>) => {
        try {
            dispatch(profileActions.setIsFetching(true))
            let res = await profileSettingsAPI.deleteWorker(workerId)
           res && dispatch(profileActions.deleteWorker(workerId))
            dispatch(profileActions.setIsFetching(false))
        } catch (e) {
            console.log('error', e.response)
            dispatch(profileActions.setIsFetching(false))
        }
    }
}




