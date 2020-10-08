import React, {useEffect} from 'react'
import {Inner, Title, Wrapper} from "./additional-user-styles";
import UserCompleteForm from './UserCompleteForm';
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../../../../_BLL/store";
import {useLocation} from "react-router";
import {checkToken} from "../../../../_BLL/reducers/authReducer";
import CheckedTokenPopup from "../../../components/PopUps/checked_token/checkedTokenPopup";

const AdditionalUserContainer:React.FC = () => {
    const checkedTokenError = useSelector((state: AppStateType) => state.auth.checkTokenError)
    const dispatch = useDispatch()
    const location = useLocation()
    useEffect(() => {
        console.log(location.search.substr(7))
        dispatch(checkToken(location.search.substr(7)))
    }, [dispatch])

    return (
       <>
           {checkedTokenError
               ? <CheckedTokenPopup />
               : <Wrapper>
                   <Inner>
                       <Title>Complete Profile</Title>
                       <UserCompleteForm token={location.search.substr(7)}/>
                   </Inner>
               </Wrapper>
           }
       </>

    )
}

export default AdditionalUserContainer