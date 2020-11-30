import React, {useCallback} from "react";
import {ButtonWrap, Container, Inner, TextWrap} from "./sign-up-finish-styles";
import {useDispatch, useSelector} from "react-redux";
import {authActions} from "../../../../_BLL/reducers/authReducer";
import {AppStateType} from "../../../../_BLL/store";
import ModalWindow from "../../_commonComponents/ModalWindow/ModalWindow";

const SignUpFinishPopup = () => {
    let dispatch = useDispatch()
    let finishPopup = useSelector((state: AppStateType) => state.auth.finishPopup)

    let closeFinishPopup = useCallback(() => {
        dispatch(authActions.setOpenSignUp(false))
        dispatch(authActions.openFinishSignUpPopup(false))
    }, [dispatch])

    return (
        <ModalWindow isOpen={finishPopup}>
            <Container>
                <Inner>
                    <TextWrap>We will call your contact person soon.</TextWrap>
                    <ButtonWrap onClick={() => closeFinishPopup()}>GOT IT!</ButtonWrap>
                </Inner>
            </Container>
        </ModalWindow>
    )
}

export default SignUpFinishPopup