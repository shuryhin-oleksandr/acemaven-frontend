import React, {useEffect} from 'react'
//types
import {MessageType} from "../../../../../_BLL/types/chat/ChatTypes";
//components
import ScrollbarStyled from "../../../../components/_commonComponents/ScrollbarStyled/ScrollbarStyled";
import Message from "../Message";
//styles
import {ChatContent, MessageTypingWrapper, MessageWrapper, PhotoWrapper} from "../chat-styles";
//icons
import user_icon from "../../../../assets/icons/profile/defaultUserPhoto.svg";
import type_gif from "../../../../assets/icons/operations/giphy.gif";


type PropsType = {
    my_id: number | undefined,
    typing_user: {user_id: number, photo: string | null} | null,
    message_history: MessageType[],
    deleteHandler: (value: number) => void,
    stop_typing: boolean,
    max_height_chat_area:string
}


const ChatHistoryContent: React.FC<PropsType> = ({typing_user, my_id, message_history,max_height_chat_area, ...props}) => {

    useEffect(() => {
        let chat = document.getElementById('chat_content')
        chat &&
        (chat.scrollTop = chat?.scrollHeight)
    }, [message_history])


    return (
        <ScrollbarStyled {...{
            style: {height: "auto", width: "100%", flex: "none", backgroundColor: "#ffffff"},
            autoHeightMin: max_height_chat_area,
            autoHeight: true,
            navBar: true
        }}>
            <ChatContent id={'chat_content'} max_height_chat_area={max_height_chat_area}>
                {message_history.map(m => <Message key={m.id}
                                                   message={m}
                                                   my_id={my_id}
                                                   deleteHandler={props.deleteHandler}
                    />
                )}
                {( typing_user && typing_user.user_id !== my_id && !props.stop_typing)
                && <MessageWrapper style={{marginBottom: '30px'}}>
                    <PhotoWrapper margin_left='0px'>
                        <img src={typing_user?.photo ? typing_user?.photo : user_icon} alt=""/>
                    </PhotoWrapper>
                    <MessageTypingWrapper>
                        <img src={type_gif} alt=""/>
                    </MessageTypingWrapper>
                </MessageWrapper>}
            </ChatContent>
        </ScrollbarStyled>
    )
}

export default ChatHistoryContent