import React from "react";
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
import logo from '../../../../assets/icons/LOGO2.svg'
import OutlineButton from "src/_UI/components/_commonComponents/buttons/outline_button/OutlineButton";
import RouteButton from "../../../../components/_commonComponents/buttons/route_button/RouteButton";


const LandingHeader:React.FC = () => {
    return (
        <Outer>
            <UpperPart>
                <LogoWrap><img src={logo} alt=""/></LogoWrap>
                <ActionsWrapper>
                    <OutlineButton text='SIGN UP' callback={() => {}}/>
                    <LoginButton>Log in</LoginButton>
                </ActionsWrapper>
            </UpperPart>
            <HeaderContent>
                <Title>TRANSFER YOUR FREIGHT</Title>
                <SubTitle>Compare freights rates, book and transfer manage.</SubTitle>
                <RouteButton path='#' text='GET STARTED'/>
            </HeaderContent>
        </Outer>
    )
}

export default LandingHeader