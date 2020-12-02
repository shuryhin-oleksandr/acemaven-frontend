import React, {useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux';
import Layout from "../../../components/BaseLayout/Layout";
import UserManagementPage from './UserManagementPage';
import {getWorkersList} from "../../../../_BLL/reducers/profileReducer";
import {AppStateType} from "../../../../_BLL/store";
import {VoidFunctionType} from "../../../../_BLL/types/commonTypes";
import {commonActions} from "../../../../_BLL/reducers/commonReducer";
import SpinnerForAuthorizedPages from "../../../components/_commonComponents/spinner/SpinnerForAuthorizedPages";


const UserManagementContainer = () => {

    const dispatch = useDispatch()
    let dispatchHandler = (someFn: VoidFunctionType) => {
        dispatch(someFn)
    }
    const workersList = useSelector((state: AppStateType) => state.profile.workersList)
    let current_user_roles = useSelector((state: AppStateType) => state.profile.authUserInfo?.roles)
    let isFetching = useSelector((state: AppStateType) => state.profile.isFetching)
    let my_id = useSelector((state: AppStateType) => state.profile.authUserInfo?.id)

    useEffect(() => {
        dispatch(getWorkersList())
        dispatch(commonActions.setCurrentNavPath('/settings/user/management'))
    }, [dispatch])

    return (
        <Layout >
            {isFetching
                ? <SpinnerForAuthorizedPages />
                : <UserManagementPage dispatch={dispatchHandler}
                                      workersList={workersList}
                                      my_id={my_id}
                                      current_user_roles={current_user_roles ? current_user_roles : []}
                />
            }
        </Layout>
    )
}

export default UserManagementContainer

