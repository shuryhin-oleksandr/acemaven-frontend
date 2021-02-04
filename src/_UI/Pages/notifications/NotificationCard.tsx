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
import rate_surcharge_icon from "../../assets/icons/operations/rate-notification-icon.svg";
import { IconButton } from "@material-ui/core";
import close_icon from "../../assets/icons/close-icon.svg";
import { NotificationType } from "../../../_BLL/types/chat/ChatTypes";
import moment from "moment";
import { markNotificationAsRead } from "../../../_BLL/thunks/notifications_thunk/notifications_thunk";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";

type PropsType = {
  close_button?: boolean;
  notification: NotificationType;
  idx: number;
};

const chooseIcon = (section: string) => {
  switch (section) {
    case "requests":
      return request_icon;
    case "surcharges":
    case "freight_rates":
      return rate_surcharge_icon;
    default:
      return operation_icon;
  }
};

const NotificationCard: React.FC<PropsType> = ({
  close_button,
  notification,
  idx,
}) => {
  const history = useHistory();
  const dicpatch = useDispatch();

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

  const notificationClickHandler = (
    operation_id: number,
    action_path: string,
    notification_id: number,
    is_viewed: boolean
  ) => {
    !is_viewed && markNotificationAsRead(notification_id, dicpatch);
    const path = findPath(operation_id, action_path);
    history.push(path);
  };

  return (
    <CardOuter
      onClick={() => {
        notificationClickHandler(
          notification.object_id,
          notification.action_path,
          notification.id,
          notification.is_viewed
        );
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
