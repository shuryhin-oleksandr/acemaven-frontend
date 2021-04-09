import React from "react";
import {
    CompleteButtonsWrapper, CompleteCancelButton, CompleteConfirmButton,
    CompleteOperationPopupContent,
    CompleteOperationPopupInner,
    CompleteOperationPopupWrapper, CompleteSubtitle, CompleteTitle
} from "./complete-operation-styles";
import {IconButton} from "@material-ui/core";
import close_icon from '../../../assets/icons/close-icon.svg';
import {VoidFunctionType} from "../../../../_BLL/types/commonTypes";
import {useTranslation} from "react-i18next";

type PropsType = {
    setCompleteOperationPopup: (value: boolean) => void,
    completeOperationHandler: VoidFunctionType
}

const CompleteOperationPopup:React.FC<PropsType> = ({setCompleteOperationPopup, completeOperationHandler}) => {
    const {t} = useTranslation();
    return (
        <CompleteOperationPopupWrapper>
            <CompleteOperationPopupInner>
                <IconButton onClick={() => setCompleteOperationPopup(false)}
                            style={{position: 'absolute', top: '20px', right: '20px'}}
                >
                    <img src={close_icon} alt=""/>
                </IconButton>
                <CompleteOperationPopupContent>
                    <CompleteTitle>{t("Confirm Operation/Confirm Operation Completion")}</CompleteTitle>
                    <CompleteSubtitle>
                        {t("Confirm Operation/Do you confirm that the payment for the service has been received or that you reached a payment agreement with the client for this shipment?")}
                    </CompleteSubtitle>
                    <CompleteButtonsWrapper>
                        <CompleteConfirmButton onClick={completeOperationHandler}>{t("Booking Confirmation/Confirm")}</CompleteConfirmButton>
                        <CompleteCancelButton onClick={() => setCompleteOperationPopup(false)}>{t("Booking Confirmation/Cancel")}</CompleteCancelButton>
                    </CompleteButtonsWrapper>
                </CompleteOperationPopupContent>
            </CompleteOperationPopupInner>
        </CompleteOperationPopupWrapper>
    )
}

export default CompleteOperationPopup