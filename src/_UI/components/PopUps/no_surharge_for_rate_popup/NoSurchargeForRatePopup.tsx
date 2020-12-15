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
                        There are no surcharges. <br />
                        The rate won’t be posted until a matching surcharge agreement is
                        created
                    </NoPopupMessage>
                    <NoPopupButton onClick={surchargeHandler}>
                        Register new surcharge
                    </NoPopupButton>
                </NoPopupContent>
            </NoPopupInner>
        </NoPopupOuter>
    )
}

export default NoSurchargeForRatePopup