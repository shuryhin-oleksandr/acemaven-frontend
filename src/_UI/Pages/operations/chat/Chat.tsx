import React, {useState} from "react";
import {
    ChatContent,
    ChatInner,
    ChatWrapper, MessageInput, MessageInputWrapper, MessageTypingWrapper, MessageWrapper, PhotoWrapper,
} from "./chat-styles";
import {useSelector} from "react-redux";
import {AppStateType} from "../../../../_BLL/store";
import Message from "./Message";
import {IconButton} from "@material-ui/core";
import send_icon from '../../../assets/icons/operations/send_mesage.svg'
import user_icon from "../../../assets/icons/profile/defaultUserPhoto.svg";
import {MessageType} from "../../../../_BLL/types/chat/ChatTypes";
import type_gif from "../../../assets/icons/operations/giphy.gif";
import {VoidFunctionType} from "../../../../_BLL/types/commonTypes";


type PropsType = {
    message_history: MessageType[],
    my_id: number | undefined,
    typing_user_id: number,
    clearTypingUser: VoidFunctionType
}

const Chat: React.FC<PropsType> = ({message_history, my_id, typing_user_id, clearTypingUser}) => {

    const [inputText, setInputText] = useState('')

    const my_photo = useSelector((state: AppStateType) => state.profile.authUserInfo?.photo)


    const token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoxMywidXNlcm5hbWUiOiJuc29mdEBuc29mdC5uc29mdCIsImV4cCI6MTYxMjEwMzQ4NSwiZW1haWwiOiJuc29mdEBuc29mdC5uc29mdCIsIm9yaWdfaWF0IjoxNjExODQ0Mjg1fQ.17jawIzqiTbmQCHnKIDhjkOL5Tsgb40_cJHeYY89nCE"
    const baseUrl = `ws://192.168.1.33:8000/ws/operation-chat/3/?token=${token}`

    const ws = new WebSocket(baseUrl)
    let sendHandler = () => {
        ws.send(JSON.stringify({'command': 'new_message', 'message': inputText}))
        setInputText('')
        clearTypingUser()

    }
    let focusHandler = () => {
        ws.send(JSON.stringify({"command": "typing_message", "user_id": my_id}))

    }


    return (
        <ChatWrapper>
            <ChatInner>
                <ChatContent>
                    {message_history.map(m => <Message key={m.id}
                                                       message={m}
                                                       my_id={my_id}
                        />
                    )}
                    {(!!typing_user_id && typing_user_id !== my_id)
                    && <MessageWrapper style={{marginBottom: '30px'}}>
                        <PhotoWrapper>
                            <img src={user_icon} alt=""/>
                        </PhotoWrapper>
                        <MessageTypingWrapper>
                            <img src={type_gif} alt=""/>
                        </MessageTypingWrapper>
                    </MessageWrapper>}
                </ChatContent>
                <div style={{display: 'flex', alignItems: 'center'}}>
                    <MessageInputWrapper>
                        <MessageInput placeholder='Type something'
                                      value={inputText}
                                      onFocus={() => focusHandler()}
                                      //rows={1}
                            // @ts-ignore
                                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => setInputText(e.currentTarget.value)}
                        />
                        <IconButton style={{position: 'absolute', right: '5px'}}
                                    onClick={() => sendHandler()}
                        >
                            <img src={send_icon} alt=""/>
                        </IconButton>
                    </MessageInputWrapper>
                    <PhotoWrapper>
                        <img src={my_photo ? my_photo : user_icon} alt=""/>
                    </PhotoWrapper>
                </div>

            </ChatInner>
        </ChatWrapper>

    )
}

export default Chat