import React, {useEffect} from 'react'
//react-redux
import {useDispatch, useSelector} from 'react-redux';
//BLL
import {AppStateType} from "../../../../_BLL/store";
import {getWorkersList} from "../../../../_BLL/thunks/profile/profileThunks";
import {commonActions} from "../../../../_BLL/reducers/commonReducer";
//types
import {VoidFunctionType} from "../../../../_BLL/types/commonTypes";
//components
import Layout from "../../../components/BaseLayout/Layout";
import UserManagementPage from './UserManagementPage';
import SpinnerForAuthorizedPages from "../../../components/_commonComponents/spinner/SpinnerForAuthorizedPages";


const UserManagementContainer:React.FC = () => {

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
        <Layout>
            {isFetching
                ? <SpinnerForAuthorizedPages/>
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

