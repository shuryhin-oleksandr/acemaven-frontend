import {Dispatch} from "redux";
import {
    commonOperationChatActions,
    operationChatActions
} from "../../reducers/chat_operation_reducer/chatOperationReducer";
import {wsChatAPI} from "../../../_DAL/API/operations/chat/SocketChatAPI";
import {MessageType} from "../../types/chat/ChatTypes";


let _newMessageHandler: ((messages: MessageType[]) => void) | null = null;
const newMessageHandlerCreator = (dispatch: any) => (messages: MessageType[]) => {
    if (_newMessageHandler === null) {
        _newMessageHandler = (messages) => {
            dispatch(operationChatActions.setMessagesHistory(messages))
        }
    }

    return _newMessageHandler
}

export const startMessagingListening = (chat_id: number) => {
    return (dispatch: any) => {
        try {
            wsChatAPI.startConnection(chat_id, dispatch)

            wsChatAPI.subscribe(newMessageHandlerCreator(dispatch))
        } catch (e) {
            console.log(e)
        }
    }
}


export const stopMessagingListening = () => {
    return async (dispatch: Dispatch<commonOperationChatActions>) => {
        try {
            wsChatAPI.unsubscribe(newMessageHandlerCreator(dispatch))
            wsChatAPI.stopConnection()
        } catch (e) {
            console.log(e)
        }
    }
}

export const sendMessageThunk = (message: string) => {
    return async (dispatch: Dispatch<commonOperationChatActions>) => {
        try {
            wsChatAPI.sendMessage(message)

        } catch (e) {
            console.log(e)
        }
    }
}

export const addTypingUserThunk = (user_id: number | undefined) => {
    return async () => {
        try {
            user_id && wsChatAPI.focusTyping(user_id)
        } catch (e) {
            console.log(e)
        }
    }
}
export const removeTypingUserThunk = (user_id: number | undefined) => {
    return async (dispatch: Dispatch<commonOperationChatActions>) => {
        try {
            wsChatAPI.removeFocusTyping(user_id)
            dispatch(operationChatActions.setUserTyping(null))
        } catch (e) {
            console.log(e)
        }
    }
}
export const deleteMessage = (message_id: number | undefined) => {
    return async () => {
        try {
            wsChatAPI.deleteMessage(message_id)
        } catch (e) {
            console.log(e)
        }
    }
}
