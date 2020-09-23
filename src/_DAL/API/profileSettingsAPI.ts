import instance from "./axiosConfig";
import {IAuthUserInfo} from "../../_BLL/types/authTypes";
import {CompanyInfoType} from "../../_BLL/types/profileSettingsType";

export const profileSettingsAPI = {
    editProfile(id:number, data:IAuthUserInfo) {
        return instance.patch(`/user/${id}/`, data)
    },
    getCompanyInfo (companyId: number) {
        return instance.get(`/company/${companyId}`)
    },
    editCompanyInfo (companyId: number, data: CompanyInfoType) {
        return instance.patch(`/company/${companyId}/`, data)
    }
}