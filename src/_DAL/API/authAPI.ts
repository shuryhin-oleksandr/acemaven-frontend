import instance from './axiosConfig'
import {ICompanySignUpData, ILoginData, IMasterAccountData,} from "../../_BLL/types/authTypes";

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
    }
}