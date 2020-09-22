import instance from './axiosConfig'
import {ICompanySignUpData, ILoginData, IMasterAccountData,} from "../../_BLL/types/authTypes";
import {IAddNewUserData} from "../../_BLL/types/addNewUserTypes";

export const authAPI = {
    signIn (loginData: ILoginData) {
        return instance.post('/sign-in/', loginData)
    },
    getAuthUser () {
        return instance.get(`/me/`) // is company activated, photo, email & etc.
    },
    signUpCompany (formData: ICompanySignUpData) {
        return instance.post('/company-sign-up/', formData )
    },
    verifyToken (token: string) {
        return instance.get(`/signup-check/?token=${token}`)
    },
    createMasterAccount (masterData: IMasterAccountData, token: string) {
        return instance.post(`/signup/?token=${token}`, masterData)
    },
    getEmployeesList () {
        return instance.get('/user')
    },
    addEmployee (employeeData: IAddNewUserData) {
        return instance.post('/user/', employeeData)
    },
    deleteEmployer (id:number) {
        return instance.delete(`/user/${id}`)
    },
    getBanksAccountsList () {
        return instance.get('/bank-account/')
    },
    addBankAccount (bankData: any) {
        return instance.post('/bank-account/', bankData)
    },
    deleteBank (id: number) {
        return instance.delete(`/bank-account/${id}`)
    },
    activateCompanyAccount () {
        return instance.post('/company-activate/', {})
    }
}