import { Dispatch } from "redux";
import { wsChatHelper } from "../../helpers/wsChatHelper";

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
      stopReceiveNotifications();
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

export const stopReceiveNotifications = () => {
  console.log("close function");
  ws.close();
};

export const markNotificationAsRead = (id: number) => {
  try {
    console.log("HERE ID", id);
    ws.send(JSON.stringify({ command: "view_notification", id: id }));
  } catch (e) {
    console.log(e);
  }
};
