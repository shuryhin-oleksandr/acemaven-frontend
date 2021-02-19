import React, { useEffect } from "react";
//components

//styles
import {
  SupportInner,
  SupportOuter,
  SupportTitle,
  TopicName,
  TopicReason,
  TopicStatus,
  TopicWrap,
  SupportChatHeader,
} from "../help-support-styles";
import in_progress_icon from "../../../assets/icons/support/in_progress.svg";
import completed_icon from "../../../assets/icons/support/completed.svg";
import { AppStateType } from "../../../../_BLL/store";
import { withRouter } from "react-router-dom";
import { TicketType } from "../../../../_BLL/types/support_types/support_types";
import { useDispatch, useSelector } from "react-redux";
import ChatContainer from "../../operations/chat/ChatContainer";
import SpinnerForAuthorizedPages from "../../../components/_commonComponents/spinner/SpinnerForAuthorizedPages";

type PropsType = {};

const SupportChatPage: React.FC<PropsType> = () => {
  const ticket = useSelector(
    (state: AppStateType): TicketType | null =>
      state.support_reducer.current_ticket
  );

  return ticket ? (
    <SupportOuter>
      <SupportInner>
        <div style={{ maxWidth: "1000px" }}>
          <SupportTitle>Help and Support</SupportTitle>
          <SupportChatHeader>
            <TopicWrap>
              <TopicName color="#115B86">Topic:</TopicName>
              <TopicReason>{ticket?.topic}</TopicReason>
            </TopicWrap>
            <TopicWrap>
              <img src={in_progress_icon} alt="" />
              <TopicStatus>Completed</TopicStatus>
            </TopicWrap>
          </SupportChatHeader>
        </div>
        <ChatContainer chat={ticket?.chat} max_height_chat_area={"350px"} />
      </SupportInner>
    </SupportOuter>
  ) : (
    <SpinnerForAuthorizedPages />
  );
};

export default SupportChatPage;
