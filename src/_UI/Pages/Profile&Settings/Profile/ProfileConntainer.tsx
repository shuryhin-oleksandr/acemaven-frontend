import React, {useEffect} from 'react'
//react-redux
import {useDispatch} from "react-redux";
//BLL
import {getAuthUserInfo} from "../../../../_BLL/thunks/profile/profileThunks";
import {commonActions} from "../../../../_BLL/reducers/commonReducer";
//components
import Layout from "../../../components/BaseLayout/Layout";
import ProfilePage from "./ProfilePage";


const ProfileContainer: React.FC = () => {

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(commonActions.setCurrentNavPath('/settings/profile'))
        dispatch(getAuthUserInfo())
    }, [dispatch])

    return (
        <Layout>
            <ProfilePage/>
        </Layout>
    )
}

export default ProfileContainer