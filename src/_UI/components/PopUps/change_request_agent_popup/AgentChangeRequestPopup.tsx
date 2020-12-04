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

type PropsType = {
    setChangeRequestPopup: (value: boolean) => void
}

const AgentChangeRequestPopup:React.FC<PropsType> = ({setChangeRequestPopup}) => {
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
                    <ChangedInfoBlock />
                    <ChangeRequestForm />
                </ChangeRequestContent>
            </ChangeRequestInner>
        </ChangeRequestWrapper>
    )
}

export default AgentChangeRequestPopup