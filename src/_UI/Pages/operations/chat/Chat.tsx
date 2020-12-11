import React from "react";
import {
    ChatInner,
    ChatWrapper, MessageInput, MessageInputWrapper, PhotoWrapper,
} from "./chat-styles";
import {useSelector} from "react-redux";
import {AppStateType} from "../../../../_BLL/store";
import Message from "./Message";
import {IconButton} from "@material-ui/core";
import send_icon from '../../../assets/icons/operations/send_mesage.svg'
import user_icon from "../../../assets/icons/profile/defaultUserPhoto.svg";


type PropsType = {

}

const Chat:React.FC<PropsType> = ({}) => {

    const my_photo = useSelector((state: AppStateType) => state.profile.authUserInfo?.photo)


    return (
        <ChatWrapper>
            <ChatInner>
                <Message my_photo={my_photo}/>
                <div style={{display: 'flex', alignItems: 'center'}}>
                    <MessageInputWrapper>
                        <MessageInput placeholder='Type something'/>
                        <IconButton style={{position: 'absolute', right: '10px'}}
                                    onClick={() => {}}
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