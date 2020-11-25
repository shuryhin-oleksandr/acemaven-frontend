import React from "react";
import CancelButton from "../../_commonComponents/buttons/navFormButtons/CancelButton";
import {ButtonsWrapper, CloseButton, Inner, PopupContent, PopupOuter, TextWrap} from "./surcharge-styles";
import BaseButton from "../../base/BaseButton";
import closeIcon from '../../../../_UI/assets/icons/close-icon.svg'

type PropsType = {
    setIsOpen?: (value: boolean) => void
}

const SurchargePopup: React.FC<PropsType> = ({setIsOpen}) => {
    return (
        <PopupOuter>
            <PopupContent>
                <CloseButton onClick={() => setIsOpen && setIsOpen(false)}>
                    <img src={closeIcon} alt=""/>
                </CloseButton>
                <Inner>
                    <TextWrap>There is no surcharge for these dates.</TextWrap>
                    <TextWrap> Do you want co create new or change existed?</TextWrap>
                    <ButtonsWrapper>
                        <BaseButton style={{width: '185px', padding: '0'}}>SAVE CHANGES</BaseButton>
                        <CancelButton text='CANCEL' setIsOpen={() => {}}/>
                    </ButtonsWrapper>
                </Inner>
            </PopupContent>
        </PopupOuter>
    )
}

export default SurchargePopup
