import { MessageType, NotificationType } from "../../types/chat/ChatTypes";

const initialState = {
  message_history: [] as MessageType[],
  typing_user: null as { user_id: number; photo: string | null } | null,
  stop_typing: false,
  notification_list: [] as NotificationType[],
  chat_notifications_list: [] as NotificationType[],
};

type InitialStateType = typeof initialState;

export const chatOperationReducer = (
  state = initialState,
  action: commonOperationChatActions
): InitialStateType => {
  switch (action.type) {
    case "SET_MESSAGES_HISTORY":
      return {
        ...state,
        message_history: action.messages,
      };
    case "SET_MY_MESSAGE":
      return {
        ...state,
        message_history: [...state.message_history, action.my_message],
      };
    case "SET_USER_TYPING":
      return {
        ...state,
        typing_user: action.typing_user,
      };
    case "SET_NOTIFICATION_LIST":
      return {
        ...state,
        notification_list: action.notifications,
      };
    case "SET_NEW_NOTIFICATION":
      return {
        ...state,
        notification_list: [action.notification, ...state.notification_list],
      };
    case "SET_DELETED_MESSAGE_ID":
      return {
        ...state,
        message_history: state.message_history.filter(
          (m) => m.id != action.message_id
        ),
      };
    case "STOP_TYPING":
      return {
        ...state,
        stop_typing: action.stop_typing,
      };
    case "SET_FILE_TO_EMPTY_MESSAGE":
      return {
        ...state,
        message_history: state.message_history.map((m) => {
          if (m.id === action.message_id) {
            console.log("file", action.file);
            return { ...m, files: [action.file] };
          } else {
            return m;
          }
        }),
      };
    case "MARK_NOTIFICATION_AS_READ":
      return {
        ...state,
        notification_list: state.notification_list.map((n) => {
          if (n.id === action.id) {
            return { ...n, is_viewed: true };
          } else {
            return n;
          }
        }),
      };
    case "SET_CHAT_NOTIFICATIONS":
      return {
        ...state,
        chat_notifications_list: action.chat_notifications,
      };
    case "SET_NEW_CHAT_NOTIFICATION":
      return {
        ...state,
        chat_notifications_list: [
          action.notification,
          ...state.chat_notifications_list,
        ],
      };

    case "DELETE_CHAT_NOTIFICATION":
      return {
        ...state,
        chat_notifications_list: state.chat_notifications_list.filter(
          (n) => n.id !== action.id
        ),
      };

    default:
      return state;
  }
};

type AC<T> = T extends { [key: string]: (...args: any[]) => infer U }
  ? U
  : never;
export type commonOperationChatActions = AC<typeof operationChatActions>;

export const operationChatActions = {
  setMessagesHistory: (messages: MessageType[]) =>
    ({ type: "SET_MESSAGES_HISTORY", messages } as const),
  setMyMessage: (my_message: MessageType) =>
    ({ type: "SET_MY_MESSAGE", my_message } as const),
  setNotificationList: (notifications: NotificationType[]) =>
    ({ type: "SET_NOTIFICATION_LIST", notifications } as const),
  setNewNotification: (notification: NotificationType) =>
    ({ type: "SET_NEW_NOTIFICATION", notification } as const),
  setUserTyping: (
    typing_user: { user_id: number; photo: string | null } | null
  ) => ({ type: "SET_USER_TYPING", typing_user } as const),
  setDeletedMessageId: (message_id: number) =>
    ({ type: "SET_DELETED_MESSAGE_ID", message_id } as const),
  setStopTyping: (stop_typing: boolean) =>
    ({ type: "STOP_TYPING", stop_typing } as const),
  setFileToEmptyMessage: (file: string, message_id: number) =>
    ({ type: "SET_FILE_TO_EMPTY_MESSAGE", file, message_id } as const),
  markNotificationAsRead: (id: number) =>
    ({ type: "MARK_NOTIFICATION_AS_READ", id } as const),
  setChatNotificationsList: (chat_notifications: NotificationType[]) =>
    ({ type: "SET_CHAT_NOTIFICATIONS", chat_notifications } as const),
  setNewChatNotification: (notification: NotificationType) =>
    ({ type: "SET_NEW_CHAT_NOTIFICATION", notification } as const),
  deleteChatNotification: (id: number) =>
    ({ type: "DELETE_CHAT_NOTIFICATION", id } as const),
};
