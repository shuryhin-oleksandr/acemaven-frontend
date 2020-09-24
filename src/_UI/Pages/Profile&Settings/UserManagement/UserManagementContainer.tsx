import React, {useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux';
import Layout from "../../../components/BaseLayout/Layout";
import UserManagementPage from './UserManagementPage';
import {getWorkersList} from "../../../../_BLL/reducers/profileReducer";
import {AppStateType} from "../../../../_BLL/store";
import {VoidFunctionType} from "../../../../_BLL/types/commonTypes";


const UserManagementContainer = () => {

    const dispatch = useDispatch()
    let dispatchHandler = (someFn: VoidFunctionType) => {
        dispatch(someFn)
    }
    const workersList = useSelector((state: AppStateType) => state.profile.workersList)

    useEffect(() => {
        dispatch(getWorkersList())
    }, [])

    return (
        <Layout >
            <UserManagementPage dispatch={dispatchHandler} workersList={workersList}/>
        </Layout>
    )
}

export default UserManagementContainer

