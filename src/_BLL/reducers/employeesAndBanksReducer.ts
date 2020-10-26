import {IAddNewBank, IAddNewUserData} from "../types/addNewUserTypes";
import {Dispatch} from "redux";
import {authAPI} from "../../_DAL/API/authAPI";
import {AddUserError} from "./profileReducer";

const initialState = {
    isFetching: false,
    employees: null as Array<IAddNewUserData> | null,
    banksAccounts: null as Array<IAddNewBank> | null,
    addingEmployeeError: null as AddUserError | null,
    addingBankError: '',
    successUser: false,
    successBank: false
}


type InitialStateType = typeof initialState

export const employeesAndBanksReducer = (state = initialState, action: commonCompanyActions):InitialStateType => {
    switch (action.type) {
        case "SET_EMPLOYEES_LIST":
            return {
                ...state,
                employees: action.list
            }
        case "SET_EMPLOYEES_AFTER_DELETE":
            return {
                ...state,
                employees: state.employees && state.employees.filter(emp => emp.id !== action.id)
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
                banksAccounts: action.bankList
            }
        case "SET_BANK":
            return {
                ...state,
                banksAccounts: [...state.banksAccounts, action.bankData]
            }
        case "SET_BANKS_AFTER_DELETE":
            return {
                ...state,
                banksAccounts: state.banksAccounts && state.banksAccounts.filter(b => b.id !== action.id)
            }
        case "SET_ADDING_BANK_ERROR":
            return {
                ...state,
                addingBankError: action.error
            }
        case "SET_SUCCESS_ADDING_USER":
            return {
                ...state,
                successUser: action.value
            }
        case "SET_SUCCESS_ADDING_BANK":
            return {
                ...state,
                successBank: action.value
            }
        default: return state
    }
}

type AC<T> = T extends { [key: string]: (...args: any[]) => infer U } ? U : never;
type commonCompanyActions = AC<typeof companyActions>

export const companyActions = {
    setIsLoading: (isFetching: boolean) => ({type: 'SET_IS_LOADING', isFetching} as const),
    setEmployeesList: (list: Array<IAddNewUserData>) => ({type: 'SET_EMPLOYEES_LIST', list} as const),
    setEmployee: (data: IAddNewUserData) => ({type: 'SET_EMPLOYEE', data} as const),
    setEmployeesAfterDelete: (id: number) => ({type: 'SET_EMPLOYEES_AFTER_DELETE', id} as const),
    setBankList: (bankList: Array<IAddNewBank>) => ({type: 'SET_BANKS_LIST', bankList} as const),
    setBank: (bankData: IAddNewBank) => ({type: 'SET_BANK', bankData} as const),
    setBanksAfterDelete: (id: number) => ({type: 'SET_BANKS_AFTER_DELETE', id} as const),
    setAddingBankError: (error: string) => ({type: 'SET_ADDING_BANK_ERROR', error} as const),
    setAddingEmployeeError: (error: any) => ({type: 'SET_ADDING_EMPLOYEE_ERROR', error} as const),
    successAddingUser: (value: boolean) => ({type: 'SET_SUCCESS_ADDING_USER', value} as const),
    successAddingBank: (value: boolean) => ({type: 'SET_SUCCESS_ADDING_BANK', value} as const)
}


export const getEmployees = () => {
    return async (dispatch:Dispatch<commonCompanyActions>) => {
        try {
            dispatch(companyActions.setIsLoading(true))
            let res = await authAPI.getEmployeesList()
            dispatch(companyActions.setEmployeesList(res.data))
            dispatch(companyActions.setIsLoading(false))
        } catch (e) {
            console.log('error', e.response.data)
            dispatch(companyActions.setIsLoading(false))
        }
    }
}

export const addEmployee = (data: IAddNewUserData) => {
    return async (dispatch:Dispatch<commonCompanyActions>) => {
        try {
            dispatch(companyActions.setIsLoading(true))
            let res = await authAPI.addEmployee(data)
            dispatch(companyActions.setEmployee(res.data))
            dispatch(companyActions.successAddingUser(res.data))
            dispatch(companyActions.setIsLoading(false))
        } catch (e) {
            console.log(e.response)
            dispatch(companyActions.setAddingEmployeeError(e.response.data))
            dispatch(companyActions.setIsLoading(false))
        }
    }
}
export const deleteEmployee = (id: number) => {
    return async (dispatch:Dispatch<commonCompanyActions>) => {
        try {
            dispatch(companyActions.setIsLoading(true))
            let res = await authAPI.deleteEmployer(id)
            dispatch(companyActions.setEmployeesAfterDelete(id))
            console.log(res.data)
            dispatch(companyActions.setIsLoading(false))
        } catch(e) {
            console.log('error', e.response)
            dispatch(companyActions.setIsLoading(false))
        }
    }
}


export const getBanksList = () => {
    return async (dispatch:Dispatch<commonCompanyActions>) => {
        try {
            dispatch(companyActions.setIsLoading(true))
            let res = await authAPI.getBanksAccountsList()
            dispatch(companyActions.setBankList(res.data))
            dispatch(companyActions.setIsLoading(false))
        } catch (e) {
            console.log(e.response)
            dispatch(companyActions.setIsLoading(false))
        }
    }
}

export const addBank = (data: IAddNewBank) => {
    return async (dispatch:Dispatch<commonCompanyActions>) => {
        try {
            dispatch(companyActions.setIsLoading(true))
            let res = await authAPI.addBankAccount(data)
            dispatch(companyActions.setBank(res.data))
            dispatch(companyActions.successAddingBank(true))
            console.log('B', res.data)
            dispatch(companyActions.setIsLoading(false))
        } catch (e) {
            dispatch(companyActions.setAddingBankError(e.response.data.number[0]))
            dispatch(companyActions.setIsLoading(false))
        }
    }
}

export const makeDefaultBank = (id: number, changes: any) => {
    return async (dispatch:Dispatch<any>) => {
        try {
            dispatch(companyActions.setIsLoading(true))
            let res = await authAPI.setToDefaultBank(id, changes)
            console.log(res)
            res && dispatch(getBanksList())
            dispatch(companyActions.setIsLoading(false))
        } catch (e) {
            console.log('error', e.response)
            dispatch(companyActions.setIsLoading(false))
        }
    }
}

export const deleteBankAccount = (id: number) => {
    return async (dispatch:Dispatch<commonCompanyActions>) => {
        try {
            dispatch(companyActions.setIsLoading(true))
            let res = await authAPI.deleteBank(id)
            res && dispatch(companyActions.setBanksAfterDelete(id))
            console.log(res.data)
            dispatch(companyActions.setIsLoading(false))
        } catch(e) {
            console.log('error', e.response)
            dispatch(companyActions.setIsLoading(false))
        }
    }
}
