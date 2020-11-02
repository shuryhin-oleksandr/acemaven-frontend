import React from 'react'
import {
    AssignActions, AssignCancel, AssignConfirm,
    PopupContent,
    PopupInner,
    PopupTitle,
    PopupWrapper,

} from "./assign-master-to-booking-styles";
import {IconButton} from "@material-ui/core";
import close_icon from "../../../assets/icons/close-icon.svg";


type PropsType = {
    setAssignConfirmation: (value: boolean) => void,
    setAssignAgent: (value: boolean) => void,
    agent_full_name: string
}

const AssignConfirmationPopup:React.FC<PropsType> = ({setAssignAgent, setAssignConfirmation, agent_full_name}) => {
    let closeHandler = () => {
        setAssignConfirmation(false)
        setAssignAgent(true)
    }
    return (
        <PopupWrapper >
            <PopupInner height='200px'>
                <IconButton onClick={closeHandler}
                            style={{top: '20px', right: '20px',width: '12px',height: '12px', position: 'absolute'}}
                >
                    <img src={close_icon} alt=""/>
                </IconButton>
                <PopupContent>
                    <PopupTitle>Are you sure you want to assign {'this'} booking to <span style={{textTransform: 'capitalize'}}>{agent_full_name}</span>
                    </PopupTitle>
                    <AssignActions>
                        <AssignConfirm>CONFIRM</AssignConfirm>
                        <AssignCancel onClick={closeHandler}>CANCEL</AssignCancel>
                    </AssignActions>
                </PopupContent>
            </PopupInner>
        </PopupWrapper>
    )
}

export default AssignConfirmationPopup