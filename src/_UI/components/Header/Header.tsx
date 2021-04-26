import * as React from "react";
import { useEffect } from "react";
//moment js
import moment from "moment";
//material ui
import Tooltip from "@material-ui/core/Tooltip";
import { makeStyles } from "@material-ui/core/styles";
//react-router + react-router-dom
import { useHistory } from "react-router";
import { NavLink } from "react-router-dom";
//react-redux
import { useDispatch, useSelector } from "react-redux";
//BLL
import { AppStateType } from "../../../_BLL/store";
import { signOut } from "../../../_BLL/thunks/auth/authThunks";
import { getExchangeListThunk } from "../../../_BLL/thunks/billing/agent/AgentBillingThunks";
import { getAgentExchangeListSelector } from "../../../_BLL/selectors/billing/agent/agentBillingSelector";
import { getMyInfoSelector } from "../../../_BLL/selectors/profile/profileSelectors";
//types
import { AppCompaniesTypes } from "../../../_BLL/types/commonTypes";
//components
import ExchangeRateTooltipCard from "./ExchangeRateTooltipCard";
import NotificationCard from "../../Pages/notifications/NotificationCard";
import {
  ButtonWrap,
  HeaderContainer,
  Info,
  LanguageSectionWrapper,
  LanguageText,
  LanguageTitle,
  LanguageWrapper,
  LogoWrap,
  PhotoWrap,
  StyledTooltipItem,
  StyledUl,
} from "./header-styles";
import {
  NoNotificationCard,
  SectionWrapper,
} from "../../Pages/notifications/notifications-style";
//icons
import logotype from "../../../_UI/assets/icons/landing/inline_logo.svg";
import notification from "../../../_UI/assets/icons/clarity_notification-solid-badged.svg";
import no_notification from "../../assets/icons/no-notification-ring.svg";
import no_message_icon from "../../assets/icons/no-email-icon.svg";
import message_icon from "../../assets/icons/email-icon.svg";
import card from "../../../_UI/assets/icons/card.svg";
import user from "../../../_UI/assets/icons/profile/defaultUserPhoto.svg";
import { useTranslation } from "react-i18next";
import i18next from "i18next";
import {changeLanguageAtBackEnd} from "../../../_BLL/thunks/profile/profileThunks";
import show_more from "./../../../_UI/assets/icons/landing/show_more.svg"

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
    padding: "20px",
    maxWidth: "500px",
  },
});

