import {Dispatch} from "redux";
import {authAPI} from "../../../_DAL/API/authAPI";
import {profileSettingsAPI} from "../../../_DAL/API/profileSettingsAPI";
import {CompanyInfoType} from "../../types/profileSettingsType";
import {IAddNewBank, IAddNewUserData} from "../../types/addNewUserTypes";
import {commonProfileActions, profileActions} from "../../reducers/profileReducer";


//profile
export const getAuthUserInfo = () => {
    return async (dispatch: Dispatch<commonProfileActions>) => {
        try {
            dispatch(profileActions.setIsFetching(true));
            let res = await authAPI.getAuthUser();
            dispatch(profileActions.setAuthUserInfo(res.data));
            dispatch(profileActions.setIsFetching(false));
        } catch (e) {
            console.log("error", e);
            dispatch(profileActions.setIsFetching(false));
        }
    };
};
export const changeMyPassword = (data: any) => {
    return async (dispatch: Dispatch<commonProfileActions>) => {
        try {
            dispatch(profileActions.setIsFetching(true));
            let res = await profileSettingsAPI.changePassword(data);
            dispatch(profileActions.changePassError(null));
            res && dispatch(profileActions.setChanges("Password was changed!"));
            dispatch(profileActions.setIsFetching(false));
        } catch (e) {
            console.log(e.response);
            dispatch(profileActions.changePassError(e.response.data));
            dispatch(profileActions.setIsFetching(false));
        }
    };
};

//company
export const getCompanyInfo = (id: number) => {
    return async (dispatch: Dispatch<commonProfileActions>) => {
        try {
            dispatch(profileActions.setIsFetching(true));
            let res = await profileSettingsAPI.getCompanyInfo(id);
            dispatch(profileActions.setCompanyInfo(res.data));
            dispatch(profileActions.setIsFetching(false));
        } catch (e) {
            console.log("error", e.response);
            dispatch(profileActions.setIsFetching(false));
        }
    };
};
export const editCompanyInfo = (id: number, editData: CompanyInfoType, setEdit:any) => {
    return async (dispatch: Dispatch<commonProfileActions>) => {
        try {
            dispatch(profileActions.setIsFetching(true));
            let res = await profileSettingsAPI.editCompanyInfoData(id, editData);
            dispatch(profileActions.setCompanyInfo(res.data));
            dispatch(profileActions.setIsFetching(false));
            setEdit && setEdit(false)
        } catch (e) {
            console.log("error", e.response);
            dispatch(profileActions.setIsFetching(false));
        }
    };
};

//company settings
export const getBankAccounts = () => {
    return async (dispatch: Dispatch<commonProfileActions>) => {
        try {
            dispatch(profileActions.setIsFetching(true));
            let res = await profileSettingsAPI.getBanksList();
            dispatch(profileActions.setBanksList(res.data));
            dispatch(profileActions.setIsFetching(false));
        } catch (e) {
            console.log("error", e);
            dispatch(profileActions.setIsFetching(false));
        }
    };
};
export const addBankAccount = (bankData: IAddNewBank) => {
    return async (dispatch: Dispatch<any>) => {
        try {
            dispatch(profileActions.setIsFetching(true));
            let res = await profileSettingsAPI.addNewBank(bankData);
            dispatch(profileActions.setNewToBanksList(res.data));
            res.data && dispatch(profileActions.setAddedBankSuccess('success'))
            dispatch(profileActions.setIsFetching(false));
        } catch (e) {
            dispatch(profileActions.setAddingBankError(e.response.data.number[0]))
            dispatch(profileActions.setIsFetching(false));
        }
    };
};
export const deleteBank = (bankId: number) => {
    return async (dispatch: Dispatch<any>) => {
        try {
            dispatch(profileActions.setIsFetching(true));
            let res = await profileSettingsAPI.deleteBank(bankId);
            res && await dispatch(getBankAccounts());
            dispatch(profileActions.setIsFetching(false));
        } catch (e) {
            console.log("error", e.response);
            dispatch(profileActions.setIsFetching(false));
        }
    };
};
export const makeBankDefault = (bankId: number, changes: any) => {
    return async (dispatch: Dispatch<any>) => {
        try {
            dispatch(profileActions.setIsFetching(true));
            let res = await profileSettingsAPI.defaultBank(bankId, changes);
            res && await dispatch(getBankAccounts());
            dispatch(profileActions.setIsFetching(false));
        } catch (e) {
            console.log("error", e.response);
            dispatch(profileActions.setIsFetching(false));
        }
    };
};

//user management
export const getWorkersList = () => {
    return async (dispatch: Dispatch<commonProfileActions>) => {
        try {
            dispatch(profileActions.setIsFetching(true));
            let res = await profileSettingsAPI.getWorkersList();
            dispatch(profileActions.setWorkersList(res.data));
            dispatch(profileActions.setIsFetching(false));
        } catch (e) {
            console.log("error", e.response);
            dispatch(profileActions.setIsFetching(false));
        }
    };
};
export const addNewWorker = (workerData: IAddNewUserData) => {
    return async (dispatch: Dispatch<commonProfileActions>) => {
        try {
            dispatch(profileActions.setIsFetching(true));
            let res = await profileSettingsAPI.addNewWorker(workerData);
            dispatch(profileActions.setNewToWorkersList(res.data));
            dispatch(profileActions.setAddingUserSuccess(true))
            dispatch(profileActions.setIsFetching(false));
        } catch (e) {
            console.log("error", e.response);
            dispatch(profileActions.setAddingUserError(e.response.data))
            dispatch(profileActions.setIsFetching(false));
        }
    };
};
export const editWorker = (workerId: number, workerData: IAddNewUserData) => {
    return async (dispatch: Dispatch<commonProfileActions>) => {
        try {
            dispatch(profileActions.setIsFetching(true));
            let res = await profileSettingsAPI.editWorker(workerId, workerData);
            dispatch(profileActions.setEditedToWorkersList(workerId, res.data));
            dispatch(profileActions.setIsFetching(false));
        } catch (e) {
            console.log("error", e.response);
            dispatch(profileActions.setIsFetching(false));
        }
    };
};
export const deleteWorker = (workerId: number) => {
    return async (dispatch: Dispatch<commonProfileActions>) => {
        try {
            dispatch(profileActions.setIsFetching(true));
            let res = await profileSettingsAPI.deleteWorker(workerId);
            res && dispatch(profileActions.deleteWorker(workerId));
            dispatch(profileActions.setIsFetching(false));
        } catch (e) {
            console.log("error", e.response);
            dispatch(profileActions.setIsFetching(false));
        }
    };
};

//general setting (notifications & emails)
export const getMySettingsThunk = (settings_id: number) => {
    return async (dispatch: Dispatch<commonProfileActions>) => {
        try {
            dispatch(profileActions.setIsFetching(true));
            let res = await profileSettingsAPI.getMySettings(settings_id);
            dispatch(profileActions.setMySettings(res.data));
            dispatch(profileActions.setIsFetching(false));
        } catch (e) {
            console.log("error", e.response);
            dispatch(profileActions.setIsFetching(false));
        }
    };
};
export const changeMySettingsThunk = (settings_id: number, change_data: any) => {
    return async () => {
        try {
            await profileSettingsAPI.changeMySettings(settings_id, change_data);
        } catch (e) {
            console.log("error", e.response);
        }
    };
};

