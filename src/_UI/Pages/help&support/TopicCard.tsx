import React from "react";
//styles
import {
  TopicDescription,
  TopicHeader,
  TopicInner,
  TopicName,
  TopicOuter,
  TopicReason,
  TopicStatus,
  TopicWrap,
  UnreadMessageCount,
  UnreadMessageTitle,
  UnreadMessageWrap,
} from "./help-support-styles";
//icons
import in_progress_icon from "../../assets/icons/support/in_progress.svg";
import completed_icon from "../../assets/icons/support/completed.svg";
import { TicketType } from "../../../_BLL/types/support_types/support_types";
import { useHistory } from "react-router-dom";

type PropsType = {
  ticket: TicketType;
};

const TopicCard: React.FC<PropsType> = ({ ticket }) => {
  const history = useHistory();
  return (
    <TopicOuter
      onClick={() => {
        history.push(`/support/${ticket.id}/`);
      }}
    >
      <TopicInner>
        <TopicHeader>
          <TopicWrap>
            <TopicName>Topic:</TopicName>
            <TopicReason>{ticket.topic}</TopicReason>
          </TopicWrap>
          <TopicWrap width="110px" >
            <img
              src={
                ticket.status === "in_progress"
                  ? in_progress_icon
                  : completed_icon
              }
              alt=""
            />
            <TopicStatus>
              {ticket.status === "in_progress" ? "In progress" : "Completed"}
            </TopicStatus>
          </TopicWrap>
        </TopicHeader>
        <TopicDescription>{ticket.description}</TopicDescription>
        {!!ticket.unread_messages && (
          <UnreadMessageWrap>
            <UnreadMessageTitle>Unread messages:</UnreadMessageTitle>
            <UnreadMessageCount>{ticket.unread_messages}</UnreadMessageCount>
          </UnreadMessageWrap>
        )}
      </TopicInner>
    </TopicOuter>
  );
};

export default TopicCard;
