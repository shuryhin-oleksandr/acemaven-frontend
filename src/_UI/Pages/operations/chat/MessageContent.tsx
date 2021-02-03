import React from 'react'
//axios
import axios from "axios";
//js-file-download
import fileDownload from "js-file-download";
//material ui
import {IconButton} from "@material-ui/core";
import GetAppIcon from "@material-ui/icons/GetApp";
import grey from "@material-ui/core/colors/grey";
//types
import {MessageType} from "../../../../_BLL/types/chat/ChatTypes";


const MessageContent: React.FC<{ message: MessageType | null }> = ({message}) => {

    const handleDownload = (url: string) => {
        axios.get(url, {
            responseType: 'blob',
        })
            .then((res) => {
                let filename = url.substring(url.lastIndexOf('/') + 1)
                fileDownload(res.data, filename)
            })
    }

    return (
        <>
            {message?.content
                ? <span>{message?.content}</span>
                : <div style={{
                    display: 'flex',
                    width: '300px',
                    justifyContent: 'space-between',
                    alignItems: "center"
                }}>
                                <span style={{
                                    maxWidth: '230px',
                                    textOverflow: 'ellipsis',
                                    overflow: 'auto',
                                    width: '100%'
                                }}>
                                    {message?.files.length > 0 && message?.files[0].substring(message?.files[0].lastIndexOf('/') + 1)}
                                </span>
                    <IconButton onClick={() => handleDownload(message?.files[0])}
                                style={{
                                    border: '2px solid rgba(255, 255, 255, .3)',
                                    padding: '2px',
                                    width: '34px',
                                    height: '34px'
                                }}
                    >
                        <GetAppIcon style={{fontSize: 24, color: grey[50]}}/>
                    </IconButton>
                </div>
            }
        </>
    )
}

export default MessageContent
