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
    chat_id: number | null | undefined
}

const ChatContainer: React.FC<PropsType> = ({chat_id}) => {
    const dispatch = useDispatch()

    const messages_history = useSelector(getOperationMessagesHistorySelector)

    const my_info = useSelector((state: AppStateType) => state.profile.authUserInfo)
    const typing_user = useSelector(getTypingUserSelector)
    const stop_typing = useSelector(getStopTypingValueSelector)

    //handlers
    const clearTypingUser = () => {
        dispatch(operationChatActions.setUserTyping(null))
    }

    useEffect(() => {
        if (chat_id) {
           dispatch(startMessagingListening(chat_id))
        }
        return () => {
             dispatch(stopMessagingListening())
        }
    }, [chat_id])



    //local state
    const [inputText, setInputText] = useState('')
    //handlers
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
        />
    )
}

export default ChatContainer


/*

if (socket) {
    socket.onopen = function () {
        console.log('connected...')
    }
    //HISTORY
    socket.onmessage = evt => {
        // listen to data sent from the websocket server
        const res = JSON.parse(evt.data)
        wsChatHelper(res, dispatch)
        console.log(res)
    }
    //on close
    socket.onclose = function (event) {
        console.error("WebSocket error observed:", event);
    };
}*/
