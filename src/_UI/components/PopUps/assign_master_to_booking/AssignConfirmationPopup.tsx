import React, {useEffect} from 'react'
import {
    AssignActions, AssignCancel, AssignConfirm,
    PopupContent,
    PopupInner,
    PopupTitle,
    PopupWrapper,

} from "./assign-master-to-booking-styles";
import {IconButton} from "@material-ui/core";
import close_icon from "../../../assets/icons/close-icon.svg";
import {VoidFunctionType} from "../../../../_BLL/types/commonTypes";
import {useDispatch, useSelector} from "react-redux";
import {getAssignSuccess} from "../../../../_BLL/selectors/booking/bookingAgentSelector";
import {agentBookingActions} from "../../../../_BLL/reducers/booking/agentBookingReducer";
import {useTranslation} from "react-i18next";


type PropsType = {
    setAssignConfirmation: (value: boolean) => void,
    setAssignAgent: (value: boolean) => void,
    agent_full_name: string,
    assign_thunk: VoidFunctionType
}

const AssignConfirmationPopup:React.FC<PropsType> = ({setAssignAgent, setAssignConfirmation, agent_full_name, assign_thunk}) => {
    let closeHandler = () => {
        setAssignConfirmation(false)
        setAssignAgent(false)
    }

    const dispatch = useDispatch()
    let assign_success = useSelector(getAssignSuccess)
    useEffect(() => {
        if(assign_success) {
            closeHandler()
            dispatch(agentBookingActions.setAssignSuccess(''))
        }
    }, [assign_success])
    const {t} = useTranslation();
    return (
        <PopupWrapper >
            <PopupInner height='200px'>
                <IconButton onClick={closeHandler}
                            style={{top: '20px', right: '20px',width: '12px',height: '12px', position: 'absolute'}}
                >
                    <img src={close_icon} alt=""/>
                </IconButton>
                <PopupContent>
                    <PopupTitle>{t("Bookings/Are you sure you want to assign this Booking to")} {'this '}<span style={{textTransform: 'capitalize'}}>{agent_full_name}</span> ?
                    </PopupTitle>
                    <AssignActions>
                        <AssignConfirm onClick={assign_thunk}>{t("Bookings/CONFIRM")}</AssignConfirm>
                        <AssignCancel onClick={closeHandler}>{t("Bookings/CANCEL")}</AssignCancel>
                    </AssignActions>
                </PopupContent>
            </PopupInner>
        </PopupWrapper>
    )
}

export default AssignConfirmationPopup