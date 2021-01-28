import React, {useEffect} from 'react'
import Layout from "../../../components/BaseLayout/Layout";
import Chat from "./Chat";
import {io} from "socket.io-client";
/*const socket = io('ws/operation-chat/');*/



const ChatContainer:React.FC = () => {
    const id = 3
    const baseUrl = 'http://192.168.1.33:8000'
    const token = "JWT eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoyMSwidXNlcm5hbWUiOiJuc29mdEBuc29mdC5jb20iLCJleHAiOjE2MTE4NDU2MTksImVtYWlsIjoibnNvZnRAbnNvZnQuY29tIiwib3JpZ19pYXQiOjE2MTE1ODY0MTl9.zReyOctsEWluW-WRCt3gtfKfXKu8Se8WXAkeDpTeeM8"


    useEffect(() => {

        /*const ws = new WebSocket(baseUrl)
        ws.onopen = function () {
            document.cookie = token
            console.log('connected...')
        }*/
        const socket = io(baseUrl, {
            path: '/chat'
        })
        socket.on('connect', () => {
            console.log('connected...')
        })
    }, [])




    return (
        <Layout>
           <Chat />
        </Layout>
    )
}

export default ChatContainer