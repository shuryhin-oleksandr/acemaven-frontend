import {Dispatch} from "redux";
import {authAPI} from "../../_DAL/API/authAPI";
import {ICompanySignUpData, IFirstPart, ILoginData, IMasterAccountData, ISecondPart} from "../types/authTypes";


const initialState = {
    isAuth: false,
    isFetching: false,
    firstData: null as IFirstPart | null,
    secondData: null as ISecondPart | null
}

type InitialStateType = typeof initialState

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
        case "SET_FIRST_SIGN_UP_DATA":
            return {
                ...state,
                firstData: action.formData
            }
        case "SET_SECOND_SIGN_UP_DATA":
            return {
                ...state,
                secondData: action.formData
            }

        default: return state
    }
}

type AC<T> = T extends { [key: string]: (...args: any[]) => infer U } ? U : never;
type commonAuthActions = AC<typeof authActions>

export const authActions = {
    setAuthUser: (isAuth:boolean) => ({type: 'SET_AUTH_USER', isAuth} as const),
    setIsLoading: (isFetching: boolean) => ({type: 'SET_IS_LOADING', isFetching} as const),
    setFirstSignUpData: (formData: IFirstPart) => ({type: 'SET_FIRST_SIGN_UP_DATA', formData}) as const,
    setSecondSignUpData: (formData: ISecondPart) => ({type: 'SET_SECOND_SIGN_UP_DATA', formData}) as const,
    setSignedCompanyData: (data:ICompanySignUpData) => ({type: 'SET_SIGNED_COMPANY_DATA', data} as const)
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
            console.log(e)
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
            console.log(e)
        }
    }
}

