import React, {useEffect} from 'react'
import Layout from "../../../components/BaseLayout/Layout";
import Chat from "./Chat";
import {
    getOperationMessagesHistorySelector,
    getTypingUserIdSelector
} from "../../../../_BLL/selectors/operation_chat/ChatOperationSelector";
import {useDispatch, useSelector} from "react-redux";
import {operationChatActions} from "../../../../_BLL/reducers/chat_operation_reducer/chatOperationReducer";
import {AppStateType} from "../../../../_BLL/store";
import {wsChatHelper} from "../../../../_BLL/helpers/wsChatHelper";




const ChatContainer:React.FC = () => {
   const dispatch = useDispatch()


    const token = localStorage.getItem('access_token')
    const baseUrl = `ws://192.168.1.33:8000/ws/operation-chat/3/?token=${token}`

    const ws = new WebSocket(baseUrl)
    const messages_history = useSelector(getOperationMessagesHistorySelector)
    const my_info = useSelector((state: AppStateType) => state.profile.authUserInfo)
    const typing_user_id = useSelector(getTypingUserIdSelector)

    //handlers
    const clearTypingUser = () => {
       dispatch(operationChatActions.setUserTyping(0))
    }



    useEffect(() => {
        ws.onopen = function () {
            console.log('connected...')

        }
        //HISTORY
        ws.onmessage = evt => {
            // listen to data sent from the websocket server
            const res = JSON.parse(evt.data)
            wsChatHelper(res, dispatch)
            console.log(res)
        }
        //on close
        ws.onclose = function(event) {
            console.error("WebSocket error observed:", event);
        };

    }, [])



    return (
        <Layout>
           <Chat message_history={messages_history}
                 my_id={my_info?.id}
                 typing_user_id={typing_user_id}
                 clearTypingUser={clearTypingUser}
           />
        </Layout>
    )
}

export default ChatContainer