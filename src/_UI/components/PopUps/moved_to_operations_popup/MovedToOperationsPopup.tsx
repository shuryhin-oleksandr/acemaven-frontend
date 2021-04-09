import React from 'react'
//material ui
import {IconButton} from "@material-ui/core";
//styles
import {
    OperationsPopupButton,
    OperationsPopupContent,
    OperationsPopupInner,
    OperationsPopupMessage,
    OperationsPopupOuter
} from "./moved-to-operations-styles";
//icons
import close_icon from '../../../assets/icons/close-icon.svg'
import {useDispatch} from "react-redux";
import {agentBookingActions} from "../../../../_BLL/reducers/booking/agentBookingReducer";
import {useTranslation} from "react-i18next";


type PropsType = {
    setMovedToOperations: (value: boolean) => void
}

const MovedToOperationsPopup:React.FC<PropsType> = ({setMovedToOperations}) => {
    const dispatch = useDispatch();

    let closePopupHandler = () => {
        setMovedToOperations(false)
        dispatch(agentBookingActions.setAcceptSuccess(''))
    }
    const {t} = useTranslation();
    return (
        <OperationsPopupOuter>
            <OperationsPopupInner>
                <IconButton onClick={closePopupHandler}
                            style={{position: 'absolute', top: '20px', right: '20px'}}
                >
                    <img src={close_icon} alt=""/>
                </IconButton>
                <OperationsPopupContent>
                    <OperationsPopupMessage>
                        {t("Bookings/The request will be moved to the operations.")} <br/>
                        {t("Bookings/You can find it in mine section.")}
                    </OperationsPopupMessage>
                    <OperationsPopupButton onClick={closePopupHandler} style={{textTransform: "uppercase"}}>{t("Add bank account/Got it!")}</OperationsPopupButton>
                </OperationsPopupContent>
            </OperationsPopupInner>
        </OperationsPopupOuter>
    )
}

export default MovedToOperationsPopup