import {IAuthUserInfo} from "../types/authTypes";
import {CompanyInfoType} from "../types/profileSettingsType";
import {IAddNewBank, IAddNewUserData} from "../types/addNewUserTypes";
import {settingsType} from "../types/profile/profileTypes";


type Error = {
    old_password?: string[];
    new_password1?: string[];
    new_password2?: string[];
};
export type AddUserError = {
    first_name?: string[];
    last_name?: string[];
    email?: string[];
    position?: string[];
}

const initialState = {
    isFetching: false,
    authUserInfo: null as IAuthUserInfo | null,
    companyInfo: null as CompanyInfoType | null,
    banksList: [] as Array<IAddNewBank>,
    workersList: null as Array<IAddNewUserData> | null,
    addUserError: null as AddUserError | null,
    addUserSuccess: false,
    passwordError: null as Error | null,
    changesPass: "",
    addedBankSuccess: '',
    addingBankError: '',
    openBankForm: false,
    my_settings: null as settingsType | null,
    // language: ''
};

type InitialStateType = typeof initialState;

export const profileReducer = (state = initialState, action: commonProfileActions): InitialStateType => {
    switch (action.type) {
        case "SET_IS_FETCHING":
            return {
                ...state,
                isFetching: action.isFetching,
            };
        case "SET_AUTH_USER_INFO":
            return {
                ...state,
                authUserInfo: action.userInfo,
            };
        case "SET_COMPANY_INFO":
            return {
                ...state,
                companyInfo: action.companyInfo,
            };
        case "SET_BANKS_LIST":
            return {
                ...state,
                banksList: action.banksList,
            };
        case "SET_NEW_TO_BANKS":
            return {
                ...state,
                banksList: [...state.banksList, action.bank],
            };
        case "SET_BANKS_AFTER_DEFAULT":
            return {
                ...state,
                banksList:
                    state.banksList &&
                    state.banksList.map((b) => {
                        if (b.id === action.bankId) {
                            return action.default_bank;
                        } else {
                            return b;
                        }
                    }),
            };
        case "SET_WORKERS_LIST":
            return {
                ...state,
                workersList: action.workersList,
            };
        case "SET_NEW_TO_WORKERS_LIST":
            return {
                ...state,
                workersList: [...state.workersList, action.worker],
            };
        case "SET_ADDING_USER_ERROR":
            return {
                ...state,
                addUserError: action.error
            }
        case "SET_ADDING_USER_SUCCESS":
            return {
                ...state,
                addUserSuccess: action.value
            }
        case "SET_EDITED_WORKER":
            return {
                ...state,
                workersList:
                    state.workersList &&
                    state.workersList.map((w) => {
                        if (w.id === action.id) {
                            return action.worker;
                        } else {
                            return w;
                        }
                    }),
            };
        // case "CHANGE_LANGUAGE_AT_BACK_END":
        //     return {
        //         ...state,
        //         language: action.language
        //     }
        case "SET_WORKERS_LIST_AFTER_DELETE":
            return {
                ...state,
                workersList:
                    state.workersList &&
                    state.workersList.filter((w) => w.id !== action.workerId),
            };
        case "SET_CHANGE_PASSWORD_ERROR":
            return {
                ...state,
                passwordError: action.error,
            };
        case "SET_CHANGES":
            return {
                ...state,
                changesPass: action.message,
            };
        case "SET_ADDING_BANK_ERROR":
            return {
                ...state,
                addingBankError: action.error
            }
        case "SET_ADDED_BANK_SUCCESS":
            return {
                ...state,
                addedBankSuccess: action.value
            }
        case "SET_MY_SETTINGS":
            return {
                ...state,
                my_settings: action.settings
            }
        default:
            return state;
    }
};

type AC<T> = T extends { [key: string]: (...args: any[]) => infer U } ? U : never;
export type commonProfileActions = AC<typeof profileActions>;

export const profileActions = {
    setIsFetching: (isFetching: boolean) => ({type: "SET_IS_FETCHING", isFetching} as const),
    setAuthUserInfo: (userInfo: IAuthUserInfo | null) => ({type: "SET_AUTH_USER_INFO", userInfo} as const),
    setCompanyInfo: (companyInfo: CompanyInfoType) => ({type: "SET_COMPANY_INFO", companyInfo} as const),
    setBanksList: (banksList: Array<IAddNewBank>) => ({type: "SET_BANKS_LIST", banksList} as const),
    setNewToBanksList: (bank: IAddNewBank) => ({type: "SET_NEW_TO_BANKS", bank} as const),
    setAddingBankError: (error: string) => ({type: 'SET_ADDING_BANK_ERROR', error} as const),
    setWorkersList: (workersList: Array<IAddNewUserData>) => ({type: "SET_WORKERS_LIST", workersList} as const),
    setNewToWorkersList: (worker: IAddNewUserData) => ({type: "SET_NEW_TO_WORKERS_LIST", worker} as const),
    setAddingUserSuccess: (value: boolean) => ({type: 'SET_ADDING_USER_SUCCESS', value} as const),
    setAddingUserError: (error: AddUserError | null) => ({type: 'SET_ADDING_USER_ERROR', error} as const),
    setEditedToWorkersList: (id: number, worker: IAddNewUserData) => ({type: "SET_EDITED_WORKER", id, worker} as const),
    changeLanguageAtBackEnd: (id: number, language: string) => ({type: "CHANGE_LANGUAGE_AT_BACK_END", id, language} as const),
    deleteWorker: (workerId: number) => ({type: "SET_WORKERS_LIST_AFTER_DELETE", workerId} as const),
    setBanksAfterDefault: (bankId: number, default_bank: IAddNewBank) => ({
        type: "SET_BANKS_AFTER_DEFAULT",
        bankId,
        default_bank
    } as const),
    changePassError: (error: any) => ({type: "SET_CHANGE_PASSWORD_ERROR", error} as const),
    setChanges: (message: string) => ({type: "SET_CHANGES", message} as const),
    setAddedBankSuccess: (value: string) => ({type: 'SET_ADDED_BANK_SUCCESS', value} as const),
    setMySettings: (settings: settingsType) => ({type: 'SET_MY_SETTINGS', settings} as const)
};


