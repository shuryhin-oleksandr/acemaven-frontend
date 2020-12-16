import React from 'react'
import {
    BlockWrapper,
    CardOuter,
    IconWrapper,
    NotificationsBlock,
    NotificationsDate,
    NotificationsDescription
} from "./notifications-style";
import request_icon from '../../assets/icons/operations/request_icon.svg'
import {IconButton} from "@material-ui/core";
import close_icon from '../../assets/icons/close-icon.svg'

type PropsType = {
    close_button?: boolean
}

const NotificationCard: React.FC<PropsType> = ({close_button}) => {
    return (
        <CardOuter>
            {close_button &&
            <IconButton style={{position: 'absolute', top: '5px', right: '5px'}}>
                <img src={close_icon} alt=""/>
            </IconButton>
            }
            <IconWrapper>
                <img src={request_icon} alt=""/>
            </IconWrapper>
            <BlockWrapper>
                <NotificationsBlock>
                    Requests
                </NotificationsBlock>
                <NotificationsDate>
                    2017-02-03 09:20 AM
                </NotificationsDate>
                <NotificationsDescription>
                    The Client has requested a change in the hipment Aceid, from Origin to Destination.
                </NotificationsDescription>
            </BlockWrapper>
        </CardOuter>
    )
}

export default NotificationCard