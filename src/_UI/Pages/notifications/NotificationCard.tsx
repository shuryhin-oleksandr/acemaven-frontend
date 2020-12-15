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

type PropsType = {

}

const NotificationCard:React.FC<PropsType> = ({}) => {
    return (
        <CardOuter>
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