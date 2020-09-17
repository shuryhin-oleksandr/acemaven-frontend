import React from 'react'
import Layout from "../../components/BaseLayout/Layout";
import {useSelector} from "react-redux";
import {AppStateType} from "../../../_BLL/store";
import ProfilePage from "./ProfilePage";


const ProfileContainer:React.FC = () => {
    const isAuth = useSelector((state :AppStateType) => state.auth.isAuth)
    return (
        <Layout isAuth={isAuth}>
            <ProfilePage />
        </Layout>
    )
}

export default ProfileContainer