import { Dispatch } from "redux";
import { wsChatHelper } from "../../helpers/wsChatHelper";
import { operationChatActions } from "../../reducers/chat_operation_reducer/chatOperationReducer";

let ws: WebSocket;
let interval: any;

export const startReceiveChatNotifications = (dispatch: Dispatch) => {
  let token = localStorage.getItem("access_token");
  const baseNotificationURL = `${process.env.REACT_APP_CHAT_NOTIFICATIONS}?token=${token}`;
  try {
    ws = new WebSocket(baseNotificationURL);
    ws.onopen = () => {
      interval && clearInterval(interval);
    };
    ws.onmessage = (evt) => {
      const res = JSON.parse(evt.data);
      wsChatHelper(res, dispatch);
    };
    ws.onclose = function () {
      console.log("connections closed");
      interval = setTimeout(() => {
        check(dispatch);
      }, 3000);
    };

    ws.onerror = () => {
      stopReceiveChatNotifications(dispatch);
    };
  } catch (e) {
    console.log(e);
  }
};

const check = (dispatch: Dispatch) => {
  if (
    (!ws || ws.readyState == WebSocket.CLOSED) &&
    localStorage.getItem("access_token")
  )
    startReceiveChatNotifications(dispatch); //check if websocket instance is closed, if so call `connect` function.
};

export const stopReceiveChatNotifications = (dispatch: Dispatch) => {
  console.log("close function");
  ws.close();
  dispatch(operationChatActions.setChatNotificationsList([]));
};

export const deleteChatNotification = (id: number, dispatch: Dispatch) => {
  try {
    ws.send(JSON.stringify({ command: "view_notification", id: id }));
    dispatch(operationChatActions.deleteChatNotification(id));
  } catch (e) {
    console.log(e);
  }
};
