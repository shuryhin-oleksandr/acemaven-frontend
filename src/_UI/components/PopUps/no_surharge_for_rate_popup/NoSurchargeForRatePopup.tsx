import React from 'react'
import {
    NoPopupButton,
    NoPopupContent,
    NoPopupInner,
    NoPopupMessage,
    NoPopupOuter
} from "./no-surcharge-for-rate-popup-styles";
import {IconButton} from "@material-ui/core";
import close_icon from '../../../assets/icons/close-icon.svg'
import {useDispatch} from "react-redux";
import {rateActions} from "../../../../_BLL/reducers/surcharge&rates/rateReducer";
import {useTranslation} from "react-i18next";


type PropsType = {
    setNoSurchargePopup: (value: boolean) => void,
    setNewSurchargePopUpVisible: (value: boolean) => void,
}

const NoSurchargeForRatePopup:React.FC<PropsType> = ({setNoSurchargePopup, setNewSurchargePopUpVisible}) => {

    const dispatch = useDispatch()

    let surchargeHandler = () => {
        setNoSurchargePopup(false)
        setNewSurchargePopUpVisible(true)
        dispatch(rateActions.setEmptyExistingSurcharge(""));
    }

    let closeHandler = () => {
        setNoSurchargePopup(false)
        dispatch(rateActions.setEmptyExistingSurcharge(""));
    }
    const {t} = useTranslation();
    return (
        <NoPopupOuter>
            <NoPopupInner>
                <IconButton style={{position: 'absolute', top: '20px', right: '20px'}}
                            onClick={closeHandler}
                >
                    <img src={close_icon} alt=""/>
                </IconButton>
                <NoPopupContent>
                    <NoPopupMessage>
                        {t("Freight rates/There are no surcharges. The rate won´t be posted until a matching surcharge agreement is created. ")}
                    </NoPopupMessage>
                    <NoPopupButton onClick={surchargeHandler}>
                        {t("Freight rates/REGISTER NEW SURCHARGE")}
                    </NoPopupButton>
                </NoPopupContent>
            </NoPopupInner>
        </NoPopupOuter>
    )
}

export default NoSurchargeForRatePopup