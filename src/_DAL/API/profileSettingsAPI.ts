import instance from "./axiosConfig";
import {IAuthUserInfo} from "../../_BLL/types/authTypes";
import {CompanyInfoType} from "../../_BLL/types/profileSettingsType";
import {IAddNewBank} from "../../_BLL/types/addNewUserTypes";

export const profileSettingsAPI = {
    editProfile(id:number, data:IAuthUserInfo) {
        return instance.patch(`/user/${id}/`, data)
    },
    getCompanyInfo (companyId: number) {
        return instance.get(`/company/${companyId}`)
    },
    editCompanyInfoData (companyId: number, data: CompanyInfoType) {
        return instance.patch(`/company/${companyId}/`, data)
    },
    getBanksList (companyId: number) {
        return instance.get(`/bank-account/${companyId}`)
    },
    addNewBank (companyId: number, bankData: IAddNewBank) {
        return instance.post(`/bank-account/${companyId}`, bankData)
    },
    editBank (bankId: number, bankData: IAddNewBank) {
        return instance.patch(`/bank-account/${bankId}`, bankData)
    },
    deleteBank (bankId: number) {
        return instance.delete(`/bank-account/${bankId}`)
    }
}