import {operationChatActions} from "../reducers/chat_operation_reducer/chatOperationReducer";

import {Dispatch} from "redux";



export const wsChatHelper = (res: any, dispatch: Dispatch) => {
    switch (res.command) {
        case 'messages': {
            dispatch(operationChatActions.setMessagesHistory(res.messages))
            break
        }
        case 'typing_message': {
            dispatch(operationChatActions.setUserTyping(res.user_id))
            break
        }
        case 'new_message': {
            dispatch(operationChatActions.setMyMessage(res.message))
            break
        }
        case "notifications": {
            dispatch(operationChatActions.setNotificationList(res.notifications))
        }
    }
}
