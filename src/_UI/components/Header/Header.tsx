import * as React from "react";
import {
  ButtonWrap,
  HeaderContainer,
  LogoWrap,
  PhotoWrap,
} from "./header-styles";
import { useDispatch, useSelector } from "react-redux";
import { AppStateType } from "../../../_BLL/store";
import styled from "styled-components";
import { signOut } from "../../../_BLL/thunks/auth/authThunks";
import Tooltip from "@material-ui/core/Tooltip";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router";
import logotype from "../../../_UI/assets/icons/landing/inline_logo.svg";
import notification from "../../../_UI/assets/icons/clarity_notification-solid-badged.svg";
import no_notification from "../../../_UI/assets/icons/no-notification-ring.svg";
import card from "../../../_UI/assets/icons/card.svg";
import user from "../../../_UI/assets/icons/profile/defaultUserPhoto.svg";
import { NavLink } from "react-router-dom";
import NotificationCard from "../../Pages/notifications/NotificationCard";
import { SectionWrapper } from "../../Pages/notifications/notifications-style";

const useStyles = makeStyles({
  customTooltip: {
    "& .MuiTooltip-arrow::before": {
      backgroundColor: "#FFFFFF",
      border: "1px solid #828282",
    },
    borderRadius: "4px",
    boxShadow: "0px 5px 10px rgba(0, 0, 0, 0.25)",
    backgroundColor: "#FFFFFF",
    border: "1px solid #828282",
    padding: "20px 25px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  customNotificationTooltip: {
    "& .MuiTooltip-arrow::before": {
      backgroundColor: "#FFFFFF",
      border: "1px solid #828282",
    },
    borderRadius: "5px",
    boxShadow: "0px 5px 10px rgba(0, 0, 0, 0.25)",
    backgroundColor: "#FFFFFF",
    border: "1px solid #828282",
    padding: "0",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    maxWidth: "376px",
    width: "100%",
  },
});

const Header: React.FC = () => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const history = useHistory();

  let profilePhoto = useSelector(
    (state: AppStateType) => state.profile.authUserInfo?.photo
  );

  let notifications_list = useSelector(
    (state: AppStateType) => state.chat_operation.notification_list
  );

  const has_new_notifications = notifications_list?.some((n) => !n.is_viewed);

  return (
    <HeaderContainer>
      <LogoWrap onClick={() => history.push("/")}>
        <img src={logotype} alt="" />
      </LogoWrap>
      <Info>
        <ButtonWrap>
          <img src={card} alt="" />
        </ButtonWrap>

        <Tooltip
          arrow
          interactive
          classes={{ tooltip: classes.customNotificationTooltip }}
          title={
            <SectionWrapper
            // onClick={() => history.push("/notifications")}
            >
              {notifications_list.map((i, idx) => (
                <NotificationCard key={i.id} notification={i} idx={idx} />
              ))}
            </SectionWrapper>
          }
        >
          <ButtonWrap>
            <img
              src={has_new_notifications ? notification : no_notification}
              alt=""
            />
          </ButtonWrap>
        </Tooltip>

        <Tooltip
          arrow
          interactive
          classes={{ tooltip: classes.customTooltip }}
          title={
            <StyledUl>
              <StyledTooltipItem onClick={() => dispatch(signOut(history))}>
                Log out
              </StyledTooltipItem>
              <NavLink
                to="/settings/profile"
                style={{ textDecoration: "none" }}
              >
                <StyledTooltipItem>My profile</StyledTooltipItem>
              </NavLink>
            </StyledUl>
          }
        >
          <PhotoWrap>
            <img src={profilePhoto ? profilePhoto : user} alt="" />
          </PhotoWrap>
        </Tooltip>
      </Info>
    </HeaderContainer>
  );
};

export default Header;

const Info = styled.div`
  max-width: 115px;
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

const StyledUl = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
`;

const StyledTooltipItem = styled.li`
  font-family: "Helvetica Reg", sans-serif;
  cursor: pointer;
  font-size: 18px;
  line-height: 21px;
  color: #1b1b25;
  margin-bottom: 15px;
  :last-child {
    margin-bottom: 0;
  }
`;
