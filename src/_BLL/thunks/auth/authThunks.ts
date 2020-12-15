import {ICompanySignUpData, ILoginData} from "../../types/authTypes";
import {History} from "history";
import {Dispatch} from "redux";
import {authAPI} from "../../../_DAL/API/authAPI";
import {authActions, commonAuthActions} from "../../reducers/authReducer";

export const signIn = (loginData: ILoginData, history: History) => {
    return async (dispatch: Dispatch<commonAuthActions>) => {
        try {
            dispatch(authActions.setIsLoading(true));
            let res = await authAPI.signIn(loginData);
            localStorage.setItem("access_token", res.data.token);
            dispatch(authActions.setAuth(true));
            dispatch(authActions.setOpenSignUp(false));
            dispatch(authActions.setOpenSignIn(false));
            res.data && history.push("/");
            dispatch(authActions.setIsLoading(false));
        } catch (e) {
            if (e.response) {
                dispatch(
                    authActions.setLoginError(e.response.data.non_field_errors[0])
                );
            } else {
                dispatch(
                    authActions.setLoginError(
                        "Something has went wrong. Please try again later!"
                    )
                );
            }
            dispatch(authActions.setIsLoading(false));
        }
    };
};

export const companySignUp = (data: ICompanySignUpData) => {
    return async (dispatch: Dispatch<commonAuthActions>) => {
        try {
            dispatch(authActions.setIsLoading(true));
            let res = await authAPI.signUpCompany(data);
            dispatch(authActions.setSignedCompanyData(res.data));
            dispatch(authActions.setOpenSignUp(false));
            dispatch(authActions.setOpenSignIn(false));
            dispatch(authActions.setIsFinish(true)) &&
            dispatch(authActions.openFinishSignUpPopup(true));
            dispatch(authActions.setIsLoading(false));
        } catch (e) {
            dispatch(authActions.setCompanySignupError(e.response.data));
            dispatch(authActions.setIsLoading(false));
        }
    };
};

export const checkToken = (token: string) => {
    return async (dispatch: Dispatch<commonAuthActions>) => {
        try {
            dispatch(authActions.setIsLoading(true));
            let res = await authAPI.verifyToken(token);
            dispatch(authActions.setCheckedTokenUser(res.data));
            res.data && dispatch(authActions.setIsLoading(false));
        } catch (e) {
            dispatch(authActions.setCheckTokenError(e.response.data.detail));
            dispatch(authActions.setIsLoading(false));
        }
    };
};

export const completeAdditionalUser = (token: string, wholeData: any, history: History) => {
    return async (dispatch: Dispatch<commonAuthActions>) => {
        try {
            dispatch(authActions.setPasswordError(''));
            dispatch(authActions.setAdditionalUserEmailError(''));
            dispatch(authActions.setIsLoading(true));
            let res = await authAPI.signUp(token, wholeData);
            res.data && localStorage.setItem("access_token", res.data.token);
            dispatch(authActions.setAuth(true));
            res.data.token && history.push("/");
            dispatch(authActions.setIsLoading(false));
        } catch (e) {
            if(e.response.data.password) {
                dispatch(authActions.setPasswordError(e.response.data.password[0]));
            } else {
                dispatch(authActions.setAdditionalUserEmailError(e.response.data.email[0]));
            }
            /*dispatch(authActions.setCheckTokenError(e.response));*/
            dispatch(authActions.setIsLoading(false));
        }
    };
};

export const signOut = (history: History) => {
    return async (dispatch: Dispatch<commonAuthActions>) => {
        dispatch(authActions.setAuth(false)) &&  history.push("/acemaven");
        localStorage.removeItem("access_token")
        sessionStorage.clear()
    };
};