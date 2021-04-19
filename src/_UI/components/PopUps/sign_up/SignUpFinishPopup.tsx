import React, {useCallback} from "react";
import {ButtonWrap, Container, Inner, TextWrap} from "./sign-up-finish-styles";
import {useDispatch, useSelector} from "react-redux";
import {authActions} from "../../../../_BLL/reducers/authReducer";
import {AppStateType} from "../../../../_BLL/store";
import ModalWindow from "../../_commonComponents/ModalWindow/ModalWindow";
import {useTranslation} from "react-i18next";

const SignUpFinishPopup = () => {
    let dispatch = useDispatch()
    let finishPopup = useSelector((state: AppStateType) => state.auth.finishPopup)

    let closeFinishPopup = useCallback(() => {
        dispatch(authActions.setOpenSignUp(false))
        dispatch(authActions.openFinishSignUpPopup(false))
    }, [dispatch])
    const {t} = useTranslation();
    return (
        <ModalWindow isOpen={finishPopup}>
            <Container>
                <Inner>
                    <TextWrap>{t("Error message/We will call your contact person soon.")}</TextWrap>
                    <ButtonWrap style={{textTransform: "uppercase"}} onClick={() => closeFinishPopup()}>{t("Add bank account/Got it!")}</ButtonWrap>
                </Inner>
            </Container>
        </ModalWindow>
    )
}

export default SignUpFinishPopup