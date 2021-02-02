import {MessageType, NotificationType} from "../../types/chat/ChatTypes";


const initialState = {
    message_history: [] as MessageType[],
    typing_user: null as {user_id: number, photo: string | null} | null,
    stop_typing: false,
    sent_status: '',
    notification_list: [] as NotificationType[]
};

type InitialStateType = typeof initialState;

export const chatOperationReducer = (state = initialState, action: commonOperationChatActions): InitialStateType => {
    switch (action.type) {
        case "SET_MESSAGES_HISTORY":
            return {
                ...state,
                message_history: action.messages
            }
        case "SET_MY_MESSAGE":
            return {
                ...state,
                message_history: [...state.message_history, action.my_message]
            }
        case "SET_USER_TYPING":
            return {
                ...state,
                typing_user: action.typing_user
            }
        case "SET_NOTIFICATION_LIST":
            return {
                ...state,
                notification_list: action.notifications
            }
        case "SET_NEW_NOTIFICATION":
            return{
                ...state,
                notification_list: [action.notification,...state.notification_list]
            }
        case "SET_DELETED_MESSAGE_ID":
            return {
                ...state,
                message_history: state.message_history.filter(m => m.id !== action.message_id)
            }
        case "STOP_TYPING":
            return {
                ...state,
                stop_typing: action.stop_typing
            }
        case "SET_SENT":
            return {
                ...state,
                sent_status: action.sent
            }
        default:
            return state;
    }
};

type AC<T> = T extends { [key: string]: (...args: any[]) => infer U } ? U : never;
export type commonOperationChatActions = AC<typeof operationChatActions>;

export const operationChatActions = {
    setMessagesHistory: (messages: MessageType[]) => ({type: 'SET_MESSAGES_HISTORY', messages} as const),
    setMyMessage: (my_message: MessageType) => ({type: 'SET_MY_MESSAGE', my_message} as const),
    setNotificationList:(notifications:NotificationType[]) =>({type: "SET_NOTIFICATION_LIST", notifications} as const),
    setNewNotification:(notification:NotificationType) =>({type: "SET_NEW_NOTIFICATION", notification} as const)
    setUserTyping: (typing_user: { user_id: number, photo: string | null } | null) => ({type: 'SET_USER_TYPING', typing_user} as const),
    setDeletedMessageId: (message_id: number) => ({type: 'SET_DELETED_MESSAGE_ID', message_id} as const),
    setStopTyping: (stop_typing: boolean) => ({type: 'STOP_TYPING', stop_typing} as const ),
    setSent: (sent: string) => ({type:'SET_SENT', sent} as const)
};
