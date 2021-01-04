import instance from './axiosConfig'
import {ICompanySignUpData, ILoginData, IMasterAccountData,} from "../../_BLL/types/authTypes";
import {IAddNewUserData} from "../../_BLL/types/addNewUserTypes";

export const authAPI = {
    signIn (loginData: ILoginData) {
        return instance.post('/core/sign-in/', loginData)
    },
    getAuthUser () {
        return instance.get(`/core/me/`) // is company activated, photo, email & etc.
    },
    signUpCompany (formData: ICompanySignUpData) {
        return instance.post('/core/company-sign-up/', formData )
    },
    verifyToken (token: string) {
        return instance.get(`/core/signup-check/?token=${token}`)
    },
    signUp (token: string, formData:any) {
        return instance.post(`/core/signup/?token=${token}`, formData )
    },
    createMasterAccount (masterData: IMasterAccountData, token: string) {
        return instance.post(`/core/signup/?token=${token}`, masterData)
    },
    getEmployeesList () {
        return instance.get('/core/user/')
    },
    addEmployee (employeeData: IAddNewUserData) {
        return instance.post('/core/user/', employeeData)
    },
    deleteEmployer (id:number) {
        return instance.delete(`/core/user/${id}/`)
    },
    getBanksAccountsList () {
        return instance.get('/core/bank-account/')
    },
    addBankAccount (bankData: any) {
        return instance.post('/core/bank-account/', bankData)
    },
    setToDefaultBank (id: number, changes: any) {
        return instance.patch(`/core/bank-account/${id}/`, changes)
    },
    deleteBank (id: number) {
        return instance.delete(`/core/bank-account/${id}/`)
    }
}