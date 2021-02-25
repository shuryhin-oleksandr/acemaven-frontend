import { Dispatch } from "redux";
import { operationChatActions } from "../reducers/chat_operation_reducer/chatOperationReducer";

export const wsChatHelper = (res: any, dispatch: Dispatch) => {
  switch (res.command) {
    case "messages": {
      dispatch(operationChatActions.setMessagesHistory(res.messages));
      break;
    }
    case "typing_message": {
      dispatch(operationChatActions.setStopTyping(false));
      dispatch(
        operationChatActions.setUserTyping({
          user_id: res.user_id,
          photo: res.photo,
        })
      );
      break;
    }
    case "stop_typing_message": {
      dispatch(operationChatActions.setStopTyping(true));
      break;
    }
    case "new_message": {
      dispatch(operationChatActions.setMyMessage(res.message));
      break;
    }
    case "notifications": {
      dispatch(operationChatActions.setNotificationList(res.notifications));
      break;
    }
    case "notification": {
      dispatch(operationChatActions.setNewNotification(res.notification));
      break;
    }
    case "delete_message": {
      dispatch(operationChatActions.setDeletedMessageId(res.message_id));
      break;
    }
    case "chat_notifications": {
      dispatch(
        operationChatActions.setChatNotificationsList(res.chat_notifications)
      );
      break;
    }
    case "chat_notification": {
      dispatch(
        operationChatActions.setNewChatNotification(res.chat_notification)
      );
      break;
    }
  }
};
