import {Dispatch} from "redux";
import {authAPI} from "../../_DAL/API/authAPI";
import {ICompanySignUpData, ILoginData, IMasterAccountData} from "../types/authTypes";
import {IAddNewBank, IAddNewUserData} from "../types/addNewUserTypes";


const initialState:InitialStateType = {
    isAuth: false,
    isFetching: false,
    employees: [],
    banksAccounts: [],
    signedCompanyData: null,
    companySignUpError: '',
    checkTokenError: '',
    signUpMasterError: '',
    addingEmployeeError: '',
    addingBankError: ''
}

type InitialStateType = {
    isFetching: boolean,
    isAuth: boolean,
    employees: Array<IAddNewUserData>,
    banksAccounts: Array<IAddNewBank>
    signedCompanyData: ICompanySignUpData | null,
    checkTokenError: string,
    companySignUpError: string,
    addingEmployeeError: string,
    addingBankError: string,
    signUpMasterError: string

}

export const authReducer = (state = initialState, action: commonAuthActions) :InitialStateType => {
    switch(action.type) {
        case "SET_IS_LOADING":
            return {
               ...state,
                isFetching: action.isFetching
            }
        case "SET_AUTH_USER":
            return {
                ...state,
                isAuth: action.isAuth
            }
        case "SET_COMPANY_SIGNUP_ERROR":
            return {
                ...state,
                companySignUpError: action.error
            }
        case "SET_CHECK_TOKEN_ERROR":
            return {
                ...state,
                checkTokenError: action.error
            }
        case "SET_MASTER_SIGNUP_ERROR":
            return {
                ...state,
                signUpMasterError: action.error
            }
        case "SET_EMPLOYEE":
            return {
                ...state,
                employees: [...state.employees, action.data]
            }
        case "SET_ADDING_EMPLOYEE_ERROR":
            return {
                ...state,
                addingEmployeeError: action.error
            }
        case "SET_BANK":
            return {
                ...state,
                banksAccounts: [...state.banksAccounts, action.bankData]
            }
        case "SET_ADDING_BANK_ERROR":
            return {
                ...state,
                addingBankError: action.error
            }
        default: return state
    }
}

type AC<T> = T extends { [key: string]: (...args: any[]) => infer U } ? U : never;
type commonAuthActions = AC<typeof authActions>

export const authActions = {
    setAuthUser: (isAuth:boolean) => ({type: 'SET_AUTH_USER', isAuth} as const),
    setIsLoading: (isFetching: boolean) => ({type: 'SET_IS_LOADING', isFetching} as const),
    setSignedCompanyData: (data:ICompanySignUpData) => ({type: 'SET_SIGNED_COMPANY_DATA', data} as const),
    setCompanySignupError: (error: string) => ({type: 'SET_COMPANY_SIGNUP_ERROR', error} as const), //for phone & email check errors
    setCheckTokenError: (error: string) => ({type: 'SET_CHECK_TOKEN_ERROR', error} as const), //for check token error
    setMasterSignUpError: (error: string) => ({type: 'SET_MASTER_SIGNUP_ERROR', error} as const), //for password error
    setEmployee: (data: IAddNewUserData) => ({type: 'SET_EMPLOYEE', data} as const),
    setBank: (bankData: IAddNewBank) => ({type: 'SET_BANK', bankData} as const),
    setAddingBankError: (error: string) => ({type: 'SET_ADDING_BANK_ERROR', error} as const),
    setAddingEmployeeError: (error: string) => ({type: 'SET_ADDING_EMPLOYEE_ERROR', error} as const)
}


export const signIn = (loginData: ILoginData) => {
    return async (dispatch: Dispatch<commonAuthActions>) => {
        try {
            let res = await authAPI.signIn(loginData)
            console.log(res)
        } catch (e) {
            console.log(e)
        }
    }
}

export const companySignUp = (data: ICompanySignUpData) => {
    return async (dispatch: Dispatch<commonAuthActions>) => {
        try {
            dispatch(authActions.setIsLoading(true))
            let res = await authAPI.signUpCompany(data)
            console.log('1', res.data)
            dispatch(authActions.setSignedCompanyData(res.data))
            dispatch(authActions.setIsLoading(false))
        } catch (e) {
            console.log(e.response)

            dispatch(authActions.setIsLoading(false))
        }
    }
}

export const checkToken = (token: string) => {
    return async (dispatch: Dispatch<commonAuthActions>) => {
        try {
            dispatch(authActions.setIsLoading(true))
            let res = await authAPI.verifyToken(token)
            console.log('2', res.data)
            dispatch(authActions.setSignedCompanyData(res.data))
            res.data && dispatch(authActions.setIsLoading(false))
        } catch (e) {
            console.log(e.response)
            dispatch(authActions.setCheckTokenError(e.response))
            dispatch(authActions.setIsLoading(false))
        }
    }
}

export const masterAccountSignUp = (data: IMasterAccountData, token: string) => {
    return async (dispatch: Dispatch<commonAuthActions>) => {
        try {
            let res = await authAPI.createMasterAccount(data, token)
            localStorage.setItem('access_token', res.data.token)
            res.data && (window.location.href = '/create/user')
            console.log('M', res.data)
        } catch (e) {
            console.log(e.response)
        }
    }
}

export const addEmployee = (data: IAddNewUserData) => {
    return async (dispatch: Dispatch<commonAuthActions>) => {
        try {
            let res = await authAPI.addEmployee(data)
            dispatch(authActions.setEmployee(res.data))
            console.log(res.data)
            console.log('E', res.data)
        } catch (e) {
            console.log(e.response)
        }
    }
}

export const addBank = (data: IAddNewBank) => {
    return async (dispatch: Dispatch<commonAuthActions>) => {
        try {
            let res = await authAPI.addBankAccount(data)
            dispatch(authActions.setBank(res.data))
            console.log('B', res.data)
        } catch (e) {

            console.log(e.response)
        }
    }
}

