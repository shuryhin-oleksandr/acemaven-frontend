import React from "react";
//material ui
import { IconButton } from "@material-ui/core";
import AttachFileIcon from "@material-ui/icons/AttachFile";
import grey from "@material-ui/core/colors/grey";
import ErrorOutlineOutlinedIcon from "@material-ui/icons/ErrorOutlineOutlined";
//react-redux
import { useSelector } from "react-redux";
//API
import { wsChatAPI } from "../../../../_DAL/API/operations/chat/SocketChatAPI";
//BLL
import { AppStateType } from "../../../../_BLL/store";
//types
import { MessageType } from "../../../../_BLL/types/chat/ChatTypes";
import { VoidFunctionType } from "../../../../_BLL/types/commonTypes";
//components
import ChatHistoryContent from "./chat_content/ChatHistoryContent";
//styles
import {
  ChatInner,
  ChatWrapper,
  LabelUpload,
  MessageInput,
  MessageInputWrapper,
  NoPermissionIcon,
  NoPermissionsMessage,
  NoPermissionsWrap,
  PhotoWrapper,
  UploadInput,
  UploadWrapper,
} from "./chat-styles";
//icons
import send_icon from "../../../assets/icons/operations/send_mesage.svg";
import user_icon from "../../../assets/icons/profile/defaultUserPhoto.svg";
import {useTranslation} from "react-i18next";

type PropsType = {
  message_history: MessageType[];
  my_id: number | undefined;
  typing_user: { user_id: number; photo: string | null } | null;
  clearTypingUser: VoidFunctionType;
  setInputText: any;
  inputText: string;
  focusHandler: VoidFunctionType;
  blurHandler: VoidFunctionType;
  sendHandler: VoidFunctionType;
  deleteHandler: (value: number) => void;
  stop_typing: boolean;
  chat_info:
    | { chat: number; has_perm_to_read: boolean; has_perm_to_write: boolean }
    | undefined;
  max_height_chat_area: string;
};

const Chat: React.FC<PropsType> = ({
  message_history,
  my_id,
  typing_user,
  clearTypingUser,
  inputText,
  setInputText,
  max_height_chat_area,
  ...props
}) => {
  //data from store
  const my_photo = useSelector(
    (state: AppStateType) => state.profile.authUserInfo?.photo
  );

  const keyHandler = (e: any) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      props.sendHandler();
      props.blurHandler();
    } else {
      e.currentTarget.value.length === 2 &&
        e.key !== "Delete" &&
        e.key !== "Backspace" &&
        props.focusHandler();
      e.currentTarget.value.length < 2 && props.blurHandler();
    }
  };

  const onUpload = (acceptedFiles: any) => {
    const formData = new FormData();
    const file = acceptedFiles[0];
    formData.append("file", file);
    wsChatAPI
      .addFiles(formData)
      .then((res) => wsChatAPI.sendMessage("", res.data.id))
      .catch((e) => console.log(e));

    //   let reader = new FileReader()
    // reader.readAsArrayBuffer(file)
    //   reader.onload = function() {
    //       console.log(reader.result);
    //   };
  };
  const {t} = useTranslation();
  return (
    <ChatWrapper>
      <ChatInner>
        <ChatHistoryContent
          message_history={message_history}
          my_id={my_id}
          typing_user={typing_user}
          deleteHandler={props.deleteHandler}
          stop_typing={props.stop_typing}
          max_height_chat_area={max_height_chat_area}
        />
        {props.chat_info?.has_perm_to_write ? (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              borderTop: "1px solid #bdbdbd",
              paddingTop: "25px",
            }}
          >
            <UploadWrapper>
              <LabelUpload htmlFor="upload">
                <AttachFileIcon style={{ fontSize: 24, color: grey[900] }} />
              </LabelUpload>
              <UploadInput
                name="file"
                type="file"
                id="upload"
                onChange={(e) => onUpload(e.target.files)}
              />
            </UploadWrapper>
            <MessageInputWrapper>
              <MessageInput
                placeholder={t("Bookings/Message")}
                value={inputText}
                //onFocus={() => props.focusHandler()}
                //onBlur={() => props.blurHandler()}
                onKeyDown={(e) => keyHandler(e)}
                // @ts-ignore
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setInputText(e.currentTarget.value)
                }
              />
              <IconButton
                style={{ position: "absolute", right: "5px" }}
                onClick={props.sendHandler}
              >
                <img src={send_icon} alt="" />
              </IconButton>
            </MessageInputWrapper>
            <PhotoWrapper>
              <img src={my_photo ? my_photo : user_icon} alt="" />
            </PhotoWrapper>
          </div>
        ) : (
          <NoPermissionsWrap>
            <NoPermissionIcon>
              <ErrorOutlineOutlinedIcon />
            </NoPermissionIcon>
            <NoPermissionsMessage>
              {t("Operations/You don't have permissions to write")}
            </NoPermissionsMessage>
          </NoPermissionsWrap>
        )}
      </ChatInner>
    </ChatWrapper>
  );
};

export default Chat;
