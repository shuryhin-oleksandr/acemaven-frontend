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
import {useDispatch} from "react-redux";

type PropsType = {
    background_img: string,
    background_size?: string,
    background_repeat?: string,
    button_background?: string,
    login_color?: string,
    borderColor?: string,
    subtitle_text: string,
    subtitle_max_width?: string
    title_text: string[]
}

const SliderHeaderComponent:React.FC<PropsType> = ({background_img,background_size, background_repeat, subtitle_max_width,
                                                       button_background, login_color, borderColor, title_text, subtitle_text}) => {
    const dispatch = useDispatch()
    return (
        <Outer background_img={background_img} background_repeat={background_repeat} background_size={background_size}>
            <UpperPart>
                <LogoWrap><img src={landing_logo} alt=""/></LogoWrap>
                <ActionsWrapper>
                    <OutlineButton text='SIGN UP'
                                   callback={() => dispatch(authActions.setOpenSignUp(true))}
                                   button_background={button_background}
                                   borderColor={borderColor}
                    />
                    <LoginButton onClick={() => dispatch(authActions.setOpenSignIn(true))} login_color={login_color}>
                        Log in
                    </LoginButton>
                </ActionsWrapper>
            </UpperPart>
            <HeaderContent>
                <Title>
                    <span>{title_text[0]}</span>
                    <span>{title_text[1]}</span>
                    <span>{title_text[2]}</span>
                </Title>
                <SubTitle subtitle_max_width={subtitle_max_width}>{subtitle_text}</SubTitle>
                <RouteButton path='#' text='GET STARTED'/>
            </HeaderContent>
        </Outer>
    )
}

export default SliderHeaderComponent