import instance from './axiosConfig'
import {ICompanySignUpData, ILoginData, IMasterAccountData,} from "../../_BLL/types/authTypes";
import {IAddNewUserData} from "../../_BLL/types/addNewUserTypes";

export const authAPI = {
    signIn (loginData: ILoginData) {
        return instance.post('/sign-in/', loginData)
    },
    signUpCompany (formData: ICompanySignUpData) {
        return instance.post('/company-sign-up/', formData )
    },
    verifyToken (token: string) {
        return instance.get(`/signup-check/?${token}`)
    },
    createMasterAccount (masterData: IMasterAccountData, token: string) {
        return instance.post(`/signup/?${token}`, masterData)
    },
    addEmployee (employeeData: IAddNewUserData) {
        return instance.post('/user/', employeeData)
    },
    addBankAccount (bankData: any) {
        return instance.post('/bank-account/', bankData)
    },
    activateCompanyAccount () {
        return instance.post('/company-activate/', {})
    }
}