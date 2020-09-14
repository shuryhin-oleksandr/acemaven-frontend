import React from 'react';
import {ButtonsWrap, CancelTitle, PopupContainer, PopupContent} from "./cancel-popup-styles";

const CancelPopup:React.FC = () => {
    return (
        <PopupContainer>
            <PopupContent>
                <CancelTitle>Are you sure you want to cancel company registration?</CancelTitle>
                <ButtonsWrap>f</ButtonsWrap>
            </PopupContent>
        </PopupContainer>
    )
}

export default CancelPopup