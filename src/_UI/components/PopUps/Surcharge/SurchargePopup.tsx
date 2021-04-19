import React from "react";
import CancelButton from "../../_commonComponents/buttons/navFormButtons/CancelButton";
import {ButtonsWrapper, CloseButton, Inner, PopupContent, PopupOuter, TextWrap} from "./surcharge-styles";
import BaseButton from "../../base/BaseButton";
import closeIcon from '../../../../_UI/assets/icons/close-icon.svg'
import {useTranslation} from "react-i18next";

type PropsType = {
    setIsOpen?: (value: boolean) => void
}

const SurchargePopup: React.FC<PropsType> = ({setIsOpen}) => {
    const {t} = useTranslation();
    return (
        <PopupOuter>
            <PopupContent>
                <CloseButton onClick={() => setIsOpen && setIsOpen(false)}>
                    <img src={closeIcon} alt=""/>
                </CloseButton>
                <Inner>
                    <TextWrap>{t("Error message/There is no surcharge for these dates.")}</TextWrap>
                    <TextWrap> {t("Error message/Do you want co create new or change existed?")}</TextWrap>
                    <ButtonsWrapper>
                        <BaseButton style={{width: '185px', padding: '0'}}>{t("My Profile/SAVE CHANGES")}</BaseButton>
                        <CancelButton text={t('Bookings/CANCEL')} setIsOpen={() => {}}/>
                    </ButtonsWrapper>
                </Inner>
            </PopupContent>
        </PopupOuter>
    )
}

export default SurchargePopup
