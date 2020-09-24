import instance from "./axiosConfig";
import {IAuthUserInfo} from "../../_BLL/types/authTypes";
import {CompanyInfoType} from "../../_BLL/types/profileSettingsType";
import {IAddNewBank, IAddNewUserData} from "../../_BLL/types/addNewUserTypes";

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
    getBanksList () {
        return instance.get(`/bank-account/`)
    },
    addNewBank (bankData: IAddNewBank) {
        return instance.post(`/bank-account/`, bankData)
    },
   defaultBank (bankId: number, changes: any) {
        return instance.patch(`/bank-account/${bankId}/`, changes)
    },
    deleteBank (bankId: number) {
        return instance.delete(`/bank-account/${bankId}/`)
    },
    getWorkersList () {
        return instance.get(`/user/`)
    },
    addNewWorker (workerInfo: IAddNewUserData) {
        return instance.post(`/user/`, workerInfo)
    },
    editWorker (workerId: number, workerInfo: IAddNewUserData) {
        return instance.patch(`/user/${workerId}/`, workerInfo)
    },
    deleteWorker (workerId: number) {
        return instance.patch(`/user/${workerId}/`)
    },
}