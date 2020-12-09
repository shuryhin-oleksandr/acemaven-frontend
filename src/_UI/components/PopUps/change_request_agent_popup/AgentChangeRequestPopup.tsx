import React from 'react'
import {
    ChangeRequestContent,
    ChangeRequestInner,
    ChangeRequestTitle,
    ChangeRequestWrapper
} from "./change-request-agent-styles";
import {IconButton} from "@material-ui/core";
import close_icon from '../../../assets/icons/close-icon.svg'
import ChangeRequestForm from "./ChangeRequestForm";
import ChangedInfoBlock from "./ChangedInfoBlock";
import {OperationType} from "../../../../_BLL/types/operations/operationsTypes";


type PropsType = {
    setChangeRequestPopup: (value: boolean) => void,
    operation_info: OperationType | null
}

const AgentChangeRequestPopup:React.FC<PropsType> = ({setChangeRequestPopup, operation_info}) => {


    return (
        <ChangeRequestWrapper>
            <ChangeRequestInner>
                <IconButton style={{position: 'absolute', top: '20px', right: '20px'}} onClick={() => setChangeRequestPopup(false)}>
                    <img src={close_icon} alt=""/>
                </IconButton>
                <ChangeRequestContent>
                    <ChangeRequestTitle>
                        The client has requested the following changes
                    </ChangeRequestTitle>
                    <ChangedInfoBlock operation_info={operation_info ? operation_info : null}/>
                    {operation_info?.status === 'Booking Confirmed' &&
                        <ChangeRequestForm operation_info={operation_info ? operation_info : null}
                        />
                    }

                </ChangeRequestContent>
            </ChangeRequestInner>
        </ChangeRequestWrapper>
    )
}

export default AgentChangeRequestPopup