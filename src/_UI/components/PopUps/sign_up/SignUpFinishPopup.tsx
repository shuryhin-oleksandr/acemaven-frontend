import React, {useCallback} from "react";
import {ButtonWrap, Container, Inner, TextWrap} from "./sign-up-finish-styles";
import {useDispatch} from "react-redux";
import {authActions} from "../../../../_BLL/reducers/authReducer";
import {VoidFunctionType} from "../../../../_BLL/types/commonTypes";

type PropsType = {
    openSignUp: VoidFunctionType
}

const SignUpFinishPopup:React.FC<PropsType> = ({openSignUp}) => {
    let dispatch = useDispatch()

    let closeFinishPopup = useCallback(() => {
        openSignUp(false)
        dispatch(authActions.openFinishSignUpPopup(false))
    }, [])

    return (
        <Container>
            <Inner>
                <TextWrap>We will call your contact person soon.</TextWrap>
                <ButtonWrap onClick={() => closeFinishPopup()}>GOT IT!</ButtonWrap>
            </Inner>
        </Container>
    )
}

export default SignUpFinishPopup