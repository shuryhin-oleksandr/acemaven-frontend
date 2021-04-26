import React from 'react'
import {
    ActionsWrapper,
    HeaderContent,
    LoginButton,
    LogoWrap,
    Outer,
    SubTitle,
    Title,
    UpperPart
} from "./landing-header-styles";
import landing_logo from '../../../../assets/icons/landing/logo_for_landing.svg'
import OutlineButton from "src/_UI/components/_commonComponents/buttons/outline_button/OutlineButton";
import RouteButton from "../../../../components/_commonComponents/buttons/route_button/RouteButton";
import {authActions} from "../../../../../_BLL/reducers/authReducer";
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../../../../../_BLL/store";
import {useTranslation} from "react-i18next";
import Tooltip from "@material-ui/core/Tooltip";
import {
    ButtonWrap,
    Info,
    LanguageSectionWrapper,
    LanguageText,
    LanguageTitle,
    LanguageWrapper
} from "../../../../components/Header/header-styles";
import {makeStyles} from "@material-ui/core/styles";
import i18next from "i18next";
import show_more from "./../../../../../_UI/assets/icons/landing/show_more_white.svg"

const useStyles = makeStyles({
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
    }
});
type PropsType = {
    background_img: string,
    background_size?: string,
    background_repeat?: string,
    button_background?: string,
    login_color?: string,
    borderColor?: string,
    subtitle_text: string,
    subtitle_max_width?: string,
    title_text: string,
    callback:any
}

const SliderHeaderComponent:React.FC<PropsType> = ({background_img,background_size, background_repeat, subtitle_max_width,
                                                       button_background, login_color, borderColor, title_text, subtitle_text,callback}) => {
    const dispatch = useDispatch()
    const classes = useStyles();
    const {t} = useTranslation();
    const changeLanguageFront = (languageFrontEnd: string) => {
        i18next.changeLanguage(languageFrontEnd)
        localStorage.setItem("language", languageFrontEnd);
    }
    return (
        <Outer background_img={background_img} background_repeat={background_repeat} background_size={background_size}>
            <UpperPart>
                <LogoWrap><img src={landing_logo} alt=""/></LogoWrap>
                <ActionsWrapper>
                    <Tooltip
                      arrow
                      interactive
                      classes={{ tooltip: classes.customNotificationTooltip }}
                      title={
                          <LanguageSectionWrapper>
                              <LanguageTitle>{t("Freight rates/Language")}</LanguageTitle>
                              <LanguageWrapper>
                                  <LanguageText onClick={() => changeLanguageFront('en')} >
                                      En
                                  </LanguageText>
                                  <LanguageText onClick={() => changeLanguageFront( 'pt')}
                                                style={{ margin: "0 4px"}}
                                  >
                                      Pt
                                  </LanguageText>
                                  <LanguageText onClick={() => changeLanguageFront( 'sp')} >
                                      Sp
                                  </LanguageText>
                              </LanguageWrapper>
                          </LanguageSectionWrapper>
                      }
                    >
                        <ButtonWrap style={{display: 'flex', alignItems: 'center', marginLeft: '21px', marginRight: '25px'}}>
                            <LanguageWrapper style={{color: '#ffffff'}}>{i18next.language}</LanguageWrapper>
                            <img
                              style={{
                                marginBottom: "3px",
                                width: "10px", fill: "#ffffff"
                            }} src={show_more}
                              alt=""/>
                        </ButtonWrap>
                    </Tooltip>
                    <OutlineButton text={t('Landing Page/SIGN UP')}
                                   callback={() => dispatch(authActions.setOpenSignUp(true))}
                                   button_background={button_background}
                                   borderColor={borderColor}
                    />
                    <LoginButton onClick={() => dispatch(authActions.setOpenSignIn(true))} login_color={login_color}>
                        {t("Freight rates/Log in")}
                    </LoginButton>
                </ActionsWrapper>
            </UpperPart>
            <HeaderContent>
                <Title style={{textTransform: "uppercase"}}>
                    {title_text}
                </Title>
                <SubTitle subtitle_max_width={subtitle_max_width}>{subtitle_text}</SubTitle>
                <RouteButton text={t('Landing Page/GET STARTED')} callback={callback}/>
            </HeaderContent>
        </Outer>
    )
}

export default SliderHeaderComponent