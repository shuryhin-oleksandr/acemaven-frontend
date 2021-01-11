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

type PropsType = {
    setCompleteOperationPopup: (value: boolean) => void,
    completeOperationHandler: VoidFunctionType
}

const CompleteOperationPopup:React.FC<PropsType> = ({setCompleteOperationPopup, completeOperationHandler}) => {
    return (
        <CompleteOperationPopupWrapper>
            <CompleteOperationPopupInner>
                <IconButton onClick={() => setCompleteOperationPopup(false)}
                            style={{position: 'absolute', top: '20px', right: '20px'}}
                >
                    <img src={close_icon} alt=""/>
                </IconButton>
                <CompleteOperationPopupContent>
                    <CompleteTitle>Confirm operation completion</CompleteTitle>
                    <CompleteSubtitle>
                        Do you confirm that the payment for the service has been received
                        or has you reached a payment agreement with the client for this shipment?
                    </CompleteSubtitle>
                    <CompleteButtonsWrapper>
                        <CompleteConfirmButton onClick={completeOperationHandler}>confirm</CompleteConfirmButton>
                        <CompleteCancelButton onClick={() => setCompleteOperationPopup(false)}>cancel</CompleteCancelButton>
                    </CompleteButtonsWrapper>
                </CompleteOperationPopupContent>
            </CompleteOperationPopupInner>
        </CompleteOperationPopupWrapper>
    )
}

export default CompleteOperationPopup