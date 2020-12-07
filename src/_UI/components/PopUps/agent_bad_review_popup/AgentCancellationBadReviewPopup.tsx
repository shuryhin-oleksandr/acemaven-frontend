import React from 'react'
import {
    CancelOperationByAgentContent,
    CancelOperationByAgentInner, CancelOperationByAgentWrapper, CancelOperationSubtitle
} from "../cancel_operation_by_agent_popup/cancel-operation-by-agent-styles";
import {IconButton} from "@material-ui/core";
import close_icon from "../../../assets/icons/close-icon.svg";
import {
    CompleteButtonsWrapper,
    CompleteConfirmButton
} from "../complete_operation_by_agent/complete-operation-styles";
import {VoidFunctionType} from "../../../../_BLL/types/commonTypes";

type PropsType = {
    setBadReviewHandler: VoidFunctionType
}

const AgentCancellationBadReviewPopup:React.FC<PropsType> = ({setBadReviewHandler}) => {
    return (
        <CancelOperationByAgentWrapper>
            <CancelOperationByAgentInner>
                <IconButton onClick={setBadReviewHandler}
                            style={{position: 'absolute', top: '20px', right: '20px'}}
                >
                    <img src={close_icon} alt=""/>
                </IconButton>
                <CancelOperationByAgentContent content_padding='118px 120px 60px'>
                        <CancelOperationSubtitle>
                            Please, keep your company rates up to date to avoid bad reviews with cancellations.
                            It’s now up to the current client to leave a low rate to your company for this operation.
                        </CancelOperationSubtitle>
                    <CompleteButtonsWrapper>
                        <CompleteConfirmButton onClick={setBadReviewHandler}>got it</CompleteConfirmButton>
                    </CompleteButtonsWrapper>
                </CancelOperationByAgentContent>
            </CancelOperationByAgentInner>
        </CancelOperationByAgentWrapper>
    )
}

export default AgentCancellationBadReviewPopup