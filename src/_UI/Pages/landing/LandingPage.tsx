import React, {useState} from "react";
import ScopePart from "./components/scope/ScopePart";
import { LandingContainer } from "./landing-styles";
import ExamplesPart from "./components/examples/ExamplesPart";
import ShippingModePart from "./components/shipping_modes/ShippingModePart";
import Footer from "./components/footer/Footer";
import LandingHeader from "./components/header/LandingHeader";
import {useSelector} from "react-redux";
import {AppStateType} from "../../../_BLL/store";
import SignUpPage from "../SignUpPage";
import SignInPage from "../SignInPage";
import SignUpFinishPopup from "../../components/PopUps/sign_up/SignUpFinishPopup";


const LandingPage:React.FC = () => {
    const [isSignUp, openSignUp] = useState(false)
    const [isSignIn, openSignIn] = useState(false)
    let finishPopup = useSelector((state: AppStateType) => state.auth.finishPopup)

    return (
        <LandingContainer>
            {isSignUp && !finishPopup && <SignUpPage openSignUp={openSignUp} openSignIn={openSignIn}/>}
            {isSignIn &&
            // @ts-ignore
            <SignInPage openSignIn={openSignIn} openSignUp={openSignUp}/>}
            {finishPopup && <SignUpFinishPopup openSignUp={openSignUp}/>}

            <LandingHeader openSignUp={openSignUp} openSignIn={openSignIn}/>
            <ScopePart />
            <ExamplesPart />
            <ShippingModePart />
            <Footer />
        </LandingContainer>
    )
}

export default LandingPage