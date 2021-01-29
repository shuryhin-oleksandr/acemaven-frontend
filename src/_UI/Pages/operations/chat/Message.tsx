import React from 'react'
import {
    LocalTimeWrapper,
    MessageText,
    MessageTextAnotherUser,
    MessageWrapper,
    PhotoWrapper
} from "./chat-styles";
import user_icon from "../../../assets/icons/profile/defaultUserPhoto.svg";
import {MessageType} from "../../../../_BLL/types/chat/ChatTypes";
import moment from "moment/moment";

type PropsType = {
    message: MessageType,
    my_id: number | undefined,
}

const Message: React.FC<PropsType> = ({my_id, message}) => {


    return (
        <div style={{width: '100%', marginBottom: '28.5px', minHeight: '50px'}}>
            {(message.user_id !== my_id)
                ? <MessageWrapper>
                    <PhotoWrapper margin_right='19px' margin_left='0px'>
                        <img src={message.photo ? message.photo : user_icon} alt=""/>
                    </PhotoWrapper>
                    <MessageTextAnotherUser>
                        {message.content}
                    </MessageTextAnotherUser>
                    <LocalTimeWrapper margin='0 0 0 25px '>
                        {moment(message.date_created).format(" h:mm a")}
                    </LocalTimeWrapper>
                </MessageWrapper>
                : <MessageWrapper direction='row-reverse'>
                    <PhotoWrapper>
                        <img src={message.photo ? message.photo : user_icon} alt=""/>
                    </PhotoWrapper>
                    <MessageText>
                        {message.content}
                    </MessageText>
                    <LocalTimeWrapper margin='0 25px 0 0'>
                        {moment(message.date_created).format(" h:mm a")}
                    </LocalTimeWrapper>
                </MessageWrapper>
            }
        </div>
    )
}

export default Message