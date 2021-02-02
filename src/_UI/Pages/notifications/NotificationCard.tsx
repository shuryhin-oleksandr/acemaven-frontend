import React from "react";
import {
  BlockWrapper,
  CardOuter,
  IconWrapper,
  NotificationsBlock,
  NotificationsDate,
  NotificationsDescription,
} from "./notifications-style";
import request_icon from "../../assets/icons/operations/request_icon.svg";
import operation_icon from "../../assets/icons/operations/operation-icon.svg";
import { IconButton } from "@material-ui/core";
import close_icon from "../../assets/icons/close-icon.svg";
import { NotificationType } from "../../../_BLL/types/chat/ChatTypes";
import moment from "moment";
import { markNotificationAsRead } from "../../../_BLL/thunks/notifications_thunk/notifications_thunk";
import { useHistory } from "react-router-dom";

type PropsType = {
  close_button?: boolean;
  notification: NotificationType;
  idx: number;
};

const chooseIcon = (section: string) => {
  switch (section) {
    case "operations":
      return operation_icon;
    case "requests":
      return request_icon;
    default:
      return request_icon;
  }
};

const NotificationCard: React.FC<PropsType> = ({
  close_button,
  notification,
  idx,
}) => {
  const history = useHistory();

  const findPath = (id: number, path: string) => {
    switch (path) {
      case "booking":
        return `/requests/booking/${id}/`;
      case "operation":
        return `/operations/${id}/`;
      case "surcharge":
        return `/services/surcharge/${id}`;
      case "freight_rate":
        return `/services/rate/${id}/`;
      case "billing":
        return `/billing_pending/`;
      default:
        return "/";
    }
  };

  const notificationClickHandler = (id: number, action_path: string) => {
    markNotificationAsRead(notification.id);
    const path = findPath(notification.id, notification.action_path);
    history.push(path);
  };

  return (
    <CardOuter
      onClick={() => {
        notificationClickHandler(notification.id, notification.action_path);
      }}
      idx={idx}
      is_viewed={notification.is_viewed}
    >
      {close_button && (
        <IconButton style={{ position: "absolute", top: "5px", right: "5px" }}>
          <img src={close_icon} alt="" />
        </IconButton>
      )}
      <IconWrapper>
        <img src={chooseIcon(notification.section)} alt="" />
      </IconWrapper>
      <BlockWrapper>
        <NotificationsBlock>{notification.section}</NotificationsBlock>
        <NotificationsDate>
          {moment(notification.date_created).format("YYYY-MM-DD hh:mm A")}
        </NotificationsDate>
        <NotificationsDescription>
          {notification?.text}
        </NotificationsDescription>
      </BlockWrapper>
    </CardOuter>
  );
};

export default NotificationCard;
