import {MessageType} from "../../types/chat/ChatTypes";


const initialState = {
    message_history: [] as MessageType[],
    typing_user: 0
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
        default:
            return state;
    }
};

type AC<T> = T extends { [key: string]: (...args: any[]) => infer U } ? U : never;
export type commonOperationChatActions = AC<typeof operationChatActions>;

export const operationChatActions = {
    setMessagesHistory: (messages: MessageType[]) => ({type: 'SET_MESSAGES_HISTORY', messages} as const),
    setMyMessage: (my_message: MessageType) => ({type: 'SET_MY_MESSAGE', my_message} as const),
    setUserTyping: (typing_user: number) => ({type: 'SET_USER_TYPING', typing_user} as const)
};
