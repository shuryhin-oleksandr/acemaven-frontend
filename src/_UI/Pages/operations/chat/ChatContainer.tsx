import React, {useEffect, useState} from 'react'
//react-redux
import {useDispatch, useSelector} from "react-redux";
//BLL
import {AppStateType} from "../../../../_BLL/store";
import {
    getOperationMessagesHistorySelector, getStopTypingValueSelector, getTypingUserSelector
} from "../../../../_BLL/selectors/operation_chat/ChatOperationSelector";
import {operationChatActions} from "../../../../_BLL/reducers/chat_operation_reducer/chatOperationReducer";
import {
    addTypingUserThunk, deleteMessage, removeTypingUserThunk,
    sendMessageThunk,
    startMessagingListening,
    stopMessagingListening
} from "../../../../_BLL/thunks/operation_chat/OperationChatThunks";
//components
import Chat from "./Chat";


type PropsType = {
    chat: {chat: number, has_perm_to_read: boolean, has_perm_to_write: boolean} | undefined
}

const ChatContainer: React.FC<PropsType> = ({chat}) => {

    //data from store
    const messages_history = useSelector(getOperationMessagesHistorySelector)
    const my_info = useSelector((state: AppStateType) => state.profile.authUserInfo)
    const typing_user = useSelector(getTypingUserSelector)
    const stop_typing = useSelector(getStopTypingValueSelector)

    //local state
    const [inputText, setInputText] = useState('')

    //hooks
    const dispatch = useDispatch()
    //lifecycle
    useEffect(() => {
        if (chat && Object.keys(chat).length > 0 && chat?.chat) {
           dispatch(startMessagingListening(chat?.chat))
        }
        return () => {
             dispatch(stopMessagingListening())
        }
    }, [chat?.chat])


    //handlers
    const clearTypingUser = () => {
        dispatch(operationChatActions.setUserTyping(null))
    }
    let sendHandler = () => {
        !!inputText.trim() && dispatch(sendMessageThunk(inputText))
        setInputText('')
        clearTypingUser()
    }
    let focusHandler = () => {
        dispatch(addTypingUserThunk(my_info?.id))
    }
    let blurHandler = () => {
        dispatch(removeTypingUserThunk(my_info?.id))
    }
    let deleteHandler = (message_id: number) => {
        dispatch(deleteMessage(message_id))
    }

    return (
        <Chat message_history={messages_history}
              my_id={my_info?.id}
              typing_user={typing_user}
              stop_typing={stop_typing}
              clearTypingUser={clearTypingUser}
              setInputText={setInputText}
              inputText={inputText}
              sendHandler={sendHandler}
              focusHandler={focusHandler}
              blurHandler={blurHandler}
              deleteHandler={deleteHandler}
              chat_info={chat && Object.keys(chat).length > 0 ? chat : undefined }
        />
    )
}

export default ChatContainer

