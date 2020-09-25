import React, {useEffect} from 'react'
import Layout from "../../../components/BaseLayout/Layout";
import ProfilePage from "./ProfilePage";
import {useDispatch} from "react-redux";
import {getAuthUserInfo} from "../../../../_BLL/reducers/profileReducer";
import {commonActions} from "../../../../_BLL/reducers/commonReducer";



const ProfileContainer:React.FC = () => {

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(commonActions.setCurrentNavPath('/settings/profile'))
        dispatch(getAuthUserInfo())
    }, [dispatch])

    return (
        <Layout >
            <ProfilePage />
        </Layout>
    )
}

export default ProfileContainer