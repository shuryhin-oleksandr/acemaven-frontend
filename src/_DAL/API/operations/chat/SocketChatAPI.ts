import {MessageType} from "../../../../_BLL/types/chat/ChatTypes";
import {wsChatHelper} from "../../../../_BLL/helpers/wsChatHelper";
import {Dispatch} from "redux";
import instance from "../../axiosConfig";

type SubscriberType = (messages: MessageType[]) => void;

let subscribers = [] as SubscriberType[]

let ws: WebSocket | null = null;
let interval: number;

// const closeHandler = () => {
//     setTimeout(createChannel, 2000)
// }
const messageHandler =  function(e: any, dispatch: Dispatch) {

    const newMessages = JSON.parse(e.data)
    wsChatHelper(newMessages, dispatch)
    subscribers.forEach(s => s(newMessages))
}




function createChannel(chat_id: number, dispatch: Dispatch) {
    clearInterval(interval);
    let token = localStorage.getItem('access_token')
    ws = new WebSocket(process.env.REACT_APP_WEB_SOCKET_CHAT_URL + `/${chat_id}/?token=${token}`)

    ws.onclose = function () {
        console.log("connections closed");
        interval = setTimeout(() => {
            createChannel(chat_id,dispatch);
        }, 3000);
    };


     ws.addEventListener("message", (e) => messageHandler(e, dispatch))


   // ws.onmessage = evt => {
   //      // listen to data sent from the websocket server
   //      const res = JSON.parse(evt.data)
   //      wsChatHelper(res, dispatch)
   //      console.log('event', evt)
   //  }
}

export const wsChatAPI =  {
    startConnection(chat_id: number, dispatch: Dispatch) {
        createChannel(chat_id, dispatch)
    },
    stopConnection () {
        subscribers = []
        // ws?.removeEventListener('close', closeHandler)
        //ws?.removeEventListener('messages', messageHandler)
        ws?.close()
        clearInterval(interval);
    },
    subscribe(callback: SubscriberType) {
        subscribers.push(callback);
    },
    unsubscribe(callback: SubscriberType) {
        subscribers.filter(s => s !== callback)
    },
    sendMessage (message: string, file_id?: number) {
        ws?.send(JSON.stringify({'command': 'new_message', 'message': message, "files": file_id ? [file_id] : []})) //+ "files": [id]
    },
    focusTyping (user_id: number) {
        ws?.send(JSON.stringify({"command": "typing_message", "user_id": user_id}))
    },
    removeFocusTyping (user_id: number | undefined) {
        ws?.send(JSON.stringify({"command": "stop_typing_message", "user_id": user_id}))
    },
    deleteMessage(message_id: number | undefined) {
        ws?.send(JSON.stringify({"command": "delete_message", "message_id": message_id}))
    },
    addFiles (formData: FormData) {
        return instance.post('/websockets/file/', formData)
    },
    fileUploading (message_id: number) {
        ws?.send(JSON.stringify({"command": "file_uploading", "message_id": message_id}))
    },
    fileUploaded(message_id: number) {
        ws?.send(JSON.stringify({"command": "file_uploaded", "message_id": message_id}))
    }
}