const Header: React.FC = () => {
  //hooks
  const dispatch = useDispatch();
  const classes = useStyles();
  const history = useHistory();

  //data from store
  const { exchange_list } = useSelector(getAgentExchangeListSelector);
  const profilePhoto = useSelector(
    (state: AppStateType) => state.profile.authUserInfo?.photo
  );
  const notifications_list = useSelector(
    (state: AppStateType) => state.chat_operation.notification_list
  );
  const chat_notifications_list = useSelector(
    (state: AppStateType) => state.chat_operation.chat_notifications_list
  );
  const auth_user_info = useSelector(getMyInfoSelector);


  // company_type

  //local state
  let company_type =
    auth_user_info?.companies &&
    auth_user_info?.companies?.length > 0 &&
    auth_user_info?.companies[0].type;
  let user_roles = auth_user_info?.roles;
  const has_new_notifications = notifications_list?.some((n) => !n.is_viewed);
  let moment_today = moment(new Date()).format("DD/MM/YYYY");
  let last_exchange = exchange_list[exchange_list.length - 1];
  let is_added_today = last_exchange
    ? moment_today === last_exchange.date
    : false;

  useEffect(() => {
    company_type &&
      company_type === "agent" &&
      dispatch(getExchangeListThunk());
  }, [company_type]);

  //handlers
  const goToExchangePage = () => {
    history.push("/billing_exchange");
  };
  const changeLanguage = (languageBackEnd: string, languageFrontEnd: string) => {
    dispatch(changeLanguageAtBackEnd(Number(auth_user_info?.id), languageBackEnd, languageFrontEnd))
  }
  const { t } = useTranslation();
  return (
    <HeaderContainer>
      <LogoWrap onClick={() => history.push("/")}>
        <img src={logotype} alt="" />
      </LogoWrap>
      <Info>
        <Tooltip
          arrow
          interactive
          classes={{ tooltip: classes.customNotificationTooltip }}
          title={
            <LanguageSectionWrapper>
              <LanguageTitle>{t("Freight rates/Language")}</LanguageTitle>
              <LanguageWrapper>
                <LanguageText onClick={() => changeLanguage('en', 'en')}>
                  En
                </LanguageText>
                <LanguageText onClick={() => changeLanguage('pt', 'pt')}
                  style={{ margin: "0 4px" }}
                >
                  Pt
                </LanguageText>
                <LanguageText onClick={() => changeLanguage('es', 'sp')}>
                  Sp
                </LanguageText>
              </LanguageWrapper>
            </LanguageSectionWrapper>
          }
        >
          <ButtonWrap style={{display: 'flex', alignItems: 'center', marginLeft: '21px'}}>
              <LanguageWrapper>{i18next.language}</LanguageWrapper>
              <img
              style={{
                marginBottom: "3px",
                width: "10px"
            }}
              src={show_more}
              alt=""
              />

          </ButtonWrap>
        </Tooltip>
        {company_type === AppCompaniesTypes.AGENT &&
          (user_roles?.includes("billing") ||
            user_roles?.includes("master")) && (
            <Tooltip
              arrow
              interactive
              classes={{ tooltip: classes.customTooltipExchange }}
              title={
                <ExchangeRateTooltipCard
                  moment_today={moment_today}
                  is_added_today={is_added_today}
                  last_exchange={last_exchange}
                  goToExchangePage={goToExchangePage}
                />
              }
            >
              <ButtonWrap margin_left={"21px"}>
                <img src={card} alt="" />
              </ButtonWrap>
            </Tooltip>
          )}
        <Tooltip
          arrow
          interactive
          classes={{ tooltip: classes.customNotificationTooltip }}
          title={
            <SectionWrapper>
              {chat_notifications_list.length > 0 ? (
                chat_notifications_list.map((i, idx) => (
                  <NotificationCard key={i.id} notification={i} idx={idx} />
                ))
              ) : (
                <NoNotificationCard>
                  {t("Dashboard/There are no new messages")}
                </NoNotificationCard>
              )}
            </SectionWrapper>
          }
        >
          <ButtonWrap margin_left={"21px"}>
            {chat_notifications_list.length > 0 ? (
              <img
                style={{
                  marginBottom: "3px",
                }}
                src={message_icon}
                alt=""
              />
            ) : (
              <img src={no_message_icon} alt="" />
            )}
          </ButtonWrap>
        </Tooltip>

        <Tooltip
          arrow
          interactive
          classes={{ tooltip: classes.customNotificationTooltip }}
          title={
            <SectionWrapper>
              {notifications_list.length > 0 ? (
                notifications_list.map((i, idx) => (
                  <NotificationCard key={i.id} notification={i} idx={idx} />
                ))
              ) : (
                <NoNotificationCard>
                  {t("Dashboard/There are no notifications yet")}
                </NoNotificationCard>
              )}
            </SectionWrapper>
          }
        >
          <ButtonWrap margin_left={"21px"}>
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
                {t("My Profile/Log out")}
              </StyledTooltipItem>
              <NavLink
                to="/settings/profile"
                style={{ textDecoration: "none" }}
              >
                <StyledTooltipItem>
                  {t("My Profile/My Profile")}
                </StyledTooltipItem>
              </NavLink>
            </StyledUl>
          }
        >
          <PhotoWrap>
            <img
              style={{ objectFit: "cover" }}
              src={profilePhoto ? profilePhoto : user}
              alt=""
            />
          </PhotoWrap>
        </Tooltip>
      </Info>
    </HeaderContainer>
  );
};

export default Header;
