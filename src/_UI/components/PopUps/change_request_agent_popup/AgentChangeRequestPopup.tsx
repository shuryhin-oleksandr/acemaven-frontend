import React from 'react'
//material ui
import {IconButton} from "@material-ui/core";
//types
import {AppOperationBookingStatusesType, OperationType} from "../../../../_BLL/types/operations/operationsTypes";
//components
import ChangeRequestForm from "./ChangeRequestForm";
import ChangedInfoBlock from "./ChangedInfoBlock";
//styles
import {
    ChangeRequestContent,
    ChangeRequestInner,
    ChangeRequestTitle,
    ChangeRequestWrapper
} from "./change-request-agent-styles";
//icons
import close_icon from '../../../assets/icons/close-icon.svg'


type PropsType = {
    setChangeRequestPopup: (value: boolean) => void,
    operation_info: OperationType | null
}

const AgentChangeRequestPopup: React.FC<PropsType> = ({setChangeRequestPopup, operation_info}) => {


    return (
        <ChangeRequestWrapper>
            <ChangeRequestInner>
                <IconButton style={{position: 'absolute', top: '20px', right: '20px'}}
                            onClick={() => setChangeRequestPopup(false)}>
                    <img src={close_icon} alt=""/>
                </IconButton>
                <ChangeRequestContent>
                    <ChangeRequestTitle>
                        The client has requested the following changes
                    </ChangeRequestTitle>
                    <ChangedInfoBlock operation_info={operation_info ? operation_info : null}/>
                    {(
                        (operation_info?.status === AppOperationBookingStatusesType.CHANGE_REQUEST) ||
                        (operation_info?.status === AppOperationBookingStatusesType.AWAITING_PAYMENT)
                    )
                    &&
                    <ChangeRequestForm operation_info={operation_info ? operation_info : null}
                    />
                    }

                </ChangeRequestContent>
            </ChangeRequestInner>
        </ChangeRequestWrapper>
    )
}

export default AgentChangeRequestPopup