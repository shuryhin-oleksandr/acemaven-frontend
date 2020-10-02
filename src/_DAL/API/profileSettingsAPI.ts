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
    addNewWorker (workerInfo: any) {
        return instance.post(`/user/`, workerInfo)
    },
    editWorker (workerId: number, workerInfo: IAddNewUserData) {
        return instance.patch(`/user/${workerId}/`, workerInfo)
    },
    deleteWorker (workerId: number) {
        return instance.delete(`/user/${workerId}/`)
    },
    changePassword (data: any) {
        return instance.post('/password-change/', data)
    }
}