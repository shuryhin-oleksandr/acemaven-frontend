import React, {useEffect} from 'react'
import {Inner, Title, Wrapper} from "./additional-user-styles";
import UserCompleteForm from './UserCompleteForm';
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../../../../_BLL/store";
import {useLocation} from "react-router";
import {checkToken} from "../../../../_BLL/thunks/auth/authThunks";
import CheckedTokenPopup from "../../../components/PopUps/checked_token/checkedTokenPopup";

const AdditionalUserContainer:React.FC = () => {

    const checkedTokenError = useSelector((state: AppStateType) => state.auth.checkTokenError)
    const email_error = useSelector((state: AppStateType) => state.auth.additionalUserEmailError)

    const dispatch = useDispatch()
    const location = useLocation()
    useEffect(() => {
        dispatch(checkToken(location.search.substr(7)))
    }, [dispatch])

    return (
       <>
           {checkedTokenError
               ? <CheckedTokenPopup />
               : <Wrapper>
                   <Inner>
                       <Title>Complete Profile</Title>
                       <UserCompleteForm token={location.search.substr(7)}
                                         email_error={email_error}
                       />
                   </Inner>
               </Wrapper>
           }
       </>

    )
}

export default AdditionalUserContainer