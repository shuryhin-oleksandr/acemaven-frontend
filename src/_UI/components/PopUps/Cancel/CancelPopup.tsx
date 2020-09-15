import React from 'react';
import {ButtonsWrap, CancelButton, CancelTitle, CloseBtn, PopupContainer, PopupContent} from "./cancel-popup-styles";
import {VoidFunctionType} from "../../../../_BLL/types/commonTypes";
const close = require('../../../../_UI/assets/icons/close-icon.svg') as string

type PropsTypes = {
    setIsOpen: VoidFunctionType
}

const CancelPopup:React.FC<PropsTypes> = ({setIsOpen}) => {



    return (
        <PopupContainer>
            <PopupContent>
                <CloseBtn onClick={() => setIsOpen(false)}><img src={close} alt=""/></CloseBtn>
                <CancelTitle>Are you sure you want to cancel company registration?</CancelTitle>
                <ButtonsWrap>
                    <CancelButton>Cancel registration</CancelButton>
                    <CancelButton>Continue registration</CancelButton>
                </ButtonsWrap>
            </PopupContent>
        </PopupContainer>
    )
}

export default CancelPopup