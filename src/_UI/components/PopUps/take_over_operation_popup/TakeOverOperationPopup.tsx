import React from 'react'
import {
    CancelTakeOverButton, TakeOverActions,
    TakeOverButton,
    TakeOverContent,
    TakeOverInner, TakeOverTitle,
    TakeOverWrapper
} from "./take-over-operation-styles";
import {IconButton} from "@material-ui/core";
import close_icon from '../../../assets/icons/close-icon.svg'
import {VoidFunctionType} from "../../../../_BLL/types/commonTypes";
import {useTranslation} from "react-i18next";

type PropsType = {
    setTakeOver: (value: boolean) => void,
    takeOverAsyncHandler:VoidFunctionType
}


const TakeOverOperationPopup:React.FC<PropsType> = ({setTakeOver, takeOverAsyncHandler}) => {
    const {t} = useTranslation();
    return (
        <TakeOverWrapper>
            <TakeOverInner>
                <IconButton style={{position: 'absolute', top: '20px', right: '20px'}}
                            onClick={() => setTakeOver(false)}
                >
                    <img src={close_icon} alt=""/>
                </IconButton>
                <TakeOverContent>
                    <TakeOverTitle>{t("Booking Confirmation/Are you sure you want to take over this booking?")}</TakeOverTitle>
                    <TakeOverActions>
                        <TakeOverButton onClick={takeOverAsyncHandler}>{t("Bookings/CONFIRM")}</TakeOverButton>
                        <CancelTakeOverButton onClick={() => setTakeOver(false)}>{t("Bookings/CANCEL")}</CancelTakeOverButton>
                    </TakeOverActions>
                </TakeOverContent>
            </TakeOverInner>
        </TakeOverWrapper>
    )
}

export default TakeOverOperationPopup