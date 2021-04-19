import instance from "./axiosConfig";
import {CompanyInfoType} from "../../_BLL/types/profileSettingsType";
import {IAddNewBank, IAddNewUserData} from "../../_BLL/types/addNewUserTypes";

export const profileSettingsAPI = {
    editProfile(id:number, data:any) {
        return instance.patch(`/core/user/${id}/`, data)
    },
    getCompanyInfo (companyId: number) {
        return instance.get(`/core/company/${companyId}/`)
    },
    editCompanyInfoData (companyId: number, data: CompanyInfoType) {
        return instance.patch(`/core/company/${companyId}/`, data)
    },
    getBanksList () {
        return instance.get(`/core/bank-account/`)
    },
    addNewBank (bankData: IAddNewBank) {
        return instance.post(`/core/bank-account/`, bankData)
    },
   defaultBank (bankId: number, changes: any) {
        return instance.patch(`/core/bank-account/${bankId}/`, changes)
    },
    deleteBank (bankId: number) {
        return instance.delete(`/core/bank-account/${bankId}/`)
    },
    getWorkersList () {
        return instance.get(`/core/user/`)
    },
    addNewWorker (workerInfo: any) {
        return instance.post(`/core/user/`, workerInfo)
    },
    editWorker (workerId: number, workerInfo: IAddNewUserData) {
        return instance.patch(`/core/user/${workerId}/`, workerInfo)
    },
    changeLanguageAtBackEnd (workerId: number, language: string) {
      return instance.patch(`/core/user/${workerId}/`, {language: language})
    },
    deleteWorker (workerId: number) {
        return instance.delete(`/core/user/${workerId}/`)
    },
    changePassword (data: any) {
        return instance.post('/core/password-change/', data)
    },
    getMySettings (settings_id: number) {
        return instance.get(`/core/email-settings/${settings_id}/`)
    },
    changeMySettings (settings_id: number, changed_data: any) {
        return instance.patch(`/core/email-settings/${settings_id}/`, changed_data)
    }

}