import React, {useState} from "react";
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
import SignUpPage from "src/_UI/Pages/SignUpPage";
import SignInPage from "src/_UI/Pages/SignInPage";
import {useSelector} from "react-redux";
import SignUpFinishPopup from "../../../../components/PopUps/sign_up/SignUpFinishPopup";



const LandingHeader = () => {
    const [isSignUp, openSignUp] = useState(false)
    const [isSignIn, openSignIn] = useState(false)
    let finishPopup = useSelector(state => state.auth.finishPopup)

    return (
        /*<Slider />*/
        <Outer>
            {isSignUp && !finishPopup && <SignUpPage openSignUp={openSignUp} openSignIn={openSignIn}/>}
            {isSignIn && <SignInPage openSignIn={openSignIn} openSignUp={openSignUp}/>}
            {finishPopup && <SignUpFinishPopup openSignUp={openSignUp}/>}

            <UpperPart>
                <LogoWrap><img src={logo} alt=""/></LogoWrap>
                <ActionsWrapper>
                    <OutlineButton text='SIGN UP' callback={() => openSignUp(true)}/>
                    <LoginButton onClick={() => openSignIn(true)}>Log in</LoginButton>
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