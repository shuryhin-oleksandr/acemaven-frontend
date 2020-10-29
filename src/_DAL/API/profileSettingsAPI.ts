import instance from "./axiosConfig";
import {CompanyInfoType} from "../../_BLL/types/profileSettingsType";
import {IAddNewBank, IAddNewUserData} from "../../_BLL/types/addNewUserTypes";
import axios from 'axios'

export const profileSettingsAPI = {
    editProfile(id:number, data:any) {
        return axios.patch(`http://192.168.1.69:8000/api/v1/core/user/${id}/`,  data,
            {headers: {
                    Authorization: 'JWT ' + localStorage.getItem('access_token')
                }}
           )
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
    deleteWorker (workerId: number) {
        return instance.delete(`/core/user/${workerId}/`)
    },
    changePassword (data: any) {
        return instance.post('/core/password-change/', data)
    }
}