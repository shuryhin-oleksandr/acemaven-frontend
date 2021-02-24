import { Dispatch } from "redux";
import { wsChatHelper } from "../../helpers/wsChatHelper";
import { operationChatActions } from "../../reducers/chat_operation_reducer/chatOperationReducer";

let ws: WebSocket;
let interval: number;

export const startReceiveNotifications = (dispatch: Dispatch) => {
  let token = localStorage.getItem("access_token");
  const baseNotificationURL = `${process.env.REACT_APP_NOTIFICATIONS}?token=${token}`;
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
      stopReceiveNotifications(dispatch);
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
    startReceiveNotifications(dispatch); //check if websocket instance is closed, if so call `connect` function.
};

export const stopReceiveNotifications = (dispatch: Dispatch) => {
  console.log("close function");
  ws.close();
  dispatch(operationChatActions.setNotificationList([]));
};

export const markNotificationAsRead = (id: number, dispatch: Dispatch) => {
  try {
    ws.send(JSON.stringify({ command: "view_notification", id: id }));
    dispatch(operationChatActions.markNotificationAsRead(id));
  } catch (e) {
    console.log(e);
  }
};
