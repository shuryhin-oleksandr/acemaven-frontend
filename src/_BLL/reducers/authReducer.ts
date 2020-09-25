import {Dispatch} from "redux";
import {authAPI} from "../../_DAL/API/authAPI";
import {
    ICompanySignUpData,
    ICompanySignUpError,
    ILoginData,
    IMasterAccountData
} from "../types/authTypes";
import {History} from "history";


const initialState:InitialStateType = {
    isAuth: false,
    isFetching: false,
    loginError: '',
    signedCompanyData: null,
    companySignUpError: null,
    checkTokenError: '',
    signUpMasterError: '',
    isFinish: false,
    checkedUser: null
}

type InitialStateType = {
    isFetching: boolean,
    isAuth: boolean,
    loginError: string,
    signedCompanyData: ICompanySignUpData | null,
    checkTokenError: string,
    companySignUpError: ICompanySignUpError | null,
    signUpMasterError: string,
    isFinish: boolean,
    checkedUser: any

}

export const authReducer = (state = initialState, action: commonAuthActions) :InitialStateType => {
    switch(action.type) {
        case "SET_IS_LOADING":
            return {
               ...state,
                isFetching: action.isFetching
            }
        case "SET_AUTH":
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
        case "SET_IS_FINISH":
            return {
                ...state,
                isFinish: action.value
            }
        case "SET_CHECKED_TOKEN_USER": {
            return {
                ...state, checkedUser: action.data
            }
        }
        default: return state
    }
}

type AC<T> = T extends { [key: string]: (...args: any[]) => infer U } ? U : never;
type commonAuthActions = AC<typeof authActions>

export const authActions = {
    setAuth: (isAuth:boolean) => ({type: 'SET_AUTH', isAuth} as const),
    setIsLoading: (isFetching: boolean) => ({type: 'SET_IS_LOADING', isFetching} as const),
    setLoginError: (error: string) => ({type: 'SET_LOGIN_ERROR', error} as const),
    setSignedCompanyData: (data:ICompanySignUpData) => ({type: 'SET_SIGNED_COMPANY_DATA', data} as const),
    setCompanySignupError: (error: ICompanySignUpError) => ({type: 'SET_COMPANY_SIGNUP_ERROR', error} as const), //for phone & email check errors
    setCheckTokenError: (error: string) => ({type: 'SET_CHECK_TOKEN_ERROR', error} as const), //for check token error
    setMasterSignUpError: (error: string) => ({type: 'SET_MASTER_SIGNUP_ERROR', error} as const), //for password error
    setIsFinish: (value: boolean) => ({type: 'SET_IS_FINISH', value} as const),
    setCheckedTokenUser: (data: any) => ({type: 'SET_CHECKED_TOKEN_USER', data} as const)
}


export const signIn = (loginData: ILoginData, history: History) => {
    return async (dispatch: Dispatch<commonAuthActions>) => {
        try {
            dispatch(authActions.setIsLoading(true))
            let res = await authAPI.signIn(loginData)
            localStorage.setItem('access_token', res.data.token)
            res.data && (history.push('/settings/profile'))
            dispatch(authActions.setIsLoading(false))
        } catch (e) {
            if(e.response) {
                dispatch(authActions.setLoginError(e.response.data.non_field_errors[0]))
                console.log('error', e.response.data.non_field_errors[0])
            } else {
                dispatch(authActions.setLoginError('Something has went wrong. Please try again later!'))
                console.log(e)
            }

            dispatch(authActions.setIsLoading(false))
        }
    }
}


export const companySignUp = (data: ICompanySignUpData) => {
    return async (dispatch: Dispatch<commonAuthActions>) => {
        try {
            dispatch(authActions.setIsLoading(true))
            let res = await authAPI.signUpCompany(data)
            dispatch(authActions.setSignedCompanyData(res.data))
            dispatch(authActions.setIsFinish(true)) && (window.location.href = '/sign-up/done')
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
            dispatch(authActions.setCheckedTokenUser(res.data))
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
            dispatch(authActions.setIsLoading(false))
        } catch (e) {
            console.log('error', e.response)
            dispatch(authActions.setIsLoading(false))
        }
    }
}

