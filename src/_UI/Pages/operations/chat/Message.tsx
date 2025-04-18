import React, {useState} from 'react'
//moment js
import moment from "moment/moment";
//components
import MessageContent from "./MessageContent";
//types
import {MessageType} from "../../../../_BLL/types/chat/ChatTypes";
//styles
import {
    DeleteWrap,
    LocalTimeWrapper,
    MessageText,
    MessageTextAnotherUser,
    MessageWrapper,
    PhotoWrapper
} from "./chat-styles";
//icons
import user_icon from "../../../assets/icons/profile/defaultUserPhoto.svg";
import delete_icon from '../../../assets/icons/operations/delete_gray.svg'


type PropsType = {
    message: MessageType,
    my_id: number | undefined,
    deleteHandler: (value: number) => void
}

const Message: React.FC<PropsType> = ({my_id, message, ...props}) => {

    const [isDelete, setIsDelete] = useState(false)


    return (
        <div style={{width: '100%', marginBottom: '28.5px', minHeight: '50px'}}
             onPointerEnter={() => message.user_id === my_id && setIsDelete(true)}
             onPointerLeave={() => message.user_id === my_id && setIsDelete(false)}
        >
            {(message.user_id !== my_id)
                ? <MessageWrapper>
                    <PhotoWrapper margin_right='19px' margin_left='0px'>
                        <img src={message.photo ? message.photo : user_icon} alt=""/>
                    </PhotoWrapper>
                    <MessageTextAnotherUser>
                        <MessageContent message={message}/>
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
                        <MessageContent message={message}/>
                    </MessageText>
                    <div style={{display: 'flex', flexDirection: 'column'}}>
                        <LocalTimeWrapper margin='0 25px 5px 0'>
                            {moment(message.date_created).format(" h:mm a")}
                        </LocalTimeWrapper>
                        {isDelete
                        && <DeleteWrap onClick={() => props.deleteHandler(message.id)}>
                            <img src={delete_icon} alt=""/>
                        </DeleteWrap>
                        }
                    </div>
                </MessageWrapper>
            }
        </div>
    )
}

export default Message