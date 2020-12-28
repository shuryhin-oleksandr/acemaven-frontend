import React from "react";
import ScopePart from "./components/scope/ScopePart";
import { LandingContainer } from "./landing-styles";
import ExamplesPart from "./components/examples/ExamplesPart";
import ShippingModePart from "./components/shipping_modes/ShippingModePart";
import Footer from "./components/footer/Footer";
import LandingHeader from "./components/header/LandingHeader";
import SignUpPage from "../SignUpPage";
import SignInPage from "../SignInPage";
import SignUpFinishPopup from "../../components/PopUps/sign_up/SignUpFinishPopup";


const LandingPage:React.FC = () => {

    return (
        <LandingContainer>
            <SignUpPage/>
            <SignInPage/>
            <SignUpFinishPopup/>
            <LandingHeader/>
            <ScopePart />
            <ExamplesPart />
            <ShippingModePart />
            <Footer />
        </LandingContainer>
    )
}

export default LandingPage