import {Dispatch} from "redux";
import {authAPI} from "../../_DAL/API/authAPI";
import {ICompanySignUpData, ICompanySignUpError, ILoginData, IMasterAccountData} from "../types/authTypes";
import {IAddNewBank, IAddNewUserData} from "../types/addNewUserTypes";
import {History} from "history";


const initialState:InitialStateType = {
    isAuth: false,
    isFetching: false,
    loginError: '',
    employees: [],
    banksAccounts: [],
    signedCompanyData: null,
    companySignUpError: null,
    checkTokenError: '',
    signUpMasterError: '',
    addingEmployeeError: '',
    addingBankError: ''
}

type InitialStateType = {
    isFetching: boolean,
    isAuth: boolean,
    loginError: string,
    employees: Array<IAddNewUserData>,
    banksAccounts: Array<IAddNewBank>
    signedCompanyData: ICompanySignUpData | null,
    checkTokenError: string,
    companySignUpError: ICompanySignUpError | null,
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
        case "SET_LOGIN_ERROR":
            return {
                ...state,
                loginError: action.error
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
        case "SET_EMPLOYEES_LIST":
            return {
                ...state,
                employees: action.list
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
        case "SET_BANKS_LIST":
            return {
                ...state,
                banksAccounts: action.list
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
    setLoginError: (error: string) => ({type: 'SET_LOGIN_ERROR', error} as const),
    setSignedCompanyData: (data:ICompanySignUpData) => ({type: 'SET_SIGNED_COMPANY_DATA', data} as const),
    setCompanySignupError: (error: ICompanySignUpError) => ({type: 'SET_COMPANY_SIGNUP_ERROR', error} as const), //for phone & email check errors
    setCheckTokenError: (error: string) => ({type: 'SET_CHECK_TOKEN_ERROR', error} as const), //for check token error
    setMasterSignUpError: (error: string) => ({type: 'SET_MASTER_SIGNUP_ERROR', error} as const), //for password error
    setEmployeesList: (list: Array<IAddNewUserData>) => ({type: 'SET_EMPLOYEES_LIST', list} as const),
    setEmployee: (data: IAddNewUserData) => ({type: 'SET_EMPLOYEE', data} as const),
    setBankList: (list: Array<IAddNewBank>) => ({type: 'SET_BANKS_LIST', list} as const),
    setBank: (bankData: IAddNewBank) => ({type: 'SET_BANK', bankData} as const),
    setAddingBankError: (error: string) => ({type: 'SET_ADDING_BANK_ERROR', error} as const),
    setAddingEmployeeError: (error: string) => ({type: 'SET_ADDING_EMPLOYEE_ERROR', error} as const)
}


export const signIn = (loginData: ILoginData, history: History) => {
    return async (dispatch: Dispatch<commonAuthActions>) => {
        try {
            dispatch(authActions.setIsLoading(true))
            let res = await authAPI.signIn(loginData)
            localStorage.setItem('access_token', res.data.token)
            res.data && (history.push('/create/user'))
            dispatch(authActions.setIsLoading(false))
        } catch (e) {
            dispatch(authActions.setLoginError(e.response.data.non_field_errors[0]))
            console.log('error', e.response.data.non_field_errors[0])
            dispatch(authActions.setIsLoading(false))
        }
    }
}

export const getAuthUserInfo = () => {
    return async (dispatch: Dispatch<commonAuthActions>) => {
        try {
            dispatch(authActions.setIsLoading(true))
            let token = localStorage.getItem('access_token')
            if(token !== null) {
                let res = await authAPI.getAuthUser(token)
                console.log('getAuth', res.data)
            }
            dispatch(authActions.setIsLoading(false))
        } catch (e) {

            console.log('error', e.response)
            dispatch(authActions.setIsLoading(false))
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
            dispatch(authActions.setCompanySignupError(e.response.data))
            console.log('error', e.response)
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
            console.log('error', e.response)
            dispatch(authActions.setCheckTokenError(e.response))
            dispatch(authActions.setIsLoading(false))
        }
    }
}

export const masterAccountSignUp = (data: IMasterAccountData, token: string, history: History) => {
    return async (dispatch: Dispatch<commonAuthActions>) => {
        try {
            dispatch(authActions.setIsLoading(true))
            let res = await authAPI.createMasterAccount(data, token)
            localStorage.setItem('access_token', res.data.token)
            res.data && (history.push('/create/user'))
            console.log('M', res.data)
            dispatch(authActions.setIsLoading(false))
        } catch (e) {
            console.log('error', e.response)
            dispatch(authActions.setIsLoading(false))
        }
    }
}

export const getEmployees = () => {
    return async (dispatch:Dispatch<commonAuthActions>) => {
        try {
            dispatch(authActions.setIsLoading(true))
            let res = await authAPI.getEmployeesList()
            dispatch(authActions.setEmployeesList(res.data))
            dispatch(authActions.setIsLoading(false))
        } catch (e) {
            console.log('error', e.response.data)
            dispatch(authActions.setIsLoading(false))
        }
    }
}

export const addEmployee = (data: IAddNewUserData) => {
    return async (dispatch: Dispatch<commonAuthActions>) => {
        try {
            dispatch(authActions.setIsLoading(true))
            let res = await authAPI.addEmployee(data)
            dispatch(authActions.setEmployee(res.data))

            dispatch(authActions.setIsLoading(false))
        } catch (e) {
            dispatch(authActions.setAddingEmployeeError(`User with this email already exists`))
            dispatch(authActions.setIsLoading(false))
        }
    }
}
export const deleteEmployee = (id: number) => {
    return async (dispatch: Dispatch<commonAuthActions>) => {
        try {
            dispatch(authActions.setIsLoading(true))
            let res = await authAPI.deleteEmployer(id)
            console.log(res.data)
            dispatch(authActions.setIsLoading(false))
        } catch(e) {
            console.log('error', e.response)
            dispatch(authActions.setIsLoading(false))
        }
    }
}


export const getBanksList = () => {
    return async (dispatch: Dispatch<commonAuthActions>) => {
        try {
            dispatch(authActions.setIsLoading(true))
            let res = await authAPI.getBanksAccountsList()
            console.log(res.data)
            dispatch(authActions.setIsLoading(false))
        } catch (e) {
            console.log(e.response)
            dispatch(authActions.setIsLoading(false))
        }
    }
}

export const addBank = (data: IAddNewBank) => {
    return async (dispatch: Dispatch<commonAuthActions>) => {
        try {
            dispatch(authActions.setIsLoading(true))
            let res = await authAPI.addBankAccount(data)
            dispatch(authActions.setBank(res.data))
            console.log('B', res.data)
            dispatch(authActions.setIsLoading(false))
        } catch (e) {
            console.log('error', e.response)
            dispatch(authActions.setIsLoading(false))
        }
    }
}

export const deleteBankAccount = (id: number) => {
    return async (dispatch: Dispatch<commonAuthActions>) => {
        try {
            dispatch(authActions.setIsLoading(true))
            let res = await authAPI.deleteBank(id)
            console.log(res.data)
            dispatch(authActions.setIsLoading(false))
        } catch(e) {
            console.log('error', e.response)
            dispatch(authActions.setIsLoading(false))
        }
    }
}
