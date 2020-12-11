import React from 'react'
import {
    LocalTimeWrapper,
    MessageText,
    MessageTextAnotherUser,
    MessageTypingWrapper,
    MessageWrapper,
    PhotoWrapper
} from "./chat-styles";
import user_icon from "../../../assets/icons/profile/defaultUserPhoto.svg";
import type_gif from "../../../assets/icons/operations/giphy.gif";

type PropsType = {
    my_photo?: string,
    person_photo?: string
}

const Message:React.FC<PropsType> = ({my_photo, person_photo}) => {
    return (
        <div style={{width: '100%', height: 'calc(100% - 70px)', paddingBottom: '30px', overflow: 'auto'}}>
            <MessageWrapper >
                <PhotoWrapper margin_right='19px' margin_left='0px'>
                    <img src={user_icon} alt=""/>
                </PhotoWrapper>
                <MessageTextAnotherUser>
                    Hi!
                </MessageTextAnotherUser>
                <LocalTimeWrapper margin='0 0 0 25px '>07:45 am</LocalTimeWrapper>
            </MessageWrapper>
            <MessageWrapper direction='row-reverse'>
                <PhotoWrapper><img src={my_photo ? my_photo : user_icon} alt=""/></PhotoWrapper>
                <MessageText>
                    hello, jjgkjgkjgkfgjfkgjfkgjfk
                </MessageText>
                <LocalTimeWrapper margin='0 25px 0 0'>07:44 am</LocalTimeWrapper>
            </MessageWrapper>
            <MessageWrapper direction='row-reverse'>
                <PhotoWrapper><img src={my_photo ? my_photo : user_icon} alt=""/></PhotoWrapper>
                <MessageText>
                    hello, jjgkjgkjgkfgjfkgjfkgjfk
                </MessageText>
                <LocalTimeWrapper margin='0 25px 0 0'>07:44 am</LocalTimeWrapper>
            </MessageWrapper>
            <MessageWrapper direction='row-reverse'>
                <PhotoWrapper><img src={my_photo ? my_photo : user_icon} alt=""/></PhotoWrapper>
                <MessageText>
                    hello, jjgkjgkjgkfgjfkgjfkgjfk
                </MessageText>
                <LocalTimeWrapper margin='0 25px 0 0'>07:44 am</LocalTimeWrapper>
            </MessageWrapper>
            <MessageWrapper direction='row-reverse'>
                <PhotoWrapper><img src={my_photo ? my_photo : user_icon} alt=""/></PhotoWrapper>
                <MessageText>
                    hello, jjgkjgkjgkfgjfkgjfkgjfk
                </MessageText>
                <LocalTimeWrapper margin='0 25px 0 0'>07:44 am</LocalTimeWrapper>
            </MessageWrapper>
            <MessageWrapper>
                <PhotoWrapper><img src={user_icon} alt=""/></PhotoWrapper>
                <MessageTypingWrapper>
                    <img src={type_gif} alt=""/>
                </MessageTypingWrapper>
            </MessageWrapper>
        </div>
    )
}

export default Message