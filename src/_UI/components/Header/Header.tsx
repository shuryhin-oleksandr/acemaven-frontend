import * as React from "react";
//material ui
import Tooltip from "@material-ui/core/Tooltip";
import {makeStyles} from "@material-ui/core/styles";
//react-router + react-router-dom
import {useHistory} from "react-router";
import {NavLink} from "react-router-dom";
//react-redux
import {useDispatch, useSelector} from "react-redux";
//BLL
import {AppStateType} from "../../../_BLL/store";
import {signOut} from "../../../_BLL/thunks/auth/authThunks";
//components
import NotificationCard from "../../Pages/notifications/NotificationCard";
import {
    ButtonWrap,
    HeaderContainer,
    Info,
    LogoWrap,
    PhotoWrap, StyledTooltipItem, StyledUl,
} from "./header-styles";
import {
    NoNotificationCard,
    SectionWrapper,
} from "../../Pages/notifications/notifications-style";
//icons
import logotype from "../../../_UI/assets/icons/landing/inline_logo.svg";
import notification from "../../../_UI/assets/icons/clarity_notification-solid-badged.svg";
import no_notification from "../../../_UI/assets/icons/no-notification-ring.svg";
import card from "../../../_UI/assets/icons/card.svg";
import user from "../../../_UI/assets/icons/profile/defaultUserPhoto.svg";
import ExchangeRateTooltipCard from "./ExchangeRateTooltipCard";


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
  customTooltipExchange: {
    "& .MuiTooltip-arrow::before": {
      backgroundColor: "#FFFFFF",
      border: "1px solid #828282",
    },
    borderRadius: "4px",
    boxShadow: "0px 5px 10px rgba(0, 0, 0, 0.25)",
    backgroundColor: "#FFFFFF",
    border: "1px solid #828282",
    padding: "25px",
    width: '435px'
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
                <img src={logotype} alt=""/>
            </LogoWrap>
            <Info>
                <Tooltip arrow
                         interactive
                         classes={{tooltip: classes.customTooltipExchange}}
                         title={<ExchangeRateTooltipCard />}
                >
                    <ButtonWrap>
                        <img src={card} alt=""/>
                    </ButtonWrap>
                </Tooltip>
                <Tooltip
                    arrow
                    interactive
                    classes={{tooltip: classes.customNotificationTooltip}}
                    title={
                        <SectionWrapper>
                            {notifications_list.length > 0 ? (
                                notifications_list.map((i, idx) => (
                                    <NotificationCard key={i.id} notification={i} idx={idx}/>
                                ))
                            ) : (
                                <NoNotificationCard>
                                    There is no notifications yet
                                </NoNotificationCard>
                            )}
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
                    classes={{tooltip: classes.customTooltip}}
                    title={
                        <StyledUl>
                            <StyledTooltipItem onClick={() => dispatch(signOut(history))}>
                                Log out
                            </StyledTooltipItem>
                            <NavLink
                                to="/settings/profile"
                                style={{textDecoration: "none"}}
                            >
                                <StyledTooltipItem>My profile</StyledTooltipItem>
                            </NavLink>
                        </StyledUl>
                    }
                >
                    <PhotoWrap>
                        <img src={profilePhoto ? profilePhoto : user} alt=""/>
                    </PhotoWrap>
                </Tooltip>
            </Info>
        </HeaderContainer>
    );
};

export default Header;

