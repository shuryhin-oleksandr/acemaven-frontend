import {
  ICompanySignUpData,
  ICompanySignUpError,
  IMasterSignUpError
} from "../types/authTypes";


const initialState: InitialStateType = {
  isAuth: false,
  isInit: false,
  isFetching: false,
  loginError: "",
  signedCompanyData: null,
  companySignUpError: null,
  checkTokenError: "",
  signUpMasterError: null,
  isFinish: false,
  checkedUser: null,
  finishPopup: false,
  passwordError: "",
  additionalUserEmailError: '',
  isSignUp: false,
  isSignIn: false,
};

type InitialStateType = {
  isFetching: boolean;
  isInit: boolean;
  isAuth: boolean;
  loginError: string;
  signedCompanyData: ICompanySignUpData | null;
  checkTokenError: string;
  companySignUpError: ICompanySignUpError | null;
  signUpMasterError: IMasterSignUpError | null;
  isFinish: boolean;
  checkedUser: any;
  finishPopup: boolean;
  passwordError: string;
  additionalUserEmailError: string;
  isSignUp: boolean;
  isSignIn: boolean;
};

export const authReducer = (
  state = initialState,
  action: commonAuthActions
): InitialStateType => {
  switch (action.type) {
    case "SET_IS_LOADING":
      return {
        ...state,
        isFetching: action.isFetching,
      };
    case "SET_INIT":
      return {
        ...state,
        isInit: action.isInit
      }
    case "SET_AUTH":
      return {
        ...state,
        isAuth: action.isAuth,
      };
    case "SET_LOGIN_ERROR":
      return {
        ...state,
        loginError: action.error,
      };
    case "SET_COMPANY_SIGNUP_ERROR":
      return {
        ...state,
        companySignUpError: action.error,
      };
    case "SET_CHECK_TOKEN_ERROR":
      return {
        ...state,
        checkTokenError: action.error,
      };
    case "SET_MASTER_SIGNUP_ERROR":
      return {
        ...state,
        signUpMasterError: action.error,
      };
    case "SET_IS_FINISH":
      return {
        ...state,
        isFinish: action.value,
      };
    case "SET_CHECKED_TOKEN_USER": {
      return {
        ...state,
        checkedUser: action.data,
      };
    }
    case "OPEN_FINISH_POPUP": {
      return {
        ...state,
        finishPopup: action.value,
      };
    }
    case "SET_PASSWORD_ERROR": {
      return {
        ...state,
        passwordError: action.error,
      };
    }
    case "SET_ADDITIONAL_USER_EMAIL_ERROR":
      return {
        ...state,
        additionalUserEmailError: action.error
      }
    case "SET_OPEN_SIGN_UP": {
      return {
        ...state,
        isSignUp: action.value,
      };
    }
    case "SET_OPEN_SIGN_IN": {
      return {
        ...state,
        isSignIn: action.value,
      };
    }
    default:
      return state;
  }
};

type AC<T> = T extends { [key: string]: (...args: any[]) => infer U }
  ? U
  : never;
export type commonAuthActions = AC<typeof authActions>;

export const authActions = {
  setInit: (isInit: boolean) => ({type:"SET_INIT", isInit} as const),
  setAuth: (isAuth: boolean) => ({ type: "SET_AUTH", isAuth } as const),
  setIsLoading: (isFetching: boolean) =>
    ({ type: "SET_IS_LOADING", isFetching } as const),
  setLoginError: (error: string) =>
    ({ type: "SET_LOGIN_ERROR", error } as const),
  setSignedCompanyData: (data: ICompanySignUpData) =>
    ({ type: "SET_SIGNED_COMPANY_DATA", data } as const),
  setCompanySignupError: (error: ICompanySignUpError) =>
    ({ type: "SET_COMPANY_SIGNUP_ERROR", error } as const), //for phone & email check errors
  setCheckTokenError: (error: string) =>
    ({ type: "SET_CHECK_TOKEN_ERROR", error } as const), //for check token error
  setMasterSignUpError: (error: IMasterSignUpError) =>
    ({ type: "SET_MASTER_SIGNUP_ERROR", error } as const), //for password error
  setIsFinish: (value: boolean) => ({ type: "SET_IS_FINISH", value } as const),
  setCheckedTokenUser: (data: any) =>
    ({ type: "SET_CHECKED_TOKEN_USER", data } as const),
  openFinishSignUpPopup: (value: boolean) =>
    ({ type: "OPEN_FINISH_POPUP", value } as const),
  setPasswordError: (error: string) =>
    ({ type: "SET_PASSWORD_ERROR", error } as const),
  setAdditionalUserEmailError: (error: string) => ({type: 'SET_ADDITIONAL_USER_EMAIL_ERROR', error} as const),
  setOpenSignUp: (value: boolean) =>
    ({ type: "SET_OPEN_SIGN_UP", value } as const),
  setOpenSignIn: (value: boolean) =>
    ({ type: "SET_OPEN_SIGN_IN", value } as const),
};


